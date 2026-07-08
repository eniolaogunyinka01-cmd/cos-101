import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini client on the server
let genAI: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please update your AI studio settings.");
    }
    genAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAI;
}

// Helper function to call Gemini API with retry and fallback
async function generateContentWithRetry(
  ai: GoogleGenAI,
  contents: any[],
  config: any
) {
  const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    let delay = 1000;
    const maxRetries = 2;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempting Gemini API call with model: ${modelName} (attempt ${attempt + 1}/${maxRetries + 1})`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config,
        });
        return response;
      } catch (err: any) {
        lastError = err;
        console.error(`Error with model ${modelName} on attempt ${attempt + 1}:`, err);
        
        // Extract status code and message to detect transient errors
        const statusCode = err?.status || err?.code || (err?.error && err.error.code);
        const errorMessage = String(err?.message || err || "").toUpperCase();
        
        const isTransient = 
          statusCode === 503 || 
          statusCode === 429 || 
          statusCode === 500 ||
          errorMessage.includes("503") ||
          errorMessage.includes("DEMAND") ||
          errorMessage.includes("UNAVAILABLE") ||
          errorMessage.includes("LIMIT") ||
          errorMessage.includes("OVERLOADED") ||
          errorMessage.includes("RESOURCE_EXHAUSTED");

        if (isTransient && attempt < maxRetries) {
          console.log(`Transient error or rate limit hit. Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          // Break the inner loop and fall back to the next model if retries are exhausted or it's a fatal error
          break;
        }
      }
    }
  }

  throw lastError || new Error("Failed to generate content after trying all fallback models.");
}

app.use(express.json());

// API route for AI Tutor
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAI();

    // Prepare a comprehensive, friendly context message to keep the tutor grounded in CSC 101.
    const systemInstruction = 
      "You are an intelligent, encouraging, and highly accurate Computer Science 101 (CSC 101) study companion for university students.\n\n" +
      "Your primary goal is to answer the student's questions, summarize concepts, and create study materials based on the CSC 101 curriculum and chapters. Follow these strict rules when answering:\n" +
      "1. Primary Source: Search the CSC 101 curriculum standards (Foundations/MTBF, History, Hardware/Von Neumann, Operating Systems, Numbers & Bases/Conversions, Logic Gates, Network Topologies, and Software Development Method) first. If the answer is found in these core topics, use that information to construct your response.\n" +
      "2. Secondary Source: If the student asks a question not covered in the core curriculum, or asks for real-world examples to explain a concept better, you may use broader internet and computer science general knowledge.\n" +
      "3. Transparency: Whenever you bring in information, facts, or examples from outside the uploaded/standard core curriculum, you MUST explicitly tell the student. Use a phrase like: 'According to external sources...' or 'While not in your uploaded notes, generally speaking...'\n" +
      "4. Tone: Keep explanations clear, academic but accessible, and format your answers with scannable bullet points and bold text for easy reading. Avoid dry jargon unless you explain it, and never praise yourself.";

    // Use chats API or simple content generation with history
    // Since we want to pass history easily, we can format history into contents
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((msg: { role: string; content: string }) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await generateContentWithRetry(ai, contents, {
      systemInstruction,
      temperature: 0.7,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred inside the AI Tutor server." });
  }
});

// Configure Vite middleware / Static Asset Servicing
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express CPU / Vite dev server is running on http://localhost:${PORT}`);
  });
}

initializeServer();
