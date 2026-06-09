import { Chapter, QuizQuestion } from "./types";

export const CHAPTERS: Chapter[] = [
  {
    id: "discipline",
    title: "1. Computer Science as a Discipline & Foundations",
    shortTitle: "Discipline",
    subtitle: "What is Computer Science, its founding traditions, and the requirements of computational tools.",
    sections: [
      {
        title: "Definition & Scope of Computer Science",
        content: [
          "Computer Science is the systematic study of algorithmic processes that describe and transform information: their theory, analysis, design, efficiency, implementation, and application (automation).",
          "It is also fundamentally about computational problem solving: building computers, writing programs, understanding how we use computational tools, and what we discover when we do.",
          "It studies algorithmic mechanisms of computational processes independently of any specific application domain (representing how to solve society's problems using machines)."
        ],
        keyTerms: [
          { term: "Abstraction", definition: "A key computer science concept that builds clean abstract models of the real world, removing complex internal details at the moment of modeling (e.g., viewing a car's dashboard controls without needing to understand the internal details of the combustion engine)." },
          { term: "Automation", definition: "Building models with the aim of solving problems. Automated through algorithms which perform actions on and with real-world data." },
          { term: "Implementation", definition: "Translating models and algorithms into explicit code (instructions) that the computer can run, proving that proposed solutions actually work." }
        ]
      },
      {
        title: "The Three Founding Traditions of Computer Science",
        content: [
          "1. Mathematics: Gives the discipline much of its theory. Theories construct conceptual frameworks and notations (often expressible in logic or algebra) that define structures and properties to reason about system behavior and avoid catastrophic failures.",
          "2. Engineering Tradition: Provides the creative foundation and practical design rules. It drives computer scientists to assemble hardware engines and refine code constructs with balance between feasibility and performance constraints.",
          "3. Experimental Science Tradition: Guides testing and validating systematic hypotheses. It builds a cycle of testable explanations and predictions about computers, networks, and logical limits."
        ]
      },
      {
        title: "Six Vital Requirements of Computational Tools",
        content: [
          "Computational tools are manufactured using either computer programs (software) or dedicated circuits (hardware) to satisfy combinations of performance objectives:",
          "• Correctness: Conforming completely and unambiguously to pre-defined user specifications.",
          "• Efficiency: Restricting time complexity (how fast the algorithm executes) and space complexity (judicious utilization of hardware space/memory).",
          "• Security: Preserving functions from malicious interference, preventing unauthorized use, and utilizing encryption/decryption keys.",
          "• Fault-Tolerance: Maintaining operations in the presence of physical or software faults without complete failure, measured by Mean Time Between Failures (MTBF).",
          "• User-Friendliness: Ensuring ergonomics, ease of interaction, and context-dependent styling suitable for human users.",
          "• Intelligence: Mimicking high-level capabilities like reasoning, natural language understanding, learning from data, and game playing (e.g., IBM's Deep Blue chess victory over Garry Kasparov in 1997)."
        ]
      },
      {
        title: "Discipline Sub-Areas: Systems vs. Application",
        content: [
          "The academic discipline is historically partitioned into two distinct categories:",
          "• Systems Area: Focused on core computational infrastructure. Includes Algorithms & Data Structures, Programming Languages & Compilers, Computer Architecture, Operating Systems, Software Engineering, Human-Computer Interaction, and Computer Networks.",
          "• Application Area: Focused on solving specialized problems. Includes Numerical Computation, Databases, Artificial Intelligence & Robotics, Graphics, Bioinformatics, World Wide Web, and Electronic Games."
        ]
      }
    ]
  },
  {
    id: "history",
    title: "2. The Magnificent History & Evolution of Computing",
    shortTitle: "History",
    subtitle: "From primitive abacuses and gear machines to Turing machines, World War II codebreaking, and the five semiconductor generations.",
    sections: [
      {
        title: "The Ancient & Pioneer Era",
        content: [
          "Before electronic processors, counting rested on physical items (scratches on sand, stones).",
          "• Stonehenge: Serves as a primitive calendar pointing to celestial summer solstices.",
          "• The Abacus: One of the first systematic mechanical tools originating in ancient China to automate counting arithmetic.",
          "• Al-Khowarizmi (12th Century cleric): Formalized the concept of a written process for doing something, publishing the historical foundation of 'algorithms' (the basis of software).",
          "• Napier's Bones (1617): John Napier invented logarithmic computing strips to facilitate complex multiplication and division.",
          "• Blaise Pascal (1623-1662): Designed the Pascaline, a hand-geared mechanical desktop calculator mimicking an odometer for addition and subtraction.",
          "• William Oughtred (1574-1660): Created circular and linear slide calculators matching logarithmic properties.",
          "• Gottfried Wilhelm von Leibniz (1646-1716): Invented a hand-cranked physical multiplier and documented binary arithmetic—the representation layer of modern computers."
        ]
      },
      {
        title: "The Industrial Revolution & Analytical Visionaries",
        content: [
          "• Charles Babbage (1792-1872): The father of modern computing who recognized humand-error issues in navigational mathematical tables.",
          "  - Difference Engine: Mechanically computed polynomial variables using the method of finite differences. (A full replica was successfully built in 1989-1991 for the London Science Museum).",
          "  - Analytical Engine: A revolutionary design that was Turing Complete. It could read program scripts from punched cards, utilized sequential control, branching, and looping structures.",
          "• Lady Ada Lovelace (Countess of Lovelace): The world's first programmer. She documented Babbage's designs, wrote explanations of the mechanical arithmetic, and composed a program for the Difference Engine to compute Bernoulli numbers.",
          "• Herman Hollerith: Designed an electro-mechanical punched-card tabulator to sort and process the massive 1890 U.S. Census, lowering compilation from decades to weeks. He founded the Tabulating Machine Company, which eventually evolved into IBM."
        ]
      },
      {
        title: "The Electronic Dawn & The World War II Catalyst (1939-1945)",
        content: [
          "Wartime resource pressures accelerated computer research for two main military applications: calculating rapid artillery ballistic tables and breaking complex encrypted codes.",
          "• Alan Turing: Abstractly modeled the mathematical limits of computers via the 'Turing Machine' (solving the Halting Problem, demonstrating not all problems are decidable on computers). He made landmark contributions at Bletchley Park using the Colossus machine to scan and break the German Enigma transmission codes at 25,000 characters per second.",
          "• Howard Aiken & Grace Hopper: Aiken built the massive electro-mechanical Harvard Mark I computer (51 feet long, 5 tons, running on relational relays). Grace Hopper programmed it, coined the term 'bug' when extracting a moth from a physically stuck relay, and created the earliest compiler compilers.",
          "• ENIAC (1946): Designed by Eckert and Mauchly. The first general-purpose electronic digital computer-operated using heat-generating vacuum tubes. It ran 1000 times faster than the Mark I but had no internal program storage (it had to be re-wired physically with switches and patch cords).",
          "• Shockley, Bardeen, & Brattain (1947): Invented the semiconductor Point-Contact Transistor at Bell Labs. This tiny switch replaced fragile, power-hungry, slow vacuum tubes and won them the Nobel Prize."
        ]
      },
      {
        title: "The Stored Program Concept (Von Neumann Machine)",
        content: [
          "John von Neumann consulted on the ENIAC and designed the prospective EDVAC (1951).",
          "He established the fundamental 'Stored Program Concept' where data and program instructions are stored together inside the same electronic memory grid.",
          "He advocated for binary numbering rather than decimal switches, noting computers work best with two solid physical states (voltage ON or OFF)."
        ]
      },
      {
        title: "The Five Computer Generations",
        content: [
          "• First Generation (1946-1957): Characterized by vacuum tubes. Magnetic drums stored immediate bits, and magnetic tapes emerged as secondary media. Programmed initially in raw binary machine code, broken through by assembly language language translators.",
          "• Second Generation (1958-1964): Powered by individual transistors. Introduced non-volatile magnetic core memory cores and early hard disks. High-level portable programming languages emerged (FORTRAN for calculations, COBOL for enterprise invoices), leading to astronomical business usage.",
          "• Third Generation (1965-1971): Integrated Circuits (ICs) emerged, containing multiple gates inside Small Scale Integration (SSI) and Medium Scale Integration (MSI). Time-sharing operating systems revolutionized efficiency. Minicomputers entered the market.",
          "• Fourth Generation (1972-1977): Large Scale Integration (LSI) consolidated thousands of gate elements onto a single silicon chip, giving rise to the 'microprocessor' (a CPU on a single chip, e.g. Intel 4004). This ignited the personal computer (PC) revolution (Bill Gates & Paul Allen's MITS Altair, Steve Jobs & Steve Wozniak's Apple II in 1975).",
          "• Fifth Generation (1978-Date): Very Large Scale Integration (VLSI) enables millions/billions of transistors on a single microchip (e.g. Pentium processors). Supports lightning-fast concurrent processing speeds (100M+ operations per second)."
        ],
        keyTerms: [
          { term: "Moore's Law", definition: "Formulated by Gordon Moore in 1965, observing that the density of transistors on a memory chip doubles approximately every two years, causing computing power to rise exponentially over time." },
          { term: "Killer Application", definition: "A piece of software so useful that customers purchase whole hardware units simply to use that application (e.g. Visicalc spreadsheet software on early microcomputers)." }
        ]
      }
    ]
  },
  {
    id: "architecture",
    title: "3. Hardware, Memory & Von Neumann Architecture",
    shortTitle: "Hardware",
    subtitle: "The internal mechanics of CPU machine cycles, RAM vs ROM, and direct vs sequential storage components.",
    sections: [
      {
        title: "The Von Neumann Architecture Standard",
        content: [
          "Virtually all modern general-purpose computers share the Stored-Program Von Neumann architecture, identifying three essential categories:",
          "1. Input/Output (I/O) Devices: Allows humans or sensors to transmit parameters to and receive results from the electronic frame.",
          "2. Memory Unit: An physical slot grid containing both active instruction operations and computational data variables.",
          "3. Central Processing Unit (CPU): The main controller orchestrating command strings on data representations."
        ],
        diagramType: "bus"
      },
      {
        title: "Under the Hood: Inside the CPU & Machine Cycle",
        content: [
          "The CPU consists of two core structures:",
          "• Control Unit (CU): Directs and coordinates data flow. It reads stored instruct parameters one by one, decodes them, and schedules components to execute them.",
          "• Arithmetic Logic Unit (ALU): Performs basic mathematical calculations (addition, subtraction, multiplication, division) and logical inequality evaluations (determining if numbers are greater than, less than, or equal).",
          "The machine behavior obeys a cyclic loop called the 'Machine Cycle' containing four stages:",
          "  - Step 1: Fetch (Obtains a program instruction from secondary/primary memory).",
          "  - Step 2: Decode (Control Unit translates the instruction into internal processor command sets).",
          "  - Step 3: Execute (The ALU or processing gates carry out the command operation).",
          "  - Step 4: Store (Saves the immediate result back into primary memory address structures)."
        ]
      },
      {
        title: "The System Bus Infrastructure",
        content: [
          "Busses represent physical copper or gold circuit lines linking the CPU to memory and storage controllers:",
          "• Data Bus: A bi-directional communication path for transferring information bits forward and backward between CPU regions.",
          "• Address Bus: A uni-directional path transmitting positioning signals to identify a target storage address in primary memory.",
          "• Control Bus: A path carrying signal pulses declaring command actions (e.g., instructions to READ from or WRITE to a memory address)."
        ]
      },
      {
        title: "Memory Classifications: RAM vs. ROM",
        content: [
          "Memory capacity is measured in standard byte powers (Kilobyte KB ≈ 1,000 bytes, Megabyte MB ≈ 1,000,000 bytes, Gigabyte GB ≈ 1,000,000,000 bytes, Terabyte TB ≈ 1,000,000,000,000 bytes).",
          "• Random Access Memory (RAM): Volatile active workspace (contents disappear when power is shut down).",
          "  - Dynamic RAM (DRAM): Most common type, cheap, but capacitor nodes lose charge and require continuous system refresh signals.",
          "  - Static RAM (SRAM): Much faster, more stable, holds charge without constant refreshing but is expensive (typically used in high-speed cache memory).",
          "  - Magnetoresistive RAM (MRAM): Newer non-volatile RAM using magnetic states to retain data without power.",
          "• Read-Only Memory (ROM): Non-volatile permanent data storage written by manufacturers (e.g. initial BIOS scripts, boot code called Firmware).",
          "  - PROM: Programmable ROM written permanently once by a compiler developer.",
          "  - EEPROM: Electrically Erasable Programmable ROM that special programmers can erase and overwrite multiple times."
        ]
      },
      {
        title: "Storage Tech: Magnetic, Optical, and Flash",
        content: [
          "Since primary RAM Memory is volatile, long-term non-volatile 'Secondary Storage' is required:",
          "• Magnetic Disk: Includes thin flexible portable floppy disks and rigid platters called Hard Disks. Consists of narrow recording circles (Tracks) partitioned into segments (Sectors storing 512 bytes). Disk formatting indexes bad sectors and establishes filesystems. Allows fast random 'Direct Access' (DASD).",
          "• Magnetic Tape: Older plastic ribbon storage, slow because it uses sequential access, but highly stable and cost-effective (primarily used for backup archives).",
          "• Optical Disk: Uses lasers to scan microscopic physical reflective variations (lands represent 1s, non-reflective pits represent 0s). Includes CD-ROM (650MB to 1GB read-only), CD-R (write-once), CD-RW (multi-writable), and high-capacity single or double-sided DVDs (4.7GB to 17GB)."
        ]
      }
    ]
  },
  {
    id: "software",
    title: "4. Operating Systems, Software & Code Languages",
    shortTitle: "Software",
    subtitle: "A comprehensive look at System Software, OS functions (memory, file, CPU management), and programming language generations.",
    sections: [
      {
        title: "System Software vs. Application Software",
        content: [
          "• System Software: Controls access to computer hardware, making the underlying machinery accessible to developers and applications. Includes Operating Systems (OS), compilers, interpreters, linkers, load routines, and preprocessors.",
          "• Application Software: Direct programs customized to solve user tasks (such as spreadsheets text processes, graphics, and email packages). Includes general-purpose suites (MS Word, Excel, MS Access) and special-purpose software (desktop editors, file databases, hospital smartcard monitors)."
        ]
      },
      {
        title: "Crucial Functions of an Operating System (OS)",
        content: [
          "The OS manages the physical hardware grid dynamically through three coordinate divisions:",
          "• CPU Scheduling: Multiplexes thread executions to facilitate simultaneous multiprocessing and multi-tasking operations.",
          "• Memory Allocation: Allocates physical RAM addresses dynamically, keeping process code from overriding each other's spaces.",
          "• Input/Output Handling: Dictates standard protocol streams to communicate with device drivers (printers, mice, keyboards)."
        ],
        keyTerms: [
          { term: "DOS (Disk Operating System)", definition: "An early non-user-friendly Command-Line interface operating system, requiring users to memorize exact text commands line-by-line." },
          { term: "Microsoft Windows", definition: "A Graphical User Interface (GUI) originally running on top of DOS (v3.x) adding multi-tasking before moving to full independent kernel architecture (Windows 95/NT)." },
          { term: "Linux", definition: "A widely utilized, open-source UNIX-based operating system powering modern server infrastructure, web services, and systems networks." }
        ]
      },
      {
        title: "The Levels & Evolution of Programming Languages",
        content: [
          "Languages define an agreed-upon format of rules and symbols instructing computers to process variables:",
          "• Machine Language (1st Generation - 1GL): The machine's natural binary format (strings of 0s and 1s directly inside the processor). Extremely difficult to write, prone to human error, and completely non-portable (machine-dependent).",
          "• Assembly Language (2nd Generation - 2GL): Replaced binary strings with English-like abbreviations (e.g., L 1, GROSSPAY; S 1, TAX; ST 1, NETPAY). Requires a system translator called an 'Assembler' to compile instructions into machine code. Still machine-dependent.",
          "• High-Level Languages (3G to 4GL): Uses English-like expressions (e.g., Netpay = gross pay - tax). Highly portable (compilers compile the code to run on varying processor architectures). Major historic options include:",
          "  - FORTRAN: Formulated in the 1950s optimized for complex engineering/mathematical calculations.",
          "  - COBOL: Built in the 1960s with custom structures optimized for secure accounting and commercial transactions.",
          "  - Pascal: Created as a learning framework to enforce structured, safe programming standards.",
          "  - C: Procedural, low-level pointer control, popular for creating Operating Systems and compiler software.",
          "  - C++ and Java: Object-oriented models with extensive libraries (C++ adds extensions to C, while Java compiles to portable virtual bytecodes)."
        ]
      }
    ]
  },
  {
    id: "representation",
    title: "5. Information Representation, Arithmetic & Compression",
    shortTitle: "Representation",
    subtitle: "How analog physical values become digital, two's complement arithmetic, text encoding and compression techniques.",
    sections: [
      {
        title: "Analog vs. Digital and Electronic Signals",
        content: [
          "Computers are finite, but the outer universe is infinite. To process parameters, computers digitize them (breaking data into discrete elements):",
          "• Analog Data: Continuous waveforms (such as traditional records, fluid mercury thermometers, or raw sound waves).",
          "• Digital Data: Discrete segments (discontinuous binary digits representing steps).",
          "• Signal Degradation: Electronic signals degrade due to resistance and noise over distance. Digital signals are routinely reclocked (using a voltage threshold) to restore pristine square shapes, preventing cumulative error, unlike analog signals.",
          "• Audio Representation: Audio waves are captured by periodic voltage measurement (Sampling). Sound waves are digitized at a sampling rate of ~40,000 times per second to create a clean, high-fidelity reproductive stream."
        ],
        diagramType: "complement"
      },
      {
        title: "Representing Negative Values (Complement Systems)",
        content: [
          "Representing negative numbers correctly in binary is key. Standard options include:",
          "• Signed-Magnitude: Reserves the leftmost bit strictly as a sign indicator (0 = positive, 1 = negative). Leads to a severe mathematical flaw: it produces both a 'positive zero' and 'negative zero', creating unnecessary circuit complexity.",
          "• Ten's Complement (Decimal) and Two's Complement (Binary): Perfect solutions that map half of the available available integer index strictly to represent negative numbers.",
          "  - Two's Complement formula: The leftmost bit acts as both a sign and key operand. Flipping all bits of a positive number and adding 1 immediately produces its negative equivalent (e.g., 0010 [2] -> 1101 + 1 = 1110 [-2]).",
          "  - Addition and subtraction are calculated cleanly without checking signs. Carry bits overflowing the available bits are simply discarded."
        ]
      },
      {
        title: "Text Representation (ASCII vs. Unicode)",
        content: [
          "To represent letters and text characters, computer systems map them to unique binary codes:",
          "• ASCII (American Standard Code for Information Interchange): Originally standard 7-bit files (128 characters), later expanded to extended 8-bit ASCII (256 characters representing uppercase, lowercase, punctuation, and system command flags).",
          "• Unicode: A 16-bit sequence framework superset representing up to 65,536 characters (enough space to represent international alphabets, math symbols, Cyrillic, Thai, Cherokee, and even emojis)."
        ]
      },
      {
        title: "The Science of Data Compression",
        content: [
          "Compression reduces the physical file space required to store or transmit digital values:",
          "• Lossless Compression: Absolutely zero data is lost (the original source string is reconstituted perfectly). E.g., Text keyword encoding or filesystems zip archives.",
          "• Lossy Compression: Discards imperceptible details (such as inaudible high frequencies in MP3 audio or pixel ranges in JPEG files) to achieve high compression ratios.",
          "Key Text Compression Algorithms:",
          "  1. Keyword Encoding: Replaces frequently occurring words with single rare symbols in code (e.g., replacing 'the' with '~', 'and' with '+').",
          "  2. Run-Length Encoding (RLE): Replaces consecutive repeating characters with an identifier, the character, and the count (e.g., the string 'bbbbbb' translates directly to '*b6').",
          "  3. Huffman Encoding: Assigns variable-length bit strings to symbols based on frequency. Highly frequent letters (like 'e') receive extremely short bit strings (only 1 or 2 bits) while rare letters (like 'z') get longer ones. It guarantees the unique 'Prefix Property' (no code represents the prefix of another), allowing rapid single-pass decoding."
        ]
      }
    ]
  },
  {
    id: "numbers",
    title: "6. Number Systems, Radix Points & Precision Conversions",
    shortTitle: "Math",
    subtitle: "Positional notation mathematics, base conversions (binary, octal, hex, decimal), and fractions base translation.",
    sections: [
      {
        title: "Base Mathematics & Positional Notation",
        content: [
          "The 'base' defines the total number of characters mapped to construct values:",
          "• Decimal (Base 10): 10 digits (0 through 9).",
          "• Binary (Base 2): 2 digits (0 and 1). Much simpler circuits are needed to process arithmetic operations.",
          "• Octal (Base 8): 8 digits (0 through 7).",
          "• Hexadecimal (Base 16): 16 digits (0 through 9, and letters A through F representing 10 through 15).",
          "Positional Notation assigns column weights as powers of the base index:",
          "Math formula for layout base B value: di * B^n-1 + ... (e.g., the base-10 value 954 represents 9*10^2 + 5*10^1 + 4*10^0)."
        ]
      },
      {
        title: "Converting Between Bases: Decimal to Others",
        content: [
          "• Decimal to Base B: Continually divide the decimal value by base B, record the integer remainder as the next digit to the left, and repeat the process on the quotient until it equals zero.",
          "  - E.g., Converting decimal 3567 to Hexadecimal 16:",
          "    3567 / 16 = 222 (remainder 15 -> F)",
          "    222 / 16 = 13 (remainder 14 -> E)",
          "    13 / 16 = 0 (remainder 13 -> D). Reordering the modules gives Hexadecimal DEF.",
          "• Base B to Decimal: Multiply each digit by its positional weight power (B^x) and sum the modules together (e.g., binary 10110 is 1*2^4 + 0*2^3 + 1*2^2 + 1*2^1 + 0*2^0 = 16 + 0 + 4 + 2 + 0 = 22)."
        ]
      },
      {
        title: "Powers of Two Systems Quick Mapping",
        content: [
          "Binary, Octal, and Hexadecimal have an exact power-of-two mathematical relationship, allowing instant groupings of three bits (for Octal) or four bits (for Hexadecimal):",
          "• Binary 10101011 to Octal (group by 3s from the right): 10_101_011 translates to [2][5][3] -> Octal 253.",
          "• Binary 10101011 to Hexadecimal (group by 4s from the right): 1010_1011 translates to [10->A][11->B] -> Hexadecimal AB."
        ]
      },
      {
        title: "Real Numbers, Floating-Points and Fractions Base Conversion",
        content: [
          "• Radix Point (Decimal point): Weights to the right of the point represent negative power weights (e.g. binary column weight 2^-1 represents 1/2, 2^-2 represents 1/4, 2^-3 represents 1/8).",
          "• Scientific Notation / Floating Point representation: Defines fractional real values by keeping the decimal point to the right of the leftmost non-zero digit, using a fixed index (Sign * Mantissa * Base^Exp). This is a floating point because layout digits are fixed while the radix point floats.",
          "• Fractional Base Conversion (Decimal Fraction to Binary Fraction):",
          "  - Multiply the fractional part repeatedly by 2.",
          "  - If the product is >= 1.0, record '1' and drop the leading unit 1 from the product.",
          "  - If the product is < 1.0, record '0'.",
          "  - Repeat the process on the remainder fraction until the value is zero or layout accuracy is hit.",
          "  - E.g., Decimal 0.828125 converts to Binary 0.110101:"
        ]
      }
    ]
  },
  {
    id: "logic",
    title: "7. Logic & Boolean Algebra",
    shortTitle: "Logic",
    subtitle: "The logic framework of computer switches, gate configurations, and truth tables.",
    sections: [
      {
        title: "George Boole & Logic Circuit Foundations",
        content: [
          "Boolean Algebra, developed by mathematician George Boole, uses logic values (true / 1, false / 0) to formalize propositions.",
          "It represents the exact mathematical language of logic circuit design. Gate circuits are physically structured on motherboard chips to evaluate these inputs and produce output results.",
          "Using connectors, complex operations are simplified into equivalent Boolean equations which can be mapped directly to hardware gates."
        ],
        diagramType: "boolean"
      },
      {
        title: "The Seven Logical Operations",
        content: [
          "• AND (C = A • B): Output is 1 if and only if ALL inputs are 1. Represented by flat D-shaped gates.",
          "• OR (C = A + B): Output is 1 if any input is 1. Represented by pointed-curved gates.",
          "• NOT (C = A̅): An inverter. Reverses the logic state (0 becomes 1, 1 becomes 0). Represented by a triangle with a dot.",
          "• NAND (C = A̅•̅B̅): Inverts the AND operation. Output is 0 only if all inputs are 1. One of the universal gates.",
          "• NOR (C = A̅+̅B̅): Inverts the OR operation. Output is 1 only if all inputs are 0.",
          "• XOR (C = A ⊕ B): Exclusive-OR. Output is 1 only if the inputs are different (e.g. input 0, 1 -> 1; input 1, 1 -> 0)."
        ]
      }
    ]
  },
  {
    id: "networks",
    title: "8. Communication Systems, Networks & Problem Solving",
    shortTitle: "Networks",
    subtitle: "The mechanics of networks, topolgies, network architectures, and the Software Development Method (SDM).",
    sections: [
      {
        title: "Basic Components of Communication Systems",
        content: [
          "A communication system transfers signals using four structural divisions: technology rules, hardware devices, physical/signal channels, and protocol software.",
          "• Communications Model: Consists of Source (generates the message), Transmitter (processes & converts the signal), Transmission System (physical medium carrying the signal), Receiver (re-converts the signal), and Destination (the target mainframe or device)."
        ],
        diagramType: "topologies"
      },
      {
        title: "Network Typologies & Cable Channels",
        content: [
          "• Local Area Network (LAN): Connections spanning brief proximity (office, home, campus).",
          "• Metropolitan Area Network (MAN): Backbone network connecting LANs across cities.",
          "• Wide Area Network (WAN): Large networks spanning across cities, countries, or oceans.",
          "Network topologies define layout paths:",
          "  - Bus Topology: Single central cable. Easy and cheap but highly vulnerable to single-point line cuts.",
          "  - Star Topology: All devices cable directly to a central Hub or Switch. Most common in modern Ethernet LANs, avoids local network failure if a single cable breaks.",
          "  - Ring Topology: Closed loop path. Frames circulate around the loop. Can be single or dual lines.",
          "  - Mesh Topology: Connects all devices directly to each other, creating redundant links for high fault tolerance (expensive and complex, mostly used in mission-critical networks like banks)."
        ]
      },
      {
        title: "Network Architecture & Infrastructure Systems",
        content: [
          "• Client/Server Architecture: Clients request services and designated servers respond (e.g., web servers, file database servers).",
          "• Peer-to-Peer (P2P): All devices share equal access, distributing processing files without central server routing.",
          "• Intranet: A private company network protected by a Firewall that utilizes standard Internet protocols.",
          "• Extranet: An extension of an intranet allowing secure, controlled external access to verified suppliers, customers, and partners (often protected using VPN encryption tunnel layers)."
        ]
      },
      {
        title: "Solving Problems Computationally (The Software Development Method)",
        content: [
          "The Software Development Method (SDM) prescribes six rigorous phases to design effective computer solutions:",
          "1. Specification of Needs: Defining exactly what the problem is, what data is needed to solve it, and what constraints exist.",
          "2. Problem Analysis: Identifying program inputs, expected outputs, applicable mathematical formulas, and boundary parameters.",
          "3. Design & Algorithmic Representation: Arranging logical instructions step-by-step. Models are drafted via precise verbal pseudocodes or graphical flowcharts with standardized symbols (Terminal, Process, Input/Output, Decision/Selection, On-page/Off-page Connectors).",
          "4. Implementation: Writing clean, secure computer programs mirroring layout designs.",
          "5. Testing & Verification: Verifying that the code satisfies the original requirement specifications and executing test scenarios to guarantee correctness.",
          "6. Documentation: Detailing requirements, equations, user guides, code descriptions, and code comments to facilitate maintenance."
        ]
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is octal number 11 in decimal representation?",
    options: ["7", "8", "9", "I don't know"],
    answerIndex: 2,
    explanation: "Octal 11 uses base 8 positional notation. Calculating: 1 * 8^1 + 1 * 8^0 = 8 + 1 = 9 in decimal (Base 10)."
  },
  {
    id: 2,
    question: "What is the decimal representation of binary number 1110?",
    options: ["8", "14", "16", "I don't know"],
    answerIndex: 1,
    explanation: "Binary 1110 is calculated using base 2 positional notation: 1*2^3 + 1*2^2 + 1*2^1 + 0*2^0 = 8 + 4 + 2 + 0 = 14."
  },
  {
    id: 3,
    question: "What is the decimal representation of the hexadecimal number FF?",
    options: ["10", "255", "256", "I don't know"],
    answerIndex: 1,
    explanation: "Hexadecimal FF calculates using base 16: F represents 15. Thus, 15 * 16^1 + 15 * 16^0 = 240 + 15 = 255."
  },
  {
    id: 4,
    question: "Add 4 bit binary number 0100 with 0111. What is the answer?",
    options: ["1001", "1011", "1110", "I don't know"],
    answerIndex: 1,
    explanation: "0100 (which is 4 in decimal) + 0111 (7 in decimal) equals 1011 in binary (11 in decimal)."
  },
  {
    id: 5,
    question: "Subtract 4 bit binary number 0100 from 1111. What is the answer?",
    options: ["1001", "1011", "1110", "I don't know"],
    answerIndex: 1,
    explanation: "1111 (15 in decimal) - 0100 (4 in decimal) equals 1011 in binary (11 in decimal)."
  },
  {
    id: 6,
    question: "Convert binary number 11001111 to hexadecimal representation:",
    options: ["CF", "BF", "FC", "I don't know"],
    answerIndex: 0,
    explanation: "Grouping binary 11001111 into two 4-bit sections: Upper group 1100 = 12 (C in hex). Lower group 1111 = 15 (F in hex). Combining leaves CF in base 16."
  },
  {
    id: 7,
    question: "Convert decimal number 375 to its octal representation:",
    options: ["567", "765", "556", "I don't know"],
    answerIndex: 0,
    explanation: "Divide 375 repeatedly by 8:\n375 / 8 = 46 (remainder 7)\n46 / 8 = 5 (remainder 6)\n5 / 8 = 0 (remainder 5).\nReading remainder bottom-to-top leaves octal 567."
  },
  {
    id: 8,
    question: "Convert decimal number 37 to its binary representation:",
    options: ["101001", "100101", "111000", "I don't know"],
    answerIndex: 1,
    explanation: "Divide 37 repeatedly by 2:\n37 / 2 = 18 (remainder 1)\n18 / 2 = 9 (remainder 0)\n9 / 2 = 4 (remainder 1)\n4 / 2 = 2 (remainder 0)\n2 / 2 = 1 (remainder 0)\n1 / 2 = 0 (remainder 1).\nReading remainder lists binary 100101."
  },
  {
    id: 9,
    question: "Convert binary fraction number 0.11 to its decimal value:",
    options: ["0.1", "0.5", "0.75", "I don't know"],
    answerIndex: 2,
    explanation: "Binary positions to the right of the radix point: 1 * 2^-1 + 1 * 2^-2 = 0.5 + 0.25 = 0.75."
  },
  {
    id: 10,
    question: "Convert decimal fraction 0.33 to binary with max 8-bit precision:",
    options: ["0.01010100", "0.11001100", "0.11111111", "I don't know"],
    answerIndex: 0,
    explanation: "Multiply fraction repeatedly by 2:\n0.33 * 2 = 0.66 (carry 0)\n0.66 * 2 = 1.32 (carry 1 -> drop 1)\n0.32 * 2 = 0.64 (carry 0)\n0.64 * 2 = 1.28 (carry 1 -> drop 1)\n0.28 * 2 = 0.56 (carry 0)\n0.56 * 2 = 1.12 (carry 1 -> drop 1)\n0.12 * 2 = 0.24 (carry 0)\n0.24 * 2 = 0.48 (carry 0). Gathering compiles binary 0.01010100."
  },
  {
    id: 11,
    question: "Consider binary number 0.01010100. Compute its decimal value.",
    options: ["0.33", "0.328125", "0.5", "I don't know"],
    answerIndex: 1,
    explanation: "2^-2 (0.25) + 2^-4 (0.0625) + 2^-6 (0.015625) = 0.328125 decimal value. This represents the fractional precision limit of decimal 0.33 on computers."
  }
];
