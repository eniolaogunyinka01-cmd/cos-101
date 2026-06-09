import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

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
      "You are an expert, encouraging, and friendly Computer Science 101 (CSC 101) AI Tutor. " +
      "Your goal is to help students learn foundation computing topics, including: " +
      "1. Computer Science foundations & 3 traditions (math, engineering, science), and tool requirements (such as MTBF).\n" +
      "2. History (Abacus, Napier, Babbage/Lovelace, WWII, ENIAC, Turing, Shockley/transistor, Moore's Law).\n" +
      "3. Hardware & Memory (Von Neumann, CPU CU/ALU, Fetch-Decode-Execute cycle, RAM/ROM, Secondary storage/sectors, CD lands/pits).\n" +
      "4. Operating Systems (System vs application, CPU threads, RAM allocation, CLI vs GUI, Linux/Windows history).\n" +
      "5. Numbers & Bases (Decimal, Binary, Octal, Hex, and radix points / fraction conversions).\n" +
      "6. Logic & Boolean Algebra (Gates, logical equations, truth tables, AND, OR, NOT, NAND, NOR, XOR, universal gates).\n" +
      "7. Communications & SDM (LAN/WAN, Topologies, Client/Server vs P2P, Intranet vs Extranet, and 6 steps of the Software Development Method).\n\n" +
      "Always answer in clear, conversational, and pedagogical language, breaking down complex topics gently. Use scannable bullet points and bold key terms. Avoid dry jargon unless you explain it, and never praise yourself.";

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

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
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
      server: { middlewareMode: true },
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
