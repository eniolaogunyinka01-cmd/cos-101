import React, { useState, useEffect } from "react";
import { CHAPTERS } from "../data";
import { Chapter } from "../types";
import { ArrowRight, ChevronRight, Layers, Cpu, Shield, HelpCircle, Network, HardDrive, Binary, CheckSquare, Square, CheckCircle2, BookOpen } from "lucide-react";

interface HandbookTabProps {
  readChapters?: string[];
  onToggleRead?: (chapterId: string) => void;
}

export default function HandbookTab({
  readChapters = [],
  onToggleRead = () => {}
}: HandbookTabProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("csc101_selectedChapterId");
      if (saved && CHAPTERS.some((ch) => ch.id === saved)) {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return CHAPTERS[0].id;
  });

  useEffect(() => {
    try {
      localStorage.setItem("csc101_selectedChapterId", selectedChapterId);
    } catch (e) {
      console.error(e);
    }
  }, [selectedChapterId]);

  const selectedChapter = CHAPTERS.find((ch) => ch.id === selectedChapterId) || CHAPTERS[0];

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50/50">
      {/* Sidebar - Chapter Selector */}
      <aside className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col bg-slate-50 shrink-0 md:overflow-y-auto">
        <div className="p-5 border-b border-slate-200/80 bg-white hidden md:block">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Handbook Syllabus Modules
          </h3>
          <p className="text-xs text-indigo-600 font-semibold mt-1 font-display">
            CSC 101 Lecture Chapters
          </p>
        </div>
        <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible p-3 md:p-3 gap-2.5 md:space-y-1.5 scrollbar-none">
          {CHAPTERS.map((ch, idx) => {
            const isChRead = readChapters.includes(ch.id);
            const isSelected = selectedChapterId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`text-left px-4 py-2.5 md:px-4 md:py-3.5 flex items-center md:items-start gap-3 transition-all cursor-pointer shrink-0 rounded-xl border md:border ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10 font-medium scale-[1.01]"
                    : "text-slate-700 bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] font-mono font-bold hidden md:inline-block ${isSelected ? "text-indigo-200" : "text-slate-400"}`}>0{idx + 1}</span>
                  {isChRead && (
                    <CheckCircle2 className={`w-4 h-4 shrink-0 md:mt-0.5 ${isSelected ? "text-emerald-300" : "text-emerald-500"}`} />
                  )}
                </div>
                <div className="min-w-0 md:flex-1">
                  <div className="text-[11px] md:text-xs font-bold tracking-tight whitespace-nowrap md:whitespace-normal flex items-center gap-1.5">
                    <span>{ch.shortTitle}</span>
                    {isChRead && (
                      <span className="text-[9px] bg-emerald-500 text-white rounded-full px-1.5 py-0.2 md:hidden shrink-0 font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-[10px] font-medium truncate mt-0.5 hidden md:block leading-tight ${
                      isSelected ? "text-indigo-100" : "text-slate-400"
                    }`}
                  >
                    {ch.title.split(". ")[1]}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 hidden md:block opacity-60 ${isSelected ? "text-white" : "text-slate-400"}`} />
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Chapter Content Viewer */}
      <section className="flex-1 p-5 md:p-8 overflow-y-auto flex flex-col bg-white">
        {/* Topic Header Card */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex-1 space-y-2">
            <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-full tracking-wide inline-block">
              Active Lecture Slide Companion
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              {selectedChapter.title}
            </h2>
            <p className="text-sm font-medium text-slate-500">
              {selectedChapter.subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onToggleRead(selectedChapter.id)}
              className={`w-full md:w-auto px-5 py-3 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 border transition-all cursor-pointer select-none shadow-sm hover:-translate-y-0.5 active:translate-y-0 ${
                readChapters.includes(selectedChapter.id)
                  ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {readChapters.includes(selectedChapter.id) ? (
                <>
                  <CheckSquare className="w-4.5 h-4.5 text-white shrink-0" />
                  <span>Module Completed</span>
                </>
              ) : (
                <>
                  <Square className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                  <span>Mark as Completed</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12 flex-1">
          {selectedChapter.sections.map((sect, sIdx) => (
            <div key={sIdx} className="border-b border-slate-100 pb-10 last:border-b-0 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight font-display">
                  {sect.title}
                </h3>
              </div>
              
              <ul className="grid grid-cols-1 gap-3.5 pl-1">
                {sect.content.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100/85 hover:bg-slate-50 hover:shadow-sm transition-all duration-300">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mt-1.5 shrink-0"></span>
                    <p className="text-sm leading-relaxed text-slate-600 font-normal">
                      {bullet}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Rendering Interactive Diagrams or visual widgets directly per slides details */}
              {sect.diagramType === "topologies" && <NetworkTopologyDiagram />}
              {sect.diagramType === "bus" && <CpuBusDiagram />}
              {sect.diagramType === "complement" && <TwoComplementDiagram />}
              {sect.diagramType === "boolean" && <BooleanAlgebraGates />}

              {/* Key Terms */}
              {sect.keyTerms && sect.keyTerms.length > 0 && (
                <div className="mt-8 bg-indigo-50/30 rounded-2xl p-5 border border-indigo-100/60 space-y-4 shadow-inner">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    Core Jargon &amp; Lecture Key Terms
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sect.keyTerms.map((term, tIdx) => (
                      <div key={tIdx} className="bg-white p-3.5 rounded-xl border border-indigo-100/40 shadow-sm space-y-1.5">
                        <span className="text-xs font-bold text-slate-900 tracking-tight">
                          {term.term}
                        </span>
                        <p className="text-xs text-slate-500 leading-normal font-normal">
                          {term.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Network Topology Diagram Renderer (Bus, Star, Ring, Mesh)
function NetworkTopologyDiagram() {
  const [activeType, setActiveType] = useState<"bus" | "star" | "ring" | "mesh">("star");

  return (
    <div className="mt-8 bg-slate-50/70 rounded-2xl border border-slate-200/80 p-5 md:p-6 space-y-5 shadow-sm">
      <div className="flex justify-between items-center border-b border-slate-200 pb-3.5 flex-wrap gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Interactive Topology Visualizer
        </span>
        <div className="flex gap-2 flex-wrap">
          {(["bus", "star", "ring", "mesh"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer border ${
                activeType === type
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-800 hover:-translate-y-0.5"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Render interactive SVG graph based on selection */}
        <div className="md:col-span-6 bg-white p-4 rounded-xl border border-slate-100 flex justify-center items-center h-52 select-none shadow-inner">
          {activeType === "bus" && (
            <svg viewBox="0 0 300 120" className="w-full h-full max-h-40">
              <line x1="20" y1="60" x2="280" y2="60" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
              {/* Nodes */}
              {[40, 100, 160, 220, 260].map((x, i) => (
                <g key={i} className="group">
                  <line x1={x} y1="60" x2={x} y2={i % 2 === 0 ? "35" : "85"} stroke="#94a3b8" strokeWidth="2" strokeDasharray="3" />
                  <circle cx={x} cy={i % 2 === 0 ? "25" : "95"} r="12" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" className="hover:scale-110 transition-transform cursor-pointer" />
                  <text x={x} y={i % 2 === 0 ? "28" : "98"} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#1e1b4b">N{i + 1}</text>
                </g>
              ))}
            </svg>
          )}

          {activeType === "star" && (
            <svg viewBox="0 0 200 180" className="w-full h-full max-h-40">
              {/* Central Hub */}
              <circle cx="100" cy="90" r="18" fill="#4f46e5" className="animate-pulse-slow" />
              <text x="100" y="93" fontSize="8" fontWeight="black" fill="#ffffff" textAnchor="middle">HUB</text>
              {/* Peripheral Nodes connected strictly to Hub */}
              {[
                { x: 35, y: 45 },
                { x: 165, y: 45 },
                { x: 35, y: 135 },
                { x: 165, y: 135 },
                { x: 100, y: 155 },
              ].map((pos, i) => (
                <g key={i}>
                  <line x1="100" y1="90" x2={pos.x} y2={pos.y} stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                  <circle cx={pos.x} cy={pos.y} r="12" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                  <text x={pos.x} y={pos.y + 3} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#1e1b4b">N{i + 1}</text>
                </g>
              ))}
            </svg>
          )}

          {activeType === "ring" && (
            <svg viewBox="0 0 200 180" className="w-full h-full max-h-40">
              {/* Outer Ring path */}
              <circle cx="100" cy="90" r="50" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle cx="100" cy="90" r="50" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="5" />
              {/* Circular Nodes */}
              {[0, 72, 144, 216, 288].map((angle, idx) => {
                const r = 50;
                const x = 100 + r * Math.cos((angle * Math.PI) / 180);
                const y = 90 + r * Math.sin((angle * Math.PI) / 180);
                return (
                  <g key={idx}>
                    <circle cx={x} cy={y} r="12" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                    <text x={x} y={y + 3} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#1e1b4b">N{idx + 1}</text>
                  </g>
                );
              })}
            </svg>
          )}

          {activeType === "mesh" && (
            <svg viewBox="0 0 200 180" className="w-full h-full max-h-40">
              {/* Nodes */}
              {(() => {
                const nodes = [
                  { x: 50, y: 40 },
                  { x: 150, y: 40 },
                  { x: 30, y: 120 },
                  { x: 170, y: 120 },
                  { x: 100, y: 150 },
                ];
                return (
                  <g>
                    {/* Render fully redundant cross connect paths */}
                    {nodes.map((n1, idx1) =>
                      nodes.map((n2, idx2) => {
                        if (idx2 > idx1) {
                          return <line key={`${idx1}-${idx2}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="#818cf8" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />;
                        }
                        return null;
                      })
                    )}
                    {nodes.map((n, idx) => (
                      <g key={idx}>
                        <circle cx={n.x} cy={n.y} r="12" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                        <text x={n.x} y={n.y + 3} fontSize="8" fontWeight="black" textAnchor="middle" fill="#1e1b4b">N{idx + 1}</text>
                      </g>
                    ))}
                  </g>
                );
              })()}
            </svg>
          )}
        </div>

        {/* Explanation text */}
        <div className="md:col-span-6 space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Curriculum Details</div>
          {activeType === "bus" && (
            <div className="space-y-2">
              <h5 className="text-sm font-bold text-slate-900 uppercase tracking-tight">BUS TOPOLOGY CHARACTERISTICS</h5>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                • <strong className="text-slate-800">Efficiency:</strong> Very simple and inexpensive to deploy initially because all computer nodes bridge into a single shared coaxial trunk cable.
                <br />
                • <strong className="text-slate-800">Vulnerability:</strong> Catastrophic single point of failure. If the central bus trunk suffers a break or disconnect anywhere along the spine, the entire network drops out.
              </p>
            </div>
          )}
          {activeType === "star" && (
            <div className="space-y-2">
              <h5 className="text-sm font-bold text-slate-900 uppercase tracking-tight">STAR TOPOLOGY CHARACTERISTICS</h5>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                • <strong className="text-slate-800">Layout:</strong> Nodes radiate like wheel spokes, wiring individually into a centralized device such as a Hub or Switch.
                <br />
                • <strong className="text-slate-800">Fault-Tolerance:</strong> Exceptionally robust. If an individual node cable snaps, only that single node is disabled. The rest of the workspace network continues operating smoothly.
              </p>
            </div>
          )}
          {activeType === "ring" && (
            <div className="space-y-2">
              <h5 className="text-sm font-bold text-slate-900 uppercase tracking-tight">RING TOPOLOGY CHARACTERISTICS</h5>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                • <strong className="text-slate-800">Message Travel:</strong> Data frames travel sequentially around a continuous closed circle stop-by-stop. Each node acts as a signal repeater.
                <br />
                • <strong className="text-slate-800">Dual Ring protection:</strong> High-performance configurations use secondary counter-circulating backup rings to bypass breaks without packet loss.
              </p>
            </div>
          )}
          {activeType === "mesh" && (
            <div className="space-y-2">
              <h5 className="text-sm font-bold text-slate-900 uppercase tracking-tight">MESH TOPOLOGY CHARACTERISTICS</h5>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                • <strong className="text-slate-800">Ultra Redundancy:</strong> Connects every workstation node to every other node directly. Routes packets instantly through the most optimal path.
                <br />
                • <strong className="text-slate-800">Enterprise Cost:</strong> Highly complex, labor-intensive, and cable-redundant. Mostly limited to WAN infrastructure and highly critical database setups.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// CPU & Bus Diagram widget
function CpuBusDiagram() {
  return (
    <div className="mt-8 bg-slate-50/70 rounded-2xl border border-slate-200/80 p-5 md:p-6 space-y-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-3">
        Von Neumann CPU &amp; Bus Architecture Diagram
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 bg-white p-4 rounded-xl border border-slate-100 flex justify-center items-center h-52 select-none shadow-inner">
          <svg viewBox="0 0 320 200" className="w-full h-full max-h-48">
            {/* Input Device */}
            <rect x="10" y="70" width="60" height="40" rx="6" fill="#f8fafc" stroke="#4f46e5" strokeWidth="2" />
            <text x="40" y="94" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#1e1b4b">INPUTS</text>

            {/* Central Processing Unit (CPU) */}
            <rect x="100" y="15" width="120" height="150" rx="10" fill="#f1f5f9" stroke="#312e81" strokeWidth="2.5" />
            <text x="160" y="32" fontSize="9" fontWeight="black" textAnchor="middle" fill="#1e1b4b">CPU CHIP</text>

            {/* Inside CPU: CU and ALU */}
            <rect x="110" y="45" width="100" height="40" rx="6" fill="#ffffff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="160" y="68" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#1e1b4b">Control Unit</text>

            <rect x="110" y="100" width="100" height="40" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
            <text x="160" y="123" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#1e1b4b">ALU</text>

            {/* Output Device */}
            <rect x="250" y="70" width="60" height="40" rx="6" fill="#f8fafc" stroke="#4f46e5" strokeWidth="2" />
            <text x="280" y="94" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#1e1b4b">OUTPUTS</text>

            {/* RAM Memory below */}
            <rect x="100" y="175" width="120" height="20" rx="4" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
            <text x="160" y="187" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#475569">RAM (Primary Memory)</text>

            {/* Connective Paths */}
            <line x1="70" y1="90" x2="100" y2="90" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="220" y1="90" x2="250" y2="90" stroke="#4f46e5" strokeWidth="2" />
            <line x1="160" y1="165" x2="160" y2="175" stroke="#334155" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Arrow Marker Definitions */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4f46e5" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="md:col-span-5 space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">System Bus Routing</div>
          <h5 className="text-xs font-bold text-slate-900 uppercase">BUS ROLES DURING MACHINE CYCLE</h5>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            1. <strong className="text-slate-800">Fetch:</strong> Address lines index target commands in RAM. Control lines fire a READ pulse, and data lines route instructions back into the Control Unit registry.
            <br />
            2. <strong className="text-slate-800">Calculate:</strong> The CU decodes parameters and tasks the Arithmetic Logic Unit (ALU) to carry out the core logic gate calculation.
            <br />
            3. <strong className="text-slate-800">Store:</strong> Outputs are transmitted back over the data bus lines to register offsets in physical memory.
          </p>
        </div>
      </div>
    </div>
  );
}

// Two's complement diagram
function TwoComplementDiagram() {
  return (
    <div className="mt-8 bg-slate-50/70 rounded-2xl border border-slate-200/80 p-5 md:p-6 space-y-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-3">
        Representation Range: Binary Two's Complement (8-bit numbers)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-12 font-medium text-xs leading-relaxed space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm space-y-1.5">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Positive Domain
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                Bit patterns starting with <strong className="text-slate-800">0</strong> represent positive integers from <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">00000000</code> (0) up to <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">01111111</code> (127).
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm space-y-1.5">
              <span className="font-bold text-rose-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                Negative Domain
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                Patterns starting with <strong className="text-slate-800">1</strong> denote negative integers from <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">11111111</code> (-1) down to <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">10000000</code> (-128).
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm space-y-1.5">
              <span className="font-bold text-indigo-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Single-Zero Success
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                Resolves the dual-zero error of signed-magnitude. Provides one clear representation of zero (<code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">00000000</code>), streamlining CPU arithmetic circuits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Boolean Algebra Truth and Gate visuals
function BooleanAlgebraGates() {
  const gates = [
    { name: "AND", symbol: "A • B", output: "1 only if all inputs are 1", visual: "D-shape" },
    { name: "OR", symbol: "A + B", output: "1 if any input is 1", visual: "Pointed curve" },
    { name: "NOT", symbol: "A̅", output: "Inverts input state", visual: "Triangle + Circle" },
    { name: "NAND", symbol: "A̅•̅B̅", output: "0 only if both inputs are 1", visual: "D-shape + Circle" },
    { name: "NOR", symbol: "A̅+̅B̅", output: "1 only if both inputs are 0", visual: "Curve + Circle" },
    { name: "XOR", symbol: "A ⊕ B", output: "1 if inputs are different", visual: "Double Line Curve" },
  ];

  return (
    <div className="mt-8 bg-slate-50/70 rounded-2xl border border-slate-200/80 p-5 md:p-6 space-y-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-3">
        Boolean Operators &amp; Equivalent Silicon Gates
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {gates.map((g, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{g.name} Gate</span>
              <span className="text-[10px] font-mono font-bold bg-slate-50 text-indigo-600 px-1.5 py-0.5 rounded border border-slate-100">{g.symbol}</span>
            </div>
            <p className="text-xs text-slate-500 leading-snug font-normal">
              <strong className="text-slate-700">Logic:</strong> {g.output}
            </p>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none pt-1">
              Gate Shape: {g.visual}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
