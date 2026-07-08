import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client on the server
let genAI: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please update your Vercel Environment Variables in your project dashboard.");
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

// Helper function to provide high-quality fallback content when the Gemini API is offline or experiencing high demand.
function getLocalCurriculumFallback(message: string): string {
  const query = message.toLowerCase();

  let response = "### CSC 101 Study Lounge (Curriculum Database Fallback)\n\n";
  response += "⚠️ *The Google Gemini AI service is currently experiencing extremely high demand. To keep your study session completely seamless and uninterrupted, I have generated this curriculum-accurate fallback answer directly from your CSC 101 handbook database.*\n\n---\n\n";

  if (query.includes("complement") || query.includes("two's") || query.includes("twos") || query.includes("negative") || query.includes("subtract") || query.includes("binary rep")) {
    response += "#### 🔢 **Two's Complement & Signed Representation in Binary**\n\n";
    response += "In CSC 101, **Two's Complement** is the standard mathematical methodology computer hardware uses to represent signed (negative) integers and perform subtraction operations using standard addition circuitry.\n\n";
    response += "##### **Step-by-Step Conversion Walkthrough (Example: Convert -5 to an 8-bit Two's Complement Integer)**\n";
    response += "1. **Identify the Positive Value in Binary (Base 2):**\n";
    response += "   Write $+5$ as an 8-bit number:\n";
    response += "   `00000101`\n\n";
    response += "2. **Find the One's Complement (Flip all bits):**\n";
    response += "   Invert every $0$ to $1$, and every $1$ to $0$:\n";
    response += "   `11111010`\n\n";
    response += "3. **Find the Two's Complement (Add 1 to the One's Complement):**\n";
    response += "   Perform binary addition of $+1$:\n";
    response += "   ```\n";
    response += "     11111010  (One's Complement)\n";
    response += "   + 00000001  (Add 1)\n";
    response += "   ----------\n";
    response += "     11111011  (Result: represents -5)\n";
    response += "   ```\n";
    response += "   Therefore, $-5$ is stored in hardware as `11111011`.\n\n";
    response += "##### **Why do computers prefer Two's Complement?**\n";
    response += "- **Single Zero Representation:** Unlike Sign-Magnitude or One's Complement, which have both positive zero (+0) and negative zero (-0), Two's Complement has only a single, unique zero (`00000000`), avoiding logical ambiguities.\n";
    response += "- **Circuit Efficiency:** It allows the CPU's Arithmetic Logic Unit (ALU) to perform both addition and subtraction using the exact same hardware addition circuits, greatly reducing the physical transistor count needed on silicon microchips.";
    return response;
  }

  if (query.includes("sdm") || query.includes("software development") || query.includes("phases") || query.includes("software life") || query.includes("methodology")) {
    response += "#### 🛠️ **The Six Phases of the Software Development Method (SDM)**\n\n";
    response += "The **Software Development Method** is the structured, systematic engineering process used to design, build, test, and maintain high-quality software systems. The curriculum partitions it into six sequential phases:\n\n";
    response += "1. 📝 **Requirements Analysis & Specification:**\n";
    response += "   - Formally defining the exact scope, boundaries, inputs, and desired outputs of the computing problem.\n";
    response += "   - Gathering user needs and producing a formal System Specification document.\n\n";
    response += "2. 📐 **System Design & Modeling:**\n";
    response += "   - Constructing abstract mental representations, data flowcharts, database schemas, and modular system architectures.\n";
    response += "   - Removing low-level engine details using the principle of **Abstraction**.\n\n";
    response += "3. 💻 **Coding & Implementation:**\n";
    response += "   - Translating the design blueprints into actual, syntactically correct source code using high-level programming languages (e.g. Java, C++, Python).\n\n";
    response += "4. 🧪 **Testing & Verification:**\n";
    response += "   - Running the compiled modules against systematic test sheets and scenarios to detect syntax and semantic bugs, ensuring the program satisfies the specification.\n\n";
    response += "5. 🚀 **Deployment & Integration:**\n";
    response += "   - Releasing the tested application to the end-user's live production environment or installing it on server hardware.\n\n";
    response += "6. 🔄 **Maintenance & Evolution:**\n";
    response += "   - Monitoring performance, fixing newly discovered bugs, and updating the system modules to adapt to changing organizational demands.";
    return response;
  }

  if (query.includes("babbage") || query.includes("lovelace") || query.includes("pioneer") || query.includes("analytical") || query.includes("difference engine") || query.includes("hollerith") || query.includes("history") || query.includes("evolution")) {
    response += "#### 🕰️ **The Magnificent History & Pioneers of Computing**\n\n";
    response += "The evolution of computing systems represents a journey from physical bead-counters to general-purpose electronic microchips:\n\n";
    response += "- **Charles Babbage (1792-1872):** Celebrated as the *Father of Modern Computing*. He recognized human errors in navigating mathematical tables and designed two revolutionary mechanical devices:\n";
    response += "  - **Difference Engine:** Designed to mechanically compute polynomial variables using the method of finite differences.\n";
    response += "  - **Analytical Engine:** A brilliant conceptual design that was completely **Turing-complete**. It incorporated a processor (the *mill*), memory (the *store*), sequential control structures, loops, conditional branching, and used punched cards for programming.\n\n";
    response += "- **Lady Ada Lovelace (Countess of Lovelace):** Recognized as the *World's First Computer Programmer*. She documented Babbage's mechanical designs and composed an algebraic algorithm for the Analytical Engine to calculate Bernoulli numbers.\n\n";
    response += "- **Atanasoff-Berry Computer (ABC) (1939-1942):** Engineered by John Vincent Atanasoff and Clifford Berry. It utilized vacuum tubes and was the *first electronic digital computer* in history, built specifically to solve 29 simultaneous linear equations. This historical priority was legally confirmed by a landmark 1973 patent court ruling.\n\n";
    response += "- **Herman Hollerith:** Invented the electro-mechanical punched-card tabulator to compile the 1890 US Census, compressing census processing times from years to weeks. He founded the Tabulating Machine Company, which merged and was renamed **IBM (International Business Machines)** under Thomas J. Watson, nicknamed **Big Blue**.";
    return response;
  }

  if (query.includes("generation") || query.includes("vacuum tube") || query.includes("transistor") || query.includes("integrated circuit") || query.includes("microprocessor") || query.includes("vlsi") || query.includes("lsi")) {
    response += "#### 🔌 **The Five Generations of Electronic Computing**\n\n";
    response += "Digital electronic computers are classified into five distinct historical generations, each defined by its core hardware switching technology:\n\n";
    response += "| Generation | Core Electronic Technology | Memory Systems | Language Levels | Key Systems / Attributes |\n";
    response += "| :--- | :--- | :--- | :--- | :--- |\n";
    response += "| **1st Generation** *(1946-1957)* | **Vacuum Tubes** (Lee de Forest's triode valve) | Magnetic Drums, Punched Cards | Binary Machine Code (1GL) | ENIAC (no stored program), EDSAC (first practical stored program), UNIVAC I |\n";
    response += "| **2nd Generation** *(1958-1964)* | **Individual Transistors** (Silicon crystal switches) | Magnetic Core Memory, early Hard Disks | Mnemonic Assembly (2GL), High-Level (3GL like FORTRAN, COBOL, BASIC) | IBM 1401, high-speed line printers |\n";
    response += "| **3rd Generation** *(1965-1971)* | **Integrated Circuits (ICs)** (Multiple gates on single chips) | Semiconductor RAM/ROM modules | High-Level Languages (3GL), Multi-user Operating Systems | IBM System/360, Minicomputers, Time-Sharing OS |\n";
    response += "| **4th Generation** *(1972-1977)* | **LSI Microprocessors** (Tens of thousands of gates on a chip) | High-density RAM, Floppy Disks | 4GL Database Languages, Visual Interfaces | Intel 4004 (CPU-on-a-chip), Apple II, MITS Altair, IBM PC |\n";
    response += "| **5th Generation** *(1978-Date)* | **VLSI & ULSI chips** (Millions/billions of transistors) | SSDs, Optical, Cloud Storage | AI frameworks, natural languages | Pentium, Core i9, parallel processing, artificial intelligence |\n\n";
    response += "##### **Moore's Law:**\n";
    response += "Formulated by Intel co-founder Gordon Moore in 1965, **Moore's Law** is the observation that the density of transistors on a memory chip doubles approximately every two years, causing computing power to rise exponentially over time.";
    return response;
  }

  if (query.includes("von neumann") || query.includes("machine cycle") || query.includes("fetch") || query.includes("decode") || query.includes("execute") || query.includes("control unit") || query.includes("alu") || query.includes("bus")) {
    response += "#### ⚙️ **The Von Neumann Architecture & CPU Machine Cycle**\n\n";
    response += "##### **Von Neumann Architecture**\n";
    response += "Established by John von Neumann in his designs for the EDVAC, this architecture forms the basis of virtually all modern general-purpose computers. It has four main divisions:\n";
    response += "1. **Input Unit:** Inserts physical data or user commands.\n";
    response += "2. **Output Unit:** Translates binary states into human-readable text, graphics, or control actions.\n";
    response += "3. **Memory Unit:** A unified, addressable storage space holding *both* active program instructions and variables.\n";
    response += "4. **Central Processing Unit (CPU):** Comprising the **Control Unit (CU)** (the scheduler and decoder) and the **Arithmetic Logic Unit (ALU)** (handling mathematics and logic gates).\n\n";
    response += "##### **The System Bus Wiring**\n";
    response += "- **Data Bus:** Bi-directional highway transferring data operands between the registers, memory, and ALU.\n";
    response += "- **Address Bus:** Uni-directional pipeline carrying memory indices from the CPU to select target memory addresses.\n";
    response += "- **Control Bus:** Carries synchronization clock pulses and read/write control signals.\n\n";
    response += "##### **The CPU Machine Cycle (Instruction Cycle)**\n";
    response += "The Control Unit executes this four-step loop continuously for every single program instruction:\n";
    response += "1. 📥 **Fetch:** The Control Unit retrieves the next program instruction from a main memory address (using its Program Counter register).\n";
    response += "2. 🔍 **Decode:** The CU's control section decodes the instruction into specific internal control signals and triggers registers.\n";
    response += "3. ⚡ **Execute:** The ALU or specialized circuitry executes the mathematical arithmetic or boolean logic comparison.\n";
    response += "4. 💾 **Store:** The CU writes the resulting value back into a primary memory address or register.";
    return response;
  }

  if (query.includes("ram") || query.includes("rom") || query.includes("sram") || query.includes("dram") || query.includes("prom") || query.includes("eprom") || query.includes("eeprom") || query.includes("memory")) {
    response += "#### 💾 **Primary Memory Systems: RAM vs. ROM**\n\n";
    response += "Primary memory forms the fast physical workspace connected directly to the CPU's address and data buses. It is categorized into two main groups:\n\n";
    response += "##### **1. Volatile Primary RAM (Random Access Memory)**\n";
    response += "Allows reading and writing. It is volatile—contents are lost the moment the system loses power:\n";
    response += "- **Dynamic RAM (DRAM):** The most common and cheapest form of RAM. Uses tiny transistors and capacitors to store binary bits. Capacitors slowly leak electrical charge, requiring continuous electrical refresh signals (thousands of times per second) to retain data.\n";
    response += "- **Static RAM (SRAM):** Much faster and more stable. Uses cross-coupled flip-flop latching circuits to retain states without constant refreshing. Extremely expensive and power-hungry; primarily used as high-speed **CPU Cache Memory**.\n\n";
    response += "##### **2. Non-Volatile Permanent ROM (Read-Only Memory)**\n";
    response += "Maintains its contents even when power is turned off. Used to store permanent manufacturer startup programs (BIOS/UEFI firmware):\n";
    response += "- **PROM (Programmable ROM):** Blank chips that can be permanently programmed once by standard ROM burners.\n";
    response += "- **EPROM (Erasable Programmable ROM):** Can be erased by exposing the silicon wafer to concentrated ultraviolet (UV) light through a clear quartz window on top of the chip, then re-written.\n";
    response += "- **EEPROM (Electrically Erasable Programmable ROM):** Can be erased and rewritten electrically. This is the foundation of modern Flash memory.";
    return response;
  }

  if (query.includes("compiler") || query.includes("interpreter") || query.includes("assembler") || query.includes("linker") || query.includes("loader") || query.includes("lexical") || query.includes("syntax")) {
    response += "#### 🛠️ **Language Translators & Compilation Stages**\n\n";
    response += "Computer processors can only execute binary machine instructions (1GL). Translators convert human-written program scripts into machine code:\n\n";
    response += "##### **Core Translators:**\n";
    response += "- **Compiler:** Translates the entire high-level source code file into a standalone, binary machine-level executable file (object code) in a single compile pass before execution begins. Programs run extremely fast once compiled.\n";
    response += "- **Interpreter:** Translates and executes high-level source statements line-by-line dynamically at runtime. It does not produce a standalone binary file; translation occurs on every run. Easier for debugging but execution is slower.\n";
    response += "- **Assembler:** Translates low-level mnemonic Assembly scripts (2GL) directly into raw binary machine code (1GL) for the target CPU architecture.\n\n";
    response += "##### **Four Stages of Compilation:**\n";
    response += "1. 📝 **Lexical Analysis:** Scans the raw character stream, filters whitespace and comments, and groups characters into vocabulary tokens.\n";
    response += "2. 📐 **Syntax Analysis (Parsing):** Evaluates tokens against grammatical rules to construct an **Abstract Syntax Tree (AST)**, identifying syntax errors.\n";
    response += "3. 🔍 **Semantic Analysis:** Checks that the AST obeys logical rules, validating variable data types, operator compatibility, and declaration scopes.\n";
    response += "4. 🚀 **Code Generation & Optimization:** Translates the structured trees into optimized native assembly or binary machine-level executable instructions.\n\n";
    response += "##### **System Support Tools:**\n";
    response += "- **Linker (Linkage Editor):** Merges individual compiled object modules and external pre-compiled system libraries into a single cohesive executable binary file.\n";
    response += "- **Loader:** Copies compiled executable instructions from secondary disk storage into primary RAM, registers the initial program counter, and schedules the CPU execution threads.";
    return response;
  }

  if (query.includes("gigo") || query.includes("garbage") || query.includes("diligence") || query.includes("accuracy") || query.includes("speed") || query.includes("versatility") || query.includes("characteristic")) {
    response += "#### 📊 **Core Characteristics of Computer Systems & GIGO**\n\n";
    response += "Computer systems are defined by exceptional operational attributes that distinguish them from manual tools:\n\n";
    response += "- **Speed:** Capable of executing millions of instructions per second (MIPS) or trillions of floating-point operations per second (FLOPS).\n";
    response += "- **Accuracy:** Electronic circuits execute operations with absolute mathematical precision. However, accuracy is governed by the **GIGO (Garbage In, Garbage Out)** rule: if incorrect, faulty, or corrupted data is supplied as input, the computer will faithfully process it and produce incorrect output.\n";
    response += "- **Diligence:** Immunized against physical fatigue, boredom, lack of concentration, or emotional exhaustion. A computer can work continuously for hours or days with completely stable execution precision.\n";
    response += "- **Versatility:** Highly capable of performing completely different kinds of tasks (e.g., executing complex mathematical physics models, managing massive corporate databases, and rendering graphics concurrently).\n";
    response += "- **Storage Capacity:** The capacity to store immense volumes of data permanently on secondary storage devices and retrieve them almost instantaneously into primary RAM memory.";
    return response;
  }

  if (query.includes("operating system") || query.includes("os") || query.includes("dos") || query.includes("linux") || query.includes("interface")) {
    response += "#### 🖥️ **Crucial Functions of an Operating System (OS)**\n\n";
    response += "The **Operating System** is the core system software that acts as the master coordinator between the physical hardware circuitry and application programs:\n\n";
    response += "- **Processor Management (CPU Scheduling):** Schedules which program threads receive CPU cycles, multiplexing executions to support multi-tasking.\n";
    response += "- **Memory Allocation:** Dynamically registers and assigns RAM addresses to active programs, ensuring processes do not overwrite each other's memory spaces, and administers virtual swap files.\n";
    response += "- **Device Handling:** Coordinates peripheral input/output data streams through standardized device drivers, utilizing buffers to balance speed differences.\n";
    response += "- **File System Management:** Maps logical folder directories and files onto physical storage sectors and tracks, managing read/write permissions.\n";
    response += "- **User Interface:** Provides the interaction medium, ranging from **Command-Line Interfaces (CLI)** (DOS-style, requiring typed commands) to **Graphical User Interfaces (GUI)** (Windows/Linux-style, using menus, windows, and pointer interactions).";
    return response;
  }

  // Broad Syllabus fallback
  response += "#### 📚 **Computer Science & Foundations Overview**\n\n";
  response += "**Computer Science** is defined as the systematic study of algorithmic processes that describe and transform information: their theory, analysis, design, efficiency, implementation, and application.\n\n";
  response += "##### **The Six Layers of a Computing System:**\n";
  response += "1. 🔤 **Information Layer:** How we represent text, numbers, images, audio, and video using discrete binary states (bits 0 and 1).\n";
  response += "2. 🔌 **Hardware Layer:** The physical logic gates, circuitry, motherboard, CPU, and secondary storage media.\n";
  response += "3. 💻 **Programming Layer:** Low-level machine code, symbolic assembly, and high-level languages conveying instructions to hardware.\n";
  response += "4. 🖥️ **Operating System Layer:** Master coordination software managing resources, memory tables, CPU cycles, and files.\n";
  response += "5. 📊 **Application Layer:** Programs that execute specific business or end-user tasks, such as word processing, databases, or browsers.\n";
  response += "6. 🌐 **Communication Layer:** Network topologies (star, mesh, bus) connecting computer terminals into a global internet workspace.\n\n";
  response += "##### **The Core Problem-Solving Pillars:**\n";
  response += "- **Abstraction:** Formulating clean mental models that simplify real-world problems by removing redundant lower-level technical details.\n";
  response += "- **Automation:** Converting abstract models into precise, finite algorithms containing sequential steps.\n";
  response += "- **Implementation:** Translating algorithms into executable code to verify the solution against real-world inputs.\n\n";
  response += "*Tip: To explore a specific topic in depth (e.g. Two's Complement, Compiler phases, History, or RAM/ROM differences), simply ask me with those keywords!*";

  return response;
}

