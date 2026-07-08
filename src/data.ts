import { Chapter, QuizQuestion } from "./types";
import { MCQ_BATCH_1 } from "./mcq_batch1";
import { MCQ_BATCH_2 } from "./mcq_batch2";
import { MCQ_BATCH_3 } from "./mcq_batch3";
import { MCQ_BATCH_4 } from "./mcq_batch4";
import { MCQ_BATCH_5 } from "./mcq_batch5";

export const CHAPTERS: Chapter[] = [
  {
    id: "discipline",
    title: "1. Computer Science as a Discipline & Foundations",
    shortTitle: "Discipline",
    subtitle: "Course objectives, computer definitions, performance characteristics, technology classifications, and the digital divide.",
    sections: [
      {
        title: "Course Objectives & Lesson Framework",
        content: [
          "CSC 101 introduces students to the core foundational concepts of Computer Science, computing architecture, and problem solving.",
          "Curriculum Scope: Topics are systematically structured to cover logic, binary data representation, computer organization, CPU architecture, problem-solving methodologies, networks, the Internet, and basic procedural programming.",
          "Evaluation Weights: Student performance is calculated comprehensively using a strict grading weight system: regular class attendance, interactive activities on the online Moodle learning system (lms.ui.edu.ng), structured quizzes, laboratory experiment sheets, and end-of-semester examinations.",
          "Maximized Lecture Habits: Success in this discipline is enhanced through specific learning habits: maintaining regular class attendance, reading textbook chapters before lectures, visiting the online LMS daily, consulting lecturers during office hours, using IT gadgets to download educational YouTube resources, and actively participating in study/discussion groups."
        ]
      },
      {
        title: "Scientific Definitions & Root Terminology",
        content: [
          "Scientific Definition: Computer Science is defined as the systematic study of algorithmic processes that describe and transform information: their theory, analysis, design, efficiency, implementation, and application (automation).",
          "Latin Roots: The word 'computer' is derived from the Latin verb 'computare', which means 'to reckon, sum, or calculate'. Its root verb 'putare' translates literally as 'to think, settle, or reckon'.",
          "A computer is scientifically defined as a programmable electronic digital processor that handles input, storage, mathematical manipulation, and systematic output of data."
        ],
        keyTerms: [
          { term: "Computer", definition: "A programmable electronic system containing central processors (microprocessors, DSPs, microcontrollers) that can execute a set of machine-level instructions." },
          { term: "Algorithmic Process", definition: "A sequence of unambiguous, well-defined steps designed to solve a specific problem or perform a calculation in a finite number of steps." }
        ]
      },
      {
        title: "Core Characteristics of Computer Systems",
        content: [
          "Computer systems are defined by exceptional operational attributes that distinguish them from manual tools:",
          "• Speed: Capable of executing millions of instructions per second (MIPS) or trillions of floating-point operations per second (FLOPS).",
          "• Accuracy: Electronic circuits execute operations with absolute mathematical precision. However, accuracy is governed by the GIGO (Garbage In, Garbage Out) rule: if incorrect data is supplied, the computer will produce incorrect results.",
          "• Diligence: Unlike humans, computers are immune to fatigue, boredom, lack of concentration, or physical exhaustion. A computer can work continuously for hours or days with completely stable execution precision.",
          "• Versatility: The system exhibits high capability to perform completely different kinds of tasks (e.g. running complex mathematical equations, managing massive business databases, processing graphic vector rendering, or compiling programs).",
          "• Storage Capacity: The ability to store immense volumes of data and retrieve it almost instantaneously. This includes volatile primary RAM memory and non-volatile secondary disks."
        ],
        keyTerms: [
          { term: "Diligence", definition: "The machine's capability to perform continuous, tireless work for extended periods without fatigue, errors, or drops in execution precision." },
          { term: "GIGO (Garbage In, Garbage Out)", definition: "A core computing principle stating that the accuracy of a computer's output is strictly determined by the quality and correctness of its input data." }
        ]
      },
      {
        title: "Classifications of Computers by Technology",
        content: [
          "Computers are classified into three primary categories based on the underlying technology used to represent and process values:",
          "• 1. Analog Computers: Work with continuous physical variables (such as electrical voltage wave lines, fluid pressure, mercury thermal lines, or mechanical gears). They measure physical variables continuously rather than counting discrete numbers.",
          "• 2. Digital Computers: Work with discrete step states represented as binary digits (bits 0 and 1). They process variables by counting distinct states, offering high logical precision and large data storage, though constrained by fixed precision bit-limits.",
          "• 3. Hybrid Computers: Combine the continuous high-speed measurement capabilities of analog systems with the logical precision, memory, and control of digital registers. Used in specialized environments like heart-rate monitors, petrochemical refineries, and flight simulation."
        ],
        keyTerms: [
          { term: "Analog Computer", definition: "An electronic or mechanical computer that measures continuous physical variables continuously, independent of binary or discrete number formats." },
          { term: "Hybrid Computer", definition: "A specialized computer that integrates analog continuous measurement with digital discrete processing and memory capabilities." }
        ]
      },
      {
        title: "The Nature of CS: Computational Problem Solving",
        content: [
          "Computer Science is fundamentally about problem solving. Computational problem solving relies on three primary step blocks:",
          "  - 1. Abstraction: Designing clean mental models of the real world. A representation of the problem that removes redundant, low-level engine details (e.g. driving a car by interacting with a steering wheel and pedals without needing to understand the thermodynamic valves inside the engine).",
          "  - 2. Automation: Automating abstract models through the use of algorithms, which perform actions on and with real-world data.",
          "  - 3. Implementation: Implementing models and algorithms as code (instructions) that the computer can execute, verifying the solution."
        ],
        keyTerms: [
          { term: "Abstraction", definition: "A mental model of a system that removes redundant details, keeping only the essential elements needed to make a specific task understandable." },
          { term: "Information Processing", definition: "The systematic calculation or transformation of raw facts (Data) to discover meaningful, context-oriented states (Information)." },
          { term: "Cow Arithmetic Example", definition: "An educational illustration of information processing: having five cows, receiving two from Maigida, and selling one to Mr. Bako. It takes active processing to transform these transaction events into the structured information that exactly six cows remain." }
        ]
      },
      {
        title: "The Six Layered Computing System",
        content: [
          "To manage complexity, a computer system is partitioned into six structural layers, stacked from physical logic gates to outer communication networks:",
          "  - 1. Information Layer: Dictates how we represent numbers, text, images, audio, and video as binary digits (bits 0 and 1).",
          "  - 2. Hardware Layer: The physical elements of the system (motherboard circuitry, wires, transistors, gates, central processing unit, memory chips, and secondary hard disks).",
          "  - 3. Programming Layer: The set of instructions executed by the hardware (machine language, mnemonic assembly, and compiled high-level software).",
          "  - 4. Operating System Layer: The core control software that schedules programs, manages memory, and provides a clean user interface.",
          "  - 5. Application Layer: High-level programs running to solve user business tasks (word processors, database suites, games).",
          "  - 6. Communication Layer: Connects computers to local networks and the global Internet to share files, documents, and resources."
        ]
      },
      {
        title: "Professional Sub-Specialties in Computer Science",
        content: [
          "According to the professional curriculum, computer scientists exhibit a passion for elegant solutions, logical rigor, mathematical analysis, and diagnostic capabilities. They specialize in several distinct sub-specialties:",
          "• Software Engineers: Model, analyze, design, verify, and maintain large, secure, scalable software modules and code repositories.",
          "• Systems Programmers: Develop and maintain low-level system software including assemblers, compilers, macro assemblers, linkers, and operating system kernels.",
          "• Systems Administrators: Set up, monitor, and maintain local networks, server structures, client devices, and operating configurations.",
          "• Computer Network Specialists: Design, implement, and monitor computer networks, Internet backbones, and intranet channels.",
          "• Information System Programmers: Analyze, design, and maintain data pipelines for corporate management, accounting, and process control.",
          "• Object Technology Specialists: Design and maintain object-oriented applications using modern languages like Java and C++.",
          "• Database System Specialists: Manage, secure, and optimize enterprise database engines, decision-support tools, and expert systems."
        ],
        keyTerms: [
          { term: "Systems Programmer", definition: "A programmer who designs and implements low-level system software like operating systems, compilers, and device drivers." },
          { term: "Peopleware", definition: "The human element of computer systems, including systems analysts, programmers, operators, and systems administrators who keep platforms running." }
        ]
      },
      {
        title: "The Three Founding Traditions & Multi-Disciplinary Careers",
        content: [
          "Computer Science as a discipline brings together three major intellectual traditions:",
          "  - 1. Mathematics Tradition: Provides much of the theory. Theories construct conceptual frameworks and mathematical notations (represented in logic or algebra) to analyze system behavior, verify feasibility, and avoid catastrophic failures.",
          "  - 2. Engineering Tradition: Gives the discipline creativity and design. Computer scientists build complex circuits and assemble practical software engines.",
          "  - 3. Experimental Science Tradition: Uses methodology and principles of systematic science to construct testable explanations and make predictions about the computing universe.",
          "CS maintains deep relationships with other fields:",
          "  - Computer Engineering (CE): Focuses on the physical assembly of hardware and software components with optimal cost-prediction. CS, by contrast, studies the logical feasibility and efficiency of solutions independent of current hardware.",
          "  - Scientific Computing (Computational Biology, Astrophysics, Geology): Applying computing to understand genetics, track lasers, or predict earthquakes.",
          "  - Other Fields: CS skills are utilized in law, medicine, physical life sciences, education, humanities, and social sciences."
        ]
      },
      {
        title: "Science vs. Technology & The Digital Divide",
        content: [
          "• Science: A systematic enterprise that builds and organizes knowledge as testable explanations and predictions (e.g. discovering how human bodies work or how the Earth was formed).",
          "• Technology: Making useful items to serve humanity (e.g. building artificial limbs, hearts, or nanotubes for power lines). Computer Science provides the core models, theories, and software tools allowing technologies like ICT to exist.",
          "• The Digital Divide: Represents the sharp disparity between those who have and those who lack secure access to computer technology.",
          "• In developing countries like Nigeria, unequal digital divides remain prevalent. Disparities are found between rural and urban communities, primary/secondary and higher education, and are reinforced by lacking hardware access and technological skills."
        ],
        keyTerms: [
          { term: "Digital Divide", definition: "The socio-economic gap in access to computers, high-speed internet, and information literacy across communities." },
          { term: "Dedicated System", definition: "A computer system packaged as part of a larger medical or utility technology (e.g., writing the software programs that make artificial heart valves function)." }
        ]
      }
    ]
  },
  {
    id: "history",
    title: "2. The Magnificent History & Evolution of Computing",
    shortTitle: "History",
    subtitle: "Pioneers (Babbage, Lovelace, Atanasoff), key electronic breakthroughs, and the five semiconductor generations.",
    sections: [
      {
        title: "The Ancient & Pioneer Era",
        content: [
          "Before electronic processors, counting rested on physical items (scratches on sand, bones, stones).",
          "• Stonehenge: Serves as a primitive calendar pointing to celestial summer solstices.",
          "• The Abacus: One of the first systematic mechanical tools originating in ancient China to automate counting arithmetic.",
          "• Al-Khowarizmi (12th Century cleric): Formalized the concept of a written process for doing something, publishing the historical foundation of 'algorithms' (the basis of software).",
          "• Napier's Bones (1617): John Napier invented logarithmic computing strips to facilitate complex multiplication and division.",
          "• Slide Rule (1632): Anglican mathematician William Oughtred invented standard circular and straight slide rules matching logarithmic properties.",
          "• Blaise Pascal (1642): Designed the Pascaline, a hand-geared mechanical desktop calculator mimicking an odometer for addition and subtraction. It was a massive mechanical leap, though not programmable.",
          "• Gottfried Wilhelm von Leibniz (1673): Invented a hand-cranked physical multiplier (the Leibniz wheel or stepped drum multiplier) and documented binary arithmetic—the representation layer of modern computers."
        ],
        keyTerms: [
          { term: "Abacus", definition: "The earliest known manual computing platform introduced to register arithmetic values using beads on rods." },
          { term: "Pascaline", definition: "A mechanical desktop calculator invented by Blaise Pascal in 1642 that performed addition and subtraction via hand-turned gears." }
        ]
      },
      {
        title: "The Industrial Revolution & Analytical Visionaries",
        content: [
          "• Joseph Marie Jacquard (1801): Invented the Jacquard loom, which utilized punched wooden cards to automate intricate silk patterns, demonstrating that physical machines could read programs.",
          "• Charles Babbage (1792-1872): The father of modern computing who recognized human-error issues in navigational mathematical tables.",
          "  - Difference Engine: Mechanically computed polynomial variables using the method of finite differences. (A full replica was successfully built in 1989-1991 for the London Science Museum).",
          "  - Analytical Engine: A revolutionary design that was Turing Complete. It could read program scripts from punched cards, utilized sequential control, branching, and looping structures.",
          "• Lady Ada Lovelace (Countess of Lovelace): The world's first programmer. She documented Babbage's designs, wrote explanations of the mechanical arithmetic, and composed a program for the Difference Engine to compute Bernoulli numbers.",
          "• Herman Hollerith: Designed an electro-mechanical punched-card tabulator to sort and process the massive 1890 U.S. Census, lowering compilation from decades to weeks. He founded the Tabulating Machine Company (later CTR, renamed International Business Machines - IBM in 1924 under Thomas J. Watson, nicknamed 'Big Blue' due to its classic corporate styling and branding)."
        ],
        keyTerms: [
          { term: "Analytical Engine", definition: "Charles Babbage's mechanical design which was the first Turing-complete computer, incorporating memory (the store), a CPU (the mill), and punched-card programming." },
          { term: "Lady Ada Lovelace", definition: "Countess of Lovelace, celebrated as the first programmer for creating a step-by-step algorithm to compute Bernoulli numbers on Babbage's machines." },
          { term: "IBM (Big Blue)", definition: "Derived from CTR, officially renamed International Business Machines in 1924, becoming a dominant force in corporate mainframes and personal computers." }
        ]
      },
      {
        title: "The Electronic Dawn & The World War II Catalyst",
        content: [
          "Wartime resource pressures accelerated computer research for two main military applications: calculating rapid artillery ballistic tables and breaking complex encrypted codes.",
          "• Lee de Forest (1906): Invented the vacuum tube triode. This three-terminal electronic valve amplified signals and acted as a fast electronic switch, replacing mechanical gear links and paving the way for digital logic.",
          "• John Vincent Atanasoff & Clifford Berry (1939-1942): Designed and built the ABC (Atanasoff-Berry Computer) at Iowa State University. Built with vacuum tubes, it was a special-purpose machine built specifically to solve 29 simultaneous linear algebraic equations. ABC was the first electronic digital computer, a fact legally confirmed by a landmark 1973 U.S. patent lawsuit ruling that invalidated ENIAC's patents in favor of Atanasoff's prior work.",
          "• Alan Turing: Abstractly modeled the mathematical limits of computers via the 'Turing Machine' (solving the Halting Problem, demonstrating not all problems are decidable on computers). He made landmark contributions at Bletchley Park using the Colossus machine to scan and break the German Enigma transmission codes at 25,000 characters per second.",
          "• Howard Aiken & Grace Hopper: Aiken built the massive electro-mechanical Harvard Mark I computer (51 feet long, 5 tons, running on relational relays, completed in 1944). Grace Hopper programmed it, coined the term 'bug' when extracting a moth from a physically stuck relay, and created the earliest compiler compilers.",
          "• ENIAC (1946): Designed by Eckert and Mauchly. The first general-purpose electronic digital computer-operated using heat-generating vacuum tubes. It ran 1000 times faster than the Mark I, but calculated using base 10 (decimal) ring counters rather than native binary, and had no internal program storage (it had to be re-wired physically with switches and patch cords).",
          "• EDSAC (1949): Engineered by Maurice Wilkes at the University of Cambridge. It was the first fully functional stored-program electronic computer in practical service.",
          "• Shockley, Bardeen, & Brattain (1947): Invented the semiconductor Point-Contact Transistor at Bell Labs. This tiny switch replaced fragile, power-hungry, slow vacuum tubes and won them the Nobel Prize."
        ],
        keyTerms: [
          { term: "Vacuum Tube Triode", definition: "An electronic valve invented by Lee de Forest in 1906 that controlled electrical current, enabling early fully-electronic digital systems." },
          { term: "Atanasoff-Berry Computer (ABC)", definition: "The first vacuum-tube electronic digital computer, built at Iowa State University to solve simultaneous linear equations, recognized as the pioneer electronic computer by a 1973 patent court ruling." },
          { term: "Harvard Mark I", definition: "A massive 51-foot electro-mechanical calculator designed by Howard Aiken and completed in 1944, using mechanical relays to execute loops automatically." }
        ]
      },
      {
        title: "The Stored Program Concept (Von Neumann Machine)",
        content: [
          "John von Neumann consulted on the ENIAC and designed the prospective EDVAC (1951).",
          "He established the fundamental 'Stored Program Concept' where data and program instructions are stored together inside the same electronic memory grid.",
          "He advocated for binary numbering rather than decimal switches, noting computers work best with two solid physical states (voltage ON or OFF)."
        ],
        keyTerms: [
          { term: "Stored Program Concept", definition: "The revolutionary design principle where software program instructions and operational data are stored together in the same main memory address space." },
          { term: "EDVAC", definition: "Electronic Discrete Variable Automatic Computer, one of the earliest electronic computers designed to utilize the binary system and Von Neumann's stored-program architecture." }
        ]
      },
      {
        title: "The Five Computer Generations",
        content: [
          "• First Generation (1946-1957): Characterized by vacuum tubes. Magnetic drums functioned as the standard high-speed primary memory, and magnetic tapes/punched cards emerged as secondary media. Programmed initially in raw binary machine code (1GL) before assembly translators emerged. Includes ENIAC, EDSAC, and UNIVAC (the first commercial computer produced in the US).",
          "• Second Generation (1958-1964): Powered by individual crystal transistors. Introduced non-volatile magnetic core memory and early hard disks. High-level portable programming languages emerged (FORTRAN for calculations, COBOL for enterprise invoices, and BASIC), and bulk commercial impact line printers began printing corporate ledgers. Includes IBM 1401 data systems.",
          "• Third Generation (1965-1971): Integrated Circuits (ICs) emerged, containing multiple gates inside Small Scale Integration (SSI) and Medium Scale Integration (MSI) silicon chips. Time-sharing operating systems revolutionized efficiency. Minicomputers entered the market, led by the IBM System/360 series.",
          "• Fourth Generation (1972-1977): Large Scale Integration (LSI) consolidated tens of thousands of gate elements onto a single silicon chip, giving rise to the 'microprocessor' (a CPU on a single chip, e.g. Intel 4004 in 1971). This ignited the personal computer (PC) revolution (MITS Altair, Apple II in 1975, and the highly standardized IBM PC 8088 in 1981, which was limited to 640KB of user RAM under DOS).",
          "• Fifth Generation (1978-Date): Very Large Scale Integration (VLSI) enables millions/billions of transistors on a single microchip (e.g. Pentium, Core i9). Research focused heavily on parallel processing (running thousands of processes concurrently) and artificial intelligence."
        ],
        keyTerms: [
          { term: "Moore's Law", definition: "Formulated by Gordon Moore in 1965, observing that the density of transistors on a memory chip doubles approximately every two years, causing computing power to rise exponentially over time." },
          { term: "Integrated Circuit (IC)", definition: "A semiconductor silicon chip invented independently by Jack Kilby and Robert Noyce, containing thousands or millions of fabricated transistors, resistors, and capacitors." }
        ]
      }
    ]
  },
  {
    id: "architecture",
    title: "3. Hardware, Categories & Peripherals",
    shortTitle: "Hardware",
    subtitle: "The mechanics of Von Neumann buses, CPU cycles, primary RAM/ROM, secondary storage density, and specialized peripherals.",
    sections: [
      {
        title: "The Von Neumann Architecture Standard",
        content: [
          "Virtually all modern general-purpose computers share the Stored-Program Von Neumann architecture, identifying four essential logical divisions:",
          "1. Input Unit: Transmits data and commands from the physical world into memory.",
          "2. Output Unit: Translates binary system registers into text, graphics, or physical actions that humans can read and understand.",
          "3. Memory Unit: A physical addressable grid containing both active instruction operations and computational data variables.",
          "4. Central Processing Unit (CPU): The main controller orchestrating command strings on data representations."
        ],
        diagramType: "bus"
      },
      {
        title: "Mainframe Computers vs. Supercomputers",
        content: [
          "The curriculum divides computers based on utility depth into two primary models: Special-Purpose (embedded systems designed for one mechanical task like washing machines) and General-Purpose (dynamic machines solving diverse problems).",
          "Within general-purpose computers, large-scale systems have specific architectural priorities:",
          "• Supercomputers: Powerhouses running thousands of parallel processor nodes. They prioritize single-task raw calculation speeds, measured in trillions of floating-point operations per second (FLOPS). Historically cooled with liquid nitrogen to disperse extreme heat. Used for weather simulations, quantum physics, and nuclear modeling.",
          "• Mainframe Computers: Large-scale room-sized systems designed to handle massive multi-user concurrent input/output (I/O) throughput. They prioritize database transaction processing, billing, and enterprise records, servicing thousands of remote terminals concurrently."
        ],
        keyTerms: [
          { term: "Supercomputer", definition: "A class of computers optimized for maximum raw calculation speed, utilizing massive parallel processing to execute trillions of calculations per second." },
          { term: "Mainframe Computer", definition: "A class of computers optimized for massive multi-user concurrent data throughput, transaction processing, and system reliability." },
          { term: "Dumb Terminal", definition: "A terminal lacking local processing power or memory, acting purely as an input keyboard and output display connected to a mainframe computer." }
        ]
      },
      {
        title: "Under the Hood: Inside the CPU & System Units",
        content: [
          "The CPU coordinates and executes all operations. It consists of two core structures and localized registers:",
          "• Control Unit (CU): The scheduler. It reads stored instruction parameters, decodes them using the Control Section, and directs the flow of data among the ALU, registers, and memory.",
          "• Arithmetic Logic Unit (ALU): The mathematical core. It performs basic mathematical calculations (addition, subtraction) and logical inequality evaluations (comparisons like AND, OR, XOR, XNOR).",
          "• System Registers: Tiny, high-speed memory cells inside the CPU itself that temporarily hold the active instruction, data operands, and calculation results.",
          "The machine behavior obeys a cyclic loop called the 'Machine Cycle' containing four stages:",
          "  - Step 1: Fetch (Control Unit obtains a program instruction from primary memory using its address register).",
          "  - Step 2: Decode (Control Unit translates the instruction into internal processor command signals).",
          "  - Step 3: Execute (The ALU or gate circuits perform the mathematical or logical operation).",
          "  - Step 4: Store (Saves the resulting output value back into primary memory address structures)."
        ],
        keyTerms: [
          { term: "Machine Cycle", definition: "The four-step sequence (Fetch, Decode, Execute, Store) performed continuously by the CPU for every instruction." },
          { term: "Flip-Flop", definition: "A basic latching logical circuit formed by discrete cross-coupled logic gates that can hold a single binary state (0 or 1)." }
        ]
      },
      {
        title: "System Busses & Primary Memory Systems",
        content: [
          "The System Bus is the shared physical wiring path transmitting binary signals among CPU parts, registers, and memory slots:",
          "• Data Bus: A bi-directional, high-capacity pipeline mapping information back and forth between elements.",
          "• Address Bus: A uni-directional pipeline carrying system memory location indices to coordinate target selections.",
          "• Control Bus: Carries synchronization pulses signifying operations (triggering READ or WRITE cycles).",
          "Primary Memory temporarily holds data and is measured in bytes (KB, MB, GB, TB):",
          "• Random Access Memory (RAM): Volatile active workspace. It allows concurrent read/write operations.",
          "  - Dynamic RAM (DRAM): Most common type, cheap, but capacitor nodes slowly leak electrical charge and require continuous electronic refresh signals to retain data.",
          "  - Static RAM (SRAM): Much faster and more stable, using flip-flop latching circuits to hold charge without constant refreshing, but is highly expensive (typically used in high-speed CPU cache memory).",
          "• Read-Only Memory (ROM): Non-volatile permanent data storage written by manufacturers (e.g. BIOS Firmware).",
          "  - PROM: Programmable ROM written permanently once.",
          "  - EPROM: Erasable Programmable ROM, allowing UV light exposure through a quartz window to erase and reconstruct firmware scripts.",
          "  - EEPROM: Electrically Erasable Programmable ROM, erasable and rewriteable electronically."
        ],
        keyTerms: [
          { term: "DMA (Direct Memory Access)", definition: "An interface standard allowing high-speed I/O devices to read from or write to primary memory directly, bypassing CPU clock cycles." },
          { term: "BIOS", definition: "Basic Input Output System, non-volatile ROM firmware that initializes hardware components and boots the operating system." }
        ]
      },
      {
        title: "Secondary Storage Technologies & Media Density",
        content: [
          "Since primary RAM Memory is volatile, long-term non-volatile 'Secondary Storage' is required:",
          "• Magnetic Disk: Includes floppy disks (common sizes: 8-inch, 5.25-inch, and 3.5-inch templates holding 1.44MB) and rigid Hard Disks. Consists of narrow recording circles (Tracks) partitioned into segments (Sectors). Disk formatting indexes bad sectors and establishes filesystems. Allows fast random 'Direct Access' (DASD). Disk platters are coated on both read surfaces with high-retentivity magnetic metallic oxide, and electromagnetic read/write heads scan tracks using precise actuators.",
          "  - Storage Density: Magnetic disk capacity is determined by three parameters: track recording density (tracks per inch), bit packing density along active tracks (bits per inch), and the number of recordable platter surfaces.",
          "• Magnetic Tape: Older plastic ribbon storage coated with magnetic iron oxide. Slow because it uses sequential access (heads must scan sequentially over intervening tracks), but highly stable and cost-effective for backup archives.",
          "• Optical Disk: Uses lasers to scan microscopic physical reflective variations (lands represent 1s, non-reflective pits represent 0s). Includes CD-ROM (650MB to 1GB read-only), CD-R, CD-RW, and DVDs (4.7GB to 17GB)."
        ],
        keyTerms: [
          { term: "DASD", definition: "Direct Access Storage Device, a category of non-volatile memory (like magnetic disks) that allows immediate access to any data cell directly without scanning sequentially." },
          { term: "Sector", definition: "The smallest addressable physical block on a magnetic disk track, typically storing 512 bytes or 4 Kilobytes of data." }
        ]
      },
      {
        title: "Advanced Input/Output Peripheral Technologies",
        content: [
          "• Input Peripherals: Keyboards, mice, trackballs, touchpads, joysticks, light pens, touchscreens, styluses, and digital tablets.",
          "• Source Data Automation: Captures raw paper metrics directly into memory:",
          "  - OCR (Optical Character Recognition): Scans printed text. Reads standardized font characters.",
          "  - OMR (Optical Mark Recognition): Light sensors reading hand-drawn pencil bubbles (standard MCQ sheets).",
          "  - MICR (Magnetic-Ink Character Recognition): Translates magnetized ink characters on banking checks.",
          "  - Scanners: Flatbed scanners move light underneath paper, reflect images off mirrors, route to an ADC (Analog-to-Digital Converter), and save pixels to hardware.",
          "  - Voice Recognition: Dictation captured by microphones, mapped to digital curves via ADC, and translated using NLP matching engines.",
          "• Output Peripherals: CRT Monitors, Video Graphics Adapter (VGA) cards, landscape/portrait printers (impact dot-matrix vs non-impact laser/inkjet), and multi-colored pen plotters.",
          "  - Laser Printers: Offer optimal sharpness, speed, and exact DPI (Dots Per Inch) scaling, utilizing electrostatic rollers to draw dry ink powder (Toner) directly onto paper.",
          "  - Plotters: Active mechanical printing peripherals that use physical pens to draw continuous, high-precision vector images/graphs directly onto paper sheets (ideal for CAD blueprints).",
          "  - COM (Computer Output to Microfilm): Records computer-generated records directly onto analog microfilm, offering extremely compact archival sizing and rapid microfilm scan reading.",
          "• Speed Buffering: Buffering is the technique of allocating temporary memory space (a buffer) to balance speed differences between processing engines and slow external ports. Spooling buffers printer tasks so the CPU can resume other programs instantly."
        ],
        keyTerms: [
          { term: "Plotter", definition: "An output peripheral that draws high-precision vector line drawings directly onto paper using physical pens." },
          { term: "Buffering", definition: "A programming or hardware technique of allocating temporary RAM partitions to balance speed disparities between fast processors and slow devices." },
          { term: "DPI", definition: "Dots Per Inch, a measure of print resolution and density indicating how many individual ink dots are printed within a linear inch." }
        ]
      }
    ]
  },
  {
    id: "software",
    title: "4. Operating Systems, Software & Code Languages",
    shortTitle: "Software",
    subtitle: "System vs. Application software, operating system roles, compilation stages, and language translator tools.",
    sections: [
      {
        title: "System Software vs. Application Software",
        content: [
          "• System Software: Controls access to computer hardware, making the underlying physical machinery accessible to developers and applications. It acts as an orchestrator and resource provider. It includes Operating Systems (OS), compilers, interpreters, linkers, loaders, device drivers, and system utility programs (like antivirus scanners, file compressors, and debuggers).",
          "• Application Software: Direct programs customized to solve user tasks (such as spreadsheets, text processing, databases, graphics, and web browsers). Includes general-purpose suites (e.g., Microsoft Word, Excel, Access) and special-purpose customized software (desktop publishing editors, hospital medical diagnostic monitors, and scientific calculators)."
        ],
        keyTerms: [
          { term: "System Software", definition: "Software designed to manage and control computer hardware resources, providing a foundation for application programs to run." },
          { term: "Application Software", definition: "End-user programs engineered to perform specific functional tasks, such as word processing, spreadsheets, or database systems." },
          { term: "Firmware", definition: "An intermediate class of software permanently written into physical non-volatile Read-Only Memory (ROM) chips (like BIOS/UEFI) by manufacturers to initialize components at boot." },
          { term: "Utility Software", definition: "System tools designed to analyze, configure, optimize, or maintain a computer, including antivirus scanners, file compression tools (ZIP), disk defragmenters, and debuggers." }
        ]
      },
      {
        title: "Crucial Functions of an Operating System (OS)",
        content: [
          "The OS is the master control program of the computer system, emerging primarily during the Third Generation (1965-1971) alongside multi-tasking integrated circuits. It manages the physical hardware grid dynamically through several coordinate divisions:",
          "• Processor Management (CPU Scheduling): Multiplexes thread executions to coordinate CPU cycles among active applications, facilitating simultaneous multi-tasking and multi-user environments.",
          "• Memory Allocation & Management: Dynamically registers and assigns physical RAM addresses, loads programs into memory, ensures active processes don't overwrite each other's workspaces, and administers Virtual Memory swap spaces.",
          "• Device & Input/Output (I/O) Handling: Dictates standard protocols to communicate with diverse peripheral hardware via device drivers, managing buffered queues to printers, mice, keyboards, and displays.",
          "• File System Management: Organizes hierarchical directories, maps logical files onto physical storage tracks/sectors, and enforces security access permissions.",
          "• User Interfaces: Standardizes how humans interact with machine circuits, transitioning from Command-Line Interfaces (CLI - like DOS, requiring memorized typed statements) to Graphical User Interfaces (GUI - like Windows or Linux, utilizing visual windows, icons, menus, and mouse pointers)."
        ],
        keyTerms: [
          { term: "DOS (Disk Operating System)", definition: "An early non-user-friendly Command-Line Interface operating system, requiring users to memorize and input exact text commands line-by-line." },
          { term: "Microsoft Windows", definition: "A Graphical User Interface (GUI) operating system originally running as a shell on top of DOS before moving to a fully independent, multi-tasking kernel architecture." },
          { term: "Linux", definition: "A widely utilized, secure, open-source UNIX-like operating system kernel powering modern server infrastructure, systems networks, and cloud applications." },
          { term: "CPU Scheduling", definition: "The process by which the operating system decides which active program thread receives CPU cycles next, enabling concurrent multi-tasking." }
        ]
      },
      {
        title: "Language Translators: Compilers, Interpreters, and Assemblers",
        content: [
          "Since computer hardware natively understands only binary machine instructions (1GL), all programs written in higher generations must be translated before execution:",
          "• Compilers: Translate the entire high-level program source code file into a standalone executable machine language file (object file) in a single compile pass before execution begins. Once compiled, execution is highly efficient and runs independently of the compiler.",
          "  - A standard compiler parses code through distinct sequential execution stages:",
          "    - 1. Lexical Analysis: Scans the raw stream of characters to group them into meaningful vocabulary units called tokens.",
          "    - 2. Syntax Analysis: Parses the token stream against formal grammar rules to build a structured hierarchical syntax tree, identifying syntax errors.",
          "    - 3. Semantic Analysis: Evaluates the meaning of the syntax structure, checking data types, compatibility, and logical constraints.",
          "    - 4. Code Generation & Optimization: Translates the parsed trees into optimized target native machine language or object instructions.",
          "• Interpreters: Translate and execute high-level program statements line-by-line during runtime. They do not generate a persistent standalone executable file. Translation occurs dynamically every time the code runs, making debugging interactive but execution slower.",
          "• Assemblers: Translate symbolic, mnemonic assembly language instructions (2GL) directly into native binary machine code (1GL) for the target processor."
        ],
        keyTerms: [
          { term: "Compiler", definition: "A translating program that converts the entire high-level source code file into executable machine language code in one single compile step before execution." },
          { term: "Interpreter", definition: "A translating program that converts and executes high-level source statements line-by-line dynamically at runtime." },
          { term: "Assembler", definition: "A system program that translates mnemonic-based assembly language scripts (2GL) directly into binary machine instructions (1GL)." },
          { term: "Lexical Analysis", definition: "The first phase of compilation, scanning source characters to group them into vocabulary chunks called tokens." },
          { term: "Syntax Analysis", definition: "The compilation phase that checks tokens against grammatical language rules to build an abstract syntax tree (AST)." }
        ]
      },
      {
        title: "Translating Support Tools: Linkers and Loaders",
        content: [
          "Creating and executing a high-level application involves more than raw translation. Two crucial utility programs operate in tandem behind the scenes:",
          "• The Linker (Linkage Editor): When a compiler translates individual files, it generates independent 'object modules'. The Linker binds these multiple object code modules, external system library modules, and resources together, resolving cross-references to produce a single, cohesive, executable machine-level parameter file.",
          "• The Loader: When an executable program is triggered by a user, the Operating System invokes the Loader. The Loader copies the compiled machine instructions from secondary storage (like a Hard Disk Drive or Solid-State Drive) into physical primary RAM memory addresses, configures runtime memory frames, registers the starting PC address, and schedules it for execution by the CPU."
        ],
        keyTerms: [
          { term: "Linker", definition: "A system program that combines compiled object code modules and pre-built system libraries into a single executable binary file." },
          { term: "Loader", definition: "A system program that copies executable program instructions from secondary storage into primary RAM memory, preparing it for CPU execution." }
        ]
      },
      {
        title: "The Levels & Evolution of Programming Languages",
        content: [
          "Languages define an agreed-upon format of rules and symbols instructing computers to process variables, evolving across generations:",
          "• Machine Language (1st Generation - 1GL): The machine's natural binary format (strings of 0s and 1s directly executed inside the CPU). It is extremely difficult to write, highly prone to human error, and completely non-portable (machine-dependent).",
          "• Assembly Language (2nd Generation - 2GL): Replaced binary strings with English-like abbreviations and mnemonic codes (e.g., L 1, GROSSPAY; S 1, TAX; ST 1, NETPAY). Requires an Assembler to translate instructions. Still machine-dependent.",
          "• High-Level Languages (3rd to 4th Generation - 3GL/4GL): Uses English-like algebraic expressions (e.g., Netpay = gross pay - tax). Highly portable, requiring compilers or interpreters. Notable historic options include:",
          "  - FORTRAN: Formulated in the 1950s (standing for Formula Translation) and optimized for complex engineering calculations and scientific formulas.",
          "  - COBOL: Built in the 1960s (standing for Common Business-Oriented Language) and optimized for commercial business, accounting, and database invoices.",
          "  - Pascal: Created as an elegant educational learning framework to enforce structured, safe programming standards and discipline.",
          "  - C: A procedural language with low-level pointer control, highly popular for creating operating systems, system drivers, and compilers.",
          "  - C++ and Java: Object-oriented programming (OOP) models. C++ adds classes and systems power to C, while Java compiles to portable Bytecodes executed globally on any machine running a Java Virtual Machine (JVM)."
        ],
        keyTerms: [
          { term: "Machine Language (1GL)", definition: "The lowest-level programming language, consisting of raw binary sequences that can be directly executed by the CPU without translation." },
          { term: "Assembly Language (2GL)", definition: "A low-level language representing machine instructions as symbolic, English-like mnemonic abbreviations." },
          { term: "High-Level Language (3GL)", definition: "A machine-independent language using English words and algebraic notations, requiring translation into machine code." },
          { term: "FORTRAN", definition: "The pioneer high-level language created in the 1950s, designed specifically for Formula Translation in scientific and engineering tasks." },
          { term: "COBOL", definition: "Common Business-Oriented Language, designed in the 1960s for corporate commercial transactions and financial records." }
        ]
      }
    ]
  },
  {
    id: "representation",
    title: "5. Information Representation, Arithmetic & Compression",
    shortTitle: "Representation",
    subtitle: "Analog digitization, complement arithmetic, character encoding (ASCII, EBCDIC, Unicode), and compression algorithms.",
    sections: [
      {
        title: "Analog vs. Digital and Electronic Signals",
        content: [
          "Computers are finite, but the outer universe is infinite. To process parameters, computers digitize them (breaking data into discrete elements):",
          "• Analog Data: Continuous waveforms (such as traditional records, fluid mercury thermometers, or raw sound waves).",
          "• Digital Data: Discrete segments (discontinuous binary digits representing steps).",
          "• Signal Degradation: Electronic signals degrade due to resistance and noise over distance. Digital signals are routinely reclocked (using a voltage threshold) to restore pristine square shapes, preventing cumulative error, unlike analog signals.",
          "• Audio Representation: Audio waves are captured by periodic voltage measurement (Sampling). Sound waves are digitized at a sampling rate of ~40,000 times per second to create a clean, high-fidelity reproductive stream using PCM (Pulse Code Modulation)."
        ],
        diagramType: "complement"
      },
      {
        title: "Representing Negative Values (Complement Systems)",
        content: [
          "Representing negative numbers correctly in binary is key. Standard options include:",
          "• Signed-Magnitude: Reserves the leftmost bit strictly as a sign indicator (0 = positive, 1 = negative). Leads to a severe mathematical flaw: it produces both a 'positive zero' (0000) and 'negative zero' (1000), creating unnecessary logic circuit complexity.",
          "• Ten's Complement (Decimal) and Two's Complement (Binary): Perfect solutions that map half of the available integer index strictly to represent negative numbers.",
          "  - Two's Complement formula: The leftmost bit acts as both a sign and key operand. Flipping all bits of a positive number (one's complement) and adding 1 immediately produces its negative equivalent (e.g., 0010 [2] -> 1101 + 1 = 1110 [-2]).",
          "  - Addition and subtraction are calculated cleanly without checking signs. Carry bits overflowing the available bits are simply discarded."
        ],
        keyTerms: [
          { term: "Signed-Magnitude", definition: "A binary negative number representation reserving the MSB for sign, resulting in two redundant representations of zero." },
          { term: "Two's Complement", definition: "The standard binary representation of negative integers, obtained by inverting all bits of the positive number and adding 1." }
        ]
      },
      {
        title: "Text Representation (ASCII, EBCDIC, vs. Unicode)",
        content: [
          "To represent letters and text characters, computer systems map them to unique binary codes:",
          "• ASCII (American Standard Code for Information Interchange): Originally standard 7-bit files (128 characters), later expanded to extended 8-bit ASCII (256 characters representing uppercase, lowercase, punctuation, and system command flags). Highly standard in microcomputers.",
          "• EBCDIC (Extended Binary Coded Decimal Interchange Code): An 8-bit character encoding system used primarily on IBM mainframe architectures, supporting up to 256 unique characters.",
          "• Unicode: A 16-bit sequence framework superset representing up to 65,536 characters (enough space to represent international alphabets, math symbols, Cyrillic, Thai, Cherokee, and even emojis)."
        ],
        keyTerms: [
          { term: "ASCII", definition: "An 8-bit character encoding standard defining 256 characters, widely adopted in personal computers and digital communication." },
          { term: "EBCDIC", definition: "An 8-bit character encoding standard developed by IBM, used historically and currently on mainframe computer architectures." },
          { term: "Unicode", definition: "A 16-bit character encoding superset designed to support and standardize all writing systems of the world, mapping up to 65,536 characters." },
          { term: "Nibble", definition: "A unit of data size representing exactly 4 binary bits (equivalent to half of a standard byte)." }
        ]
      },
      {
        title: "The Science of Data Compression & Floating Precision",
        content: [
          "Compression reduces the physical file space required to store or transmit digital values:",
          "• Lossless Compression: Absolutely zero data is lost (the original source string is reconstituted perfectly). E.g., Text keyword encoding or filesystems zip archives.",
          "• Lossy Compression: Discards imperceptible details (such as inaudible high frequencies in MP3 audio or pixel ranges in JPEG files) to achieve high compression ratios.",
          "Key Text Compression Algorithms:",
          "  1. Keyword Encoding: Replaces frequently occurring words with single rare symbols in code (e.g., replacing 'the' with '~', 'and' with '+').",
          "  2. Run-Length Encoding (RLE): Replaces consecutive repeating characters with an identifier, the character, and the count (e.g., the string 'bbbbbb' translates directly to '*b6').",
          "  3. Huffman Encoding: Assigns variable-length bit strings to symbols based on frequency. Highly frequent letters (like 'e') receive extremely short bit strings (only 1 or 2 bits) while rare letters (like 'z') get longer ones. It guarantees the unique 'Prefix Property' (no code represents the prefix of another), allowing rapid single-pass decoding.",
          "Floating-Point Precision: Fractional values on computers are stored as floating points. In standard double-precision float representation, mathematical accuracy is approximately 16 decimal digit values."
        ],
        keyTerms: [
          { term: "Lossless Compression", definition: "A compression method that allows the original data to be reconstructed perfectly from the compressed file without any data loss." },
          { term: "Huffman Encoding", definition: "An algorithm that generates optimal prefix-free codes for data compression based on the frequency of occurrence of each character." },
          { term: "Double-Precision", definition: "A floating-point format that utilizes 64 bits to represent fractional values, maintaining approximately 16 decimal digits of accuracy." }
        ]
      }
    ]
  },
  {
    id: "numbers",
    title: "6. Number Systems, Radix Points & Precision Conversions",
    shortTitle: "Math",
    subtitle: "Positional notation, base conversion procedures, power-of-two shortcuts, and fraction base division methods.",
    sections: [
      {
        title: "Base Mathematics & Positional Notation",
        content: [
          "The 'base' (or radix) defines the total number of unique character symbols mapped to construct values:",
          "• Decimal (Base 10): 10 digits (0 through 9).",
          "• Binary (Base 2): 2 digits (0 and 1). Much simpler hardware circuits are needed to process binary arithmetic operations.",
          "• Octal (Base 8): 8 digits (0 through 7).",
          "• Hexadecimal (Base 16): 16 digits (0 through 9, and letters A through F representing 10 through 15).",
          "Positional Notation assigns column weights as powers of the base index:",
          "Math formula for layout base B value: Sum of (d_i * B^i) (e.g., the base-10 value 954 represents 9*10^2 + 5*10^1 + 4*10^0 = 900 + 50 + 4)."
        ]
      },
      {
        title: "Converting Between Bases: Decimal to Others",
        content: [
          "• Decimal to Base B: Continually divide the decimal value by base B, record the integer remainder as the next digit to the left, and repeat the process on the quotient until it equals zero.",
          "  - E.g., Converting decimal 3567 to Hexadecimal 16:",
          "    3567 / 16 = 222 (remainder 15 -> F)",
          "    222 / 16 = 13 (remainder 14 -> E)",
          "    13 / 16 = 0 (remainder 13 -> D). Reordering the remainder modules yields Hexadecimal DEF.",
          "• Base B to Decimal: Multiply each digit by its positional weight power (B^x) and sum the modules together (e.g., binary 10110 is 1*2^4 + 0*2^3 + 1*2^2 + 1*2^1 + 0*2^0 = 16 + 0 + 4 + 2 + 0 = 22)."
        ]
      },
      {
        title: "Powers of Two Systems Quick Mapping",
        content: [
          "Binary, Octal, and Hexadecimal have an exact power-of-two mathematical relationship (2^3 = 8, 2^4 = 16), allowing instant groupings of three bits (for Octal) or four bits (for Hexadecimal):",
          "• Binary 10101011 to Octal (group by 3s from the right): 10_101_011 translates to [2][5][3] -> Octal 253.",
          "• Binary 10101011 to Hexadecimal (group by 4s from the right): 1010_1011 translates to [10->A][11->B] -> Hexadecimal AB."
        ]
      },
      {
        title: "Fractions & Base-Conversion Methods",
        content: [
          "Fractions are represented as floating points using scientific notation (Sign * Mantissa * Base^Exp). Positions to the right of the radix point are negative power columns (e.g., 2^-1 = 0.5, 2^-2 = 0.25). To convert fraction bases, the curriculum shows two distinct methods:",
          "• 1. Intuitive Weight Sum Method: Sum the fractional column products (e.g., 0.12201 in base 3 becomes 1*(1/3) + 2*(1/9) + 2*(1/27) + 0 + 1*(1/243) = 0.3333 + 0.2222 + 0.0740 + 0 + 0.0041 = 0.6337 in base 10). Shifting point options also work (shifting binary 0.110011 six spots right yields 51; dividing by 2^6 or 64 gives decimal 0.796875).",
          "• 2. Fraction Base Division Method (Repeated Multiplication): Multiply the fractional part repeatedly by the target base B. Record the integer to the left of the radix point, drop it, and multiply the clean remainder again by B. Repeat until product is zero or desired precision is hit.",
          "  - E.g. Converting decimal 0.828125 to binary (base 2):",
          "    0.828125 * 2 = 1.65625 (Integer 1, remainder 0.65625)",
          "    0.65625 * 2 = 1.3125 (Integer 1, remainder 0.3125)",
          "    0.3125 * 2 = 0.625 (Integer 0, remainder 0.625)",
          "    0.625 * 2 = 1.25 (Integer 1, remainder 0.25)",
          "    0.25 * 2 = 0.5 (Integer 0, remainder 0.5)",
          "    0.5 * 2 = 1.0 (Integer 1, remainder 0). Reordering integers yields binary 0.110101.",
          "• Power of Two Fraction Conversions: Grouping is done from Left to Right (e.g. 0.10111_2 to base 8 groups as 101_110 -> 0.56_8; 0.1110101_2 to base 16 groups as 1110_1010 -> 0.EA_16)."
        ],
        keyTerms: [
          { term: "Radix Point", definition: "The physical period character partitioning the integer portion from the fractional portion of a positional notation value." },
          { term: "Repeated Multiplication", definition: "The standard algorithm used to convert decimal fractional values to any target base by continuously multiplying the fractional remainder by the target base index." }
        ]
      }
    ]
  },
  {
    id: "logic",
    title: "7. Logic & Boolean Algebra",
    shortTitle: "Logic",
    subtitle: "Boolean variables, logic circuit structures, the seven logical gates, and universal logic operators.",
    sections: [
      {
        title: "George Boole & Logic Circuit Foundations",
        content: [
          "Boolean Algebra, developed by mathematician George Boole, uses logic values (true / 1, false / 0) to formalize logical statements and reasoning.",
          "It represents the exact mathematical language of digital logic circuit design. Gate circuits are physically structured on motherboard chips to evaluate electrical voltage inputs and produce output results.",
          "Using Boolean connectors, complex physical switches are simplified into equivalent Boolean algebraic equations which can be mapped directly to hardware gates."
        ],
        diagramType: "boolean"
      },
      {
        title: "The Seven Logical Operations",
        content: [
          "• AND (C = A • B): Output is 1 if and only if ALL inputs are 1. Represented by flat D-shaped gates.",
          "• OR (C = A + B): Output is 1 if any input is 1. Represented by pointed-curved gates.",
          "• NOT (C = A̅): An inverter. Reverses the logic state (0 becomes 1, 1 becomes 0). Represented by a triangle with a dot.",
          "• NAND (C = A̅•̅B̅): Inverts the AND operation. Output is 0 only if all inputs are 1. This is a Universal Gate.",
          "• NOR (C = A̅+̅B̅): Inverts the OR operation. Output is 1 only if all inputs are 0. This is a Universal Gate.",
          "• XOR (C = A ⊕ B): Exclusive-OR. Output is 1 only if the inputs are different (e.g. input 0, 1 -> 1; input 1, 1 -> 0).",
          "• XNOR (C = A ☉ B): Exclusive-NOR. Output is 1 only if the inputs are equal. Acts as a parity indicator or equality locator."
        ],
        keyTerms: [
          { term: "Universal Gate", definition: "A gate (specifically NAND or NOR) that can be configured to recreate any of the other logical operations (AND, OR, NOT) on its own." },
          { term: "Truth Table", definition: "A structured matrix showing all possible combinations of inputs and the resulting output for a logical circuit or gate." }
        ]
      }
    ]
  },
  {
    id: "networks",
    title: "8. Communication Systems, Networks & Problem Solving",
    shortTitle: "Networks",
    subtitle: "Communication divisions, modems, UTP cable specifications, network topologies, web endings, and the Software Development Method.",
    sections: [
      {
        title: "Basic Components of Communication Systems",
        content: [
          "A communication system transfers signals using four structural divisions: technology rules, hardware devices, physical/signal channels, and protocol software.",
          "• Communications Model: Consists of Source (generates the message), Transmitter (processes & converts the signal), Transmission System (physical medium carrying the signal), Receiver (re-converts the signal), and Destination (the target mainframe or device).",
          "• Communication Channels: Signals can travel in three directional modes: Simplex (one-way only, e.g. television broadcasts), Half-Duplex (two-way but only one direction at a time, e.g. walkie-talkies), and Full-Duplex (simultaneous two-way communication, e.g. cellular telephones)."
        ],
        diagramType: "topologies"
      },
      {
        title: "Busses, Modems & High-Speed Media",
        content: [
          "The curriculum details several network communication media and transport standards:",
          "• Modems (dial-up lines): Converts digital signals to analog to pass over phone lines, operating at ~56 kbps transfer rates.",
          "• ISDN & DSL modems: High-speed, digital lines. DSL is categorized as ADSL (asymmetric DSL), maintaining separate bands (e.g. receiver operated at 8.4 Mbps, transmit at 640 kbps).",
          "• T-Carrier lines (T1, T3) & ATM (Asynchronous Transfer Mode): High-capacity enterprise networks. T1 carries 1.544 Mbps, T3 handles 44 Mbps, while ATM supports 155 Mbps to 622 Mbps.",
          "• Physical Media (Tangible wire cables):",
          "  - Twisted-pair cable: Copper wires twisted together to minimize cross-talk interference. Standard RJ45 Unshielded Twisted Pair (UTP) network cables consist of 8 color-coded copper wires nested in 4 pairs.",
          "  - Coaxial cable (Coax): Single central copper wire shielded by three protective insulating layers. Popular in cable TV (CATV).",
          "  - Fiber-optics: Microscopic strands of glass/plastic cladding enclosing a central core to transmit light waves. Offers extreme bandwidth capacity and absolute resistance to physical noise.",
          "• Wireless Media (Sends signals through the air):",
          "  - Broadcast & Cellular Radio: High-frequency waves distributing data over distances (utilizing cellular frequency-reuse).",
          "  - Microwaves: High-speed, line-of-sight point-to-point radio signals. Commonly used in satellite arrays.",
          "  - Infrared (IR): Lightweight waves requiring absolute line-of-sight (like domestic remote controls)."
        ],
        keyTerms: [
          { term: "ADSL", definition: "Asymmetric Digital Subscriber Line, a high-speed internet standard providing faster download speeds than upload speeds." },
          { term: "UTP Cable", definition: "Unshielded Twisted Pair, standard Ethernet networking cable consisting of 8 color-coded wires twisted into 4 pairs." }
        ]
      },
      {
        title: "Network Topologies & Architectures",
        content: [
          "Networks are categorized by coverage scale: LAN (Local Area), MAN (Metropolitan), and WAN (Wide Area).",
          "Network topologies define layout paths:",
          "  - Bus Topology: Single central cable. Easy and cheap but highly vulnerable to single-point line cuts.",
          "  - Star Topology: All devices cable directly to a central Hub or Switch. Most common in modern Ethernet LANs, avoids local network failure if a single cable breaks.",
          "  - Ring Topology: Closed loop path. Frames circulate around the loop. Can be single or dual lines.",
          "  - Mesh Topology: Connects all devices directly to each other, creating redundant links for high fault tolerance (expensive and complex, mostly used in mission-critical networks like banks).",
          "Network architectures describe design logic:",
          "  - Client/Server Architecture: Clients request services and designated servers respond (e.g., HTML web servers, file database servers).",
          "  - Peer-to-Peer (P2P): All devices share equal access, distributing processing files without central server routing.",
          "  - Intranet: A private company network protected by a Firewall that utilizes standard Internet protocols.",
          "  - Extranet: An extension of an intranet allowing secure, controlled external access to verified suppliers, customers, and partners (often protected using VPN encryption layers)."
        ],
        keyTerms: [
          { term: "WAN", definition: "Wide Area Network, a network extending over large geographical environments like cities, countries, or continents." },
          { term: "Mesh Topology", definition: "A fully redundant network configuration where every single node is directly cabled to every other node, providing absolute fault tolerance." }
        ]
      },
      {
        title: "The Internet, Web Addresses & Protocols",
        content: [
          "The Internet is the massive 'network of networks' spanning the globe. Originally created by the Advanced Research Projects Agency (ARPANET) and U.S. DoD to resist wartime and terrorist attacks.",
          "• HTML (Hypertext Markup Language): Evaluates text formatting tags (such as <B>bold</B> or <I>italics</I>) inside standard browsers (Netscape Navigator, Internet Explorer).",
          "• IP Addressing: A unique identification four-part period-separated number ranging from 0 to 255 (e.g. 106.29.242.17) issued by IANA.",
          "• DNS (Domain Name System): text-based addresses (e.g. ui.edu.ng) mapped hierarchically from right-to-left.",
          "• Domain Endings: Indicates context (com: commercial, edu: education, gov: government, net: gateway network, org: organization) and country (ca: Canada, uk: United Kingdom, us: USA, au: Australia).",
          "• URL (Uniform Resource Locator): Specifications showing protocol (HTTP), domain, pathname, and filename.",
          "• Transmission Protocols: HTTP (Hypertext Transfer Protocol for web pages), FTP/TFTP (file copying), and SMTP/mail exchangers (handling custom local-part email addresses)."
        ]
      },
      {
        title: "Solving Problems Computationally (The Software Development Method)",
        content: [
          "The Software Development Method (SDM) prescribes six rigorous phases to design effective computer solutions:",
          "1. Specification of Needs: Defining exactly what the problem is, what data is needed to solve it, and what constraints exist.",
          "2. Problem Analysis: Identifying program inputs, expected outputs, applicable mathematical formulas, and boundary parameters.",
          "3. Design & Algorithmic Representation: Arranging logical instructions step-by-step. Models are drafted via precise verbal pseudocodes or graphical flowcharts with standardized symbols (Terminal, Process, Input/Output, Disk, Printer, Selection, Off-page/Off-page Connectors).",
          "4. Implementation: Writing clean, secure computer programs mirroring layout designs.",
          "5. Testing & Verification: Verifying that the code satisfies the original requirement specifications and executing test scenarios to guarantee correctness.",
          "6. Documentation: Detailing requirements, equations, user guides, code descriptions, and code comments to facilitate maintenance."
        ],
        keyTerms: [
          { term: "System Analysis", definition: "The initial planning phase of software design, focusing on identifying inputs, outputs, formulas, and user constraints." },
          { term: "Bug", definition: "A data error or logical flaw in program code that prevents correct execution." }
        ]
      },
      {
        title: "Flowcharting Examples & Exercises",
        content: [
          "To cement the Software Development Method (SDM), students work through standard structured examples:",
          "• Homework Example 1 (Grades Selector): Inputting 4 marks. Add them together and divide by 4. If the GRADE average is below 50, output 'FAIL', otherwise output 'PASS'.",
          "• Homework Example 2 (Fahrenheit to Celsius Converter): Inputting temperature in degrees Fahrenheit. Formula: Celsius = 5/9 * (Fahrenheit - 32). Print resulting value in Celsius.",
          "• Homework Example 3 (Rectangle Area Calculator): Inputting sides width (W) and length (L). Area formula: A = L * W. Output the resulting calculated area (A).",
          "• Homework Example 4 (Quadratic Equation Roots): Solving ax^2 + bx + c = 0. Calculate discriminant: d = sqrt(b^2 - 4ac). Roots formula: x1 = (-b + d)/2a and x2 = (-b - d)/2a. Print roots.",
          "• Additional Practice Problems:",
          "  - Exercise 1 (Circle Geometry): Compute Area and Circumference from an inputted circle radius. PI = 3.14159.",
          "  - Exercise 2 (Wage calculator): Hourly wage. Employee earns N 500.00/hour for the first 40 hours, and N 800.00/hour for each hour over 40. Calculate daily rate.",
          "  - Exercise 3 (Repetitions looping): Design a program that can print the statement 'I love programming' exactly 5 times using a while-loop counter.",
          "  - Exercise 4 (Multi-inputs average): Read 5 numbers sequentially, calculate their sum, and output their arithmetic average."
        ]
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  ...MCQ_BATCH_1,
  ...MCQ_BATCH_2,
  ...MCQ_BATCH_3,
  ...MCQ_BATCH_4,
  ...MCQ_BATCH_5,
  {
    id: 9001,
    question: "What is octal number 11 in decimal representation?",
    options: ["7", "8", "9", "I don't know"],
    answerIndex: 2,
    explanation: "Octal 11 uses base 8 positional notation. Calculating: 1 * 8^1 + 1 * 8^0 = 8 + 1 = 9 in decimal (Base 10)."
  },
  {
    id: 9002,
    question: "What is the decimal representation of binary number 1110?",
    options: ["8", "14", "16", "I don't know"],
    answerIndex: 1,
    explanation: "Binary 1110 is calculated using base 2 positional notation: 1*2^3 + 1*2^2 + 1*2^1 + 0*2^0 = 8 + 4 + 2 + 0 = 14."
  },
  {
    id: 9003,
    question: "What is the decimal representation of the hexadecimal number FF?",
    options: ["10", "255", "256", "I don't know"],
    answerIndex: 1,
    explanation: "Hexadecimal FF calculates using base 16: F represents 15. Thus, 15 * 16^1 + 15 * 16^0 = 240 + 15 = 255."
  },
  {
    id: 9004,
    question: "Add 4 bit binary number 0100 with 0111. What is the answer?",
    options: ["1001", "1011", "1110", "I don't know"],
    answerIndex: 1,
    explanation: "0100 (which is 4 in decimal) + 0111 (7 in decimal) equals 1011 in binary (11 in decimal)."
  },
  {
    id: 9005,
    question: "Subtract 4 bit binary number 0100 from 1111. What is the answer?",
    options: ["1001", "1011", "1110", "I don't know"],
    answerIndex: 1,
    explanation: "1111 (15 in decimal) - 0100 (4 in decimal) equals 1011 in binary (11 in decimal)."
  },
  {
    id: 9006,
    question: "Convert binary number 11001111 to hexadecimal representation:",
    options: ["CF", "BF", "FC", "I don't know"],
    answerIndex: 0,
    explanation: "Grouping binary 11001111 into two 4-bit sections: Upper group 1100 = 12 (C in hex). Lower group 1111 = 15 (F in hex). Combining leaves CF in base 16."
  },
  {
    id: 9007,
    question: "Convert decimal number 375 to its octal representation:",
    options: ["567", "765", "556", "I don't know"],
    answerIndex: 0,
    explanation: "Divide 375 repeatedly by 8:\n375 / 8 = 46 (remainder 7)\n46 / 8 = 5 (remainder 6)\n5 / 8 = 0 (remainder 5).\nReading remainder bottom-to-top leaves octal 567."
  },
  {
    id: 9008,
    question: "Convert decimal number 37 to its binary representation:",
    options: ["101001", "100101", "111000", "I don't know"],
    answerIndex: 1,
    explanation: "Divide 37 repeatedly by 2:\n37 / 2 = 18 (remainder 1)\n18 / 2 = 9 (remainder 0)\n9 / 2 = 4 (remainder 1)\n4 / 2 = 2 (remainder 0)\n2 / 2 = 1 (remainder 0)\n1 / 2 = 0 (remainder 1).\nReading remainder lists binary 100101."
  },
  {
    id: 9009,
    question: "Convert binary fraction number 0.11 to its decimal value:",
    options: ["0.1", "0.5", "0.75", "I don't know"],
    answerIndex: 2,
    explanation: "Binary positions to the right of the radix point: 1 * 2^-1 + 1 * 2^-2 = 0.5 + 0.25 = 0.75."
  },
  {
    id: 9010,
    question: "Convert decimal fraction 0.33 to binary with max 8-bit precision:",
    options: ["0.01010100", "0.11001100", "0.11111111", "I don't know"],
    answerIndex: 0,
    explanation: "Multiply fraction repeatedly by 2:\n0.33 * 2 = 0.66 (carry 0)\n0.33 * 2 = 0.66 -> carry 0\n0.66 * 2 = 1.32 (carry 1 -> drop 1)\n0.32 * 2 = 0.64 (carry 0)\n0.64 * 2 = 1.28 (carry 1 -> drop 1)\n0.28 * 2 = 0.56 (carry 0)\n0.56 * 2 = 1.12 (carry 1 -> drop 1). Gathering compiles binary 0.01010100."
  },
  {
    id: 9011,
    question: "Consider binary number 0.01010100. Compute its decimal value.",
    options: ["0.33", "0.328125", "0.5", "I don't know"],
    answerIndex: 1,
    explanation: "2^-2 (0.25) + 2^-4 (0.0625) + 2^-6 (0.015625) = 0.328125 decimal value. This represents the fractional precision limit of decimal 0.33 on computers."
  },
  {
    id: 9012,
    question: "According to the slide outline, in what year was the Computer Science department established at the University of Ibadan?",
    options: ["1953", "1962", "1974", "1982"],
    answerIndex: 2,
    explanation: "As documented in Slide 13, the Computer Science department at the University of Ibadan was established in the year 1974."
  },
  {
    id: 9013,
    question: "What is defined in the curriculum as the 'systematic study of algorithmic processes that describe and transform information'?",
    options: ["Scientific Computing", "Computer Science", "Information Technology", "Computer Engineering"],
    answerIndex: 1,
    explanation: "Slide 8 lists this exact formula as the primary definition of Computer Science: 'The systematic study of algorithmic processes that describe and transform information: their theory, analysis, design, efficiency, implementation and application.'"
  },
  {
    id: 9014,
    question: "The CSC 101 slides partition the discipline into System vs. Application areas. Which of the following is in the Applications Area?",
    options: ["Algorithms and Data Structures", "Programming Languages and Compilers", "Databases, Artificial Intelligence, and Games", "Operating Systems and Computer Architecture"],
    answerIndex: 2,
    explanation: "According to Slide 14, Databases, Artificial Intelligence and Robotics, and Games are part of the 'Application Area', whereas the other systems are categorized in the 'Systems Area'."
  },
  {
    id: 9015,
    question: "What are the three pillars of Computational Problem Solving in the correct sequence as presented in the curriculum?",
    options: ["Hypothesis, Model, Code", "Specification, Verification, Documentation", "Abstraction, Automation, Implementation", "Systems, Application, Optimization"],
    answerIndex: 2,
    explanation: "Slide 9 and Slide 12 show that computational problem-solving is done through Abstraction (building clean models), Automation (programming algorithms), and Implementation (executing code instructions)."
  },
  {
    id: 9016,
    question: "Which of the following is NOT one of the 'Founding Traditions' of Computer Science mentioned in the curriculum slides?",
    options: ["The Mathematical Tradition", "The Engineering Tradition", "The Experimental Science Tradition", "The Artistic Representation Tradition"],
    answerIndex: 3,
    explanation: "Slide 26 and Slide 27 establish the three Founding Traditions of Computer Science as: Mathematics (gives theory), Engineering Tradition (design and creativity), and Experimental Science Tradition (systematic, testable model predictions)."
  },
  {
    id: 9017,
    question: "A computational tool is correct if it conforms completely to its pre-defined specification. What indicator measures a tool's Level of Fault-Tolerance?",
    options: ["Mean Time Between Failure (MTBF)", "Compression Ratio (CR)", "Scale of Integration (SI)", "Turing Completeness Index"],
    answerIndex: 0,
    explanation: "According to Slide 40, the level of fault-tolerance is measured by Mean Time Between Failure (MTBF), which measures the time between two failure incidents in the use of a tool."
  },
  {
    id: 9018,
    question: "Which pioneer of computing documented binary arithmetic and developed a hand-cranked physical calculating machine?",
    options: ["Blaise Pascal", "Gottfried Wilhelm von Leibniz", "William Oughtred", "Herman Hollerith"],
    answerIndex: 1,
    explanation: "Slide 56 and Slide 61 show that Gottfried Wilhelm von Leibniz documented the binary number system used in all modern computers and developed binary arithmetic and a hand-cranked calculator."
  },
  {
    id: 9019,
    question: "In 1997, IBM's chess playing computer defeated Garry Kasparov. What was the name of this system, demonstrating the 'Intelligence' performance goal of tools?",
    options: ["Colossus", "ENIAC", "Deep Blue", "Harvard Mark I"],
    answerIndex: 2,
    explanation: "Slide 42 reads: 'In 1997, IBM's chess playing computer 'Deep Blue' defeated the then world champion Garry Kasparov under tournament conditions.'"
  }
];