export default async function handler(req: any, res: any) {
  // Support CORS if needed, but relative requests will be same-origin
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const ai = getGenAI();

    const systemInstruction = 
      "You are an intelligent, encouraging, and highly accurate Computer Science 101 (CSC 101) study companion for university students.\n\n" +
      "Your primary goal is to answer the student's questions, summarize concepts, and create study materials based on the CSC 101 curriculum and chapters. Follow these strict rules when answering:\n" +
      "1. Primary Source: Search the CSC 101 curriculum standards (Foundations/MTBF, History, Hardware/Von Neumann, Operating Systems, Numbers & Bases/Conversions, Logic Gates, Network Topologies, and Software Development Method) first. If the answer is found in these core topics, use that information to construct your response.\n" +
      "2. Secondary Source: If the student asks a question not covered in the core curriculum, or asks for real-world examples to explain a concept better, you may use broader internet and computer science general knowledge.\n" +
      "3. Transparency: Whenever you bring in information, facts, or examples from outside the uploaded/standard core curriculum, you MUST explicitly tell the student. Use a phrase like: 'According to external sources...' or 'While not in your uploaded notes, generally speaking...'\n" +
      "4. Tone: Keep explanations clear, academic but accessible, and format your answers with scannable bullet points and bold text for easy reading. Avoid dry jargon unless you explain it, and never praise yourself.";

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

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error("Vercel Serverless Gemini API error, attempting local fallback:", error);
    try {
      const fallbackText = getLocalCurriculumFallback(message || "");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ text: fallbackText });
    } catch (fallbackError: any) {
      console.error("Failed to execute local fallback in Vercel function:", fallbackError);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ error: error.message || "An unexpected error occurred inside the AI Tutor serverless function." });
    }
  }
}
