import React, { useState } from "react";
import { CHAPTERS } from "../data";
import { Chapter } from "../types";
import { ArrowRight, ChevronRight, Layers, Cpu, Shield, HelpCircle, Network, HardDrive, Binary } from "lucide-react";

export default function HandbookTab() {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(CHAPTERS[0].id);

  const selectedChapter = CHAPTERS.find((ch) => ch.id === selectedChapterId) || CHAPTERS[0];

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Sidebar - Chapter Selector */}
      <aside className="w-full md:w-80 border-b md:border-b-0 md:border-r border-black flex flex-col bg-gray-50 overflow-y-auto">
        <div className="p-6 border-b border-black bg-white">
          <h3 className="text-xs font-black uppercase tracking-widest text-black">
            HANDBOOK SECTIONS
          </h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">
            CSC 101 Curriculum Topics
          </p>
        </div>
        <nav className="flex-1 py-4 divide-y divide-gray-100">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChapterId(ch.id)}
              className={`w-full text-left px-6 py-4 flex items-start gap-4 transition-all uppercase cursor-pointer ${
                selectedChapterId === ch.id
                  ? "bg-black text-white font-black"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <span className="text-[10px] font-black opacity-40">0{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold tracking-tight truncate">
                  {ch.shortTitle}
                </div>
                <div
                  className={`text-[9px] font-bold truncate mt-0.5 ${
                    selectedChapterId === ch.id ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {ch.title.split(". ")[1]}
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 mt-0.5" />
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Chapter Content Viewer */}
      <section className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col">
        {/* Topic Header */}
        <div className="border-b-4 border-black pb-6 mb-8">
          <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-1 tracking-wider">
            Active Study Module
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-black mt-3 tracking-tighter">
            {selectedChapter.title}
          </h2>
          <p className="text-sm font-medium text-gray-600 mt-2">
            {selectedChapter.subtitle}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 flex-1">
          {selectedChapter.sections.map((sect, sIdx) => (
            <div key={sIdx} className="border-b border-gray-100 pb-8 last:border-b-0 space-y-4">
              <h3 className="text-lg font-black uppercase text-black italic tracking-tight">
                {sect.title}
              </h3>
              
              <ul className="space-y-3">
                {sect.content.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
                    <p className="text-sm leading-relaxed text-gray-800 font-medium">
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
                <div className="mt-6 bg-gray-50 p-4 border border-black space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-black border-b border-gray-200 pb-1.5">
                    Core Jargon &amp; Key Terms
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sect.keyTerms.map((term, tIdx) => (
                      <div key={tIdx} className="space-y-1">
                        <span className="text-xs font-black uppercase text-black tracking-tight underline decorative-black">
                          {term.term}
                        </span>
                        <p className="text-xs text-gray-600 leading-tight font-medium">
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
    <div className="mt-6 bg-gray-50 border border-black p-6 space-y-4">
      <div className="flex justify-between items-center border-b border-gray-200 pb-3 flex-wrap gap-2">
        <span className="text-[11px] font-black uppercase tracking-widest text-black">
          Interactive Topology Visualifier
        </span>
        <div className="flex gap-2 flex-wrap">
          {(["bus", "star", "ring", "mesh"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1 text-[9px] uppercase font-bold tracking-tight rounded-none cursor-pointer border ${
                activeType === type
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Render interactive SVG graph based on selection */}
        <div className="md:col-span-6 bg-white p-4 border border-black flex justify-center items-center h-48 select-none">
          {activeType === "bus" && (
            <svg viewBox="0 0 300 120" className="w-full h-full max-h-40">
              <line x1="20" y1="60" x2="280" y2="60" stroke="#000" strokeWidth="4" />
              {/* Nodes */}
              {[40, 100, 160, 220, 260].map((x, i) => (
                <g key={i}>
                  <line x1={x} y1="60" x2={x} y2={i % 2 === 0 ? "30" : "90"} stroke="#000" strokeWidth="2" strokeDasharray="3" />
                  <circle cx={x} cy={i % 2 === 0 ? "25" : "95"} r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                  <text x={x} y={i % 2 === 0 ? "28" : "98"} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">N{i + 1}</text>
                </g>
              ))}
            </svg>
          )}

          {activeType === "star" && (
            <svg viewBox="0 0 200 180" className="w-full h-full max-h-40">
              {/* Central Hub */}
              <circle cx="100" cy="90" r="16" fill="#000" />
              <text x="100" y="93" fontSize="8" fontWeight="black" fill="#fff" textAnchor="middle">HUB</text>
              {/* Peripheral Nodes connected strictly to Hub */}
              {[
                { x: 30, y: 40 },
                { x: 170, y: 40 },
                { x: 30, y: 140 },
                { x: 170, y: 140 },
                { x: 100, y: 160 },
              ].map((pos, i) => (
                <g key={i}>
                  <line x1="100" y1="90" x2={pos.x} y2={pos.y} stroke="#000" strokeWidth="2" />
                  <circle cx={pos.x} cy={pos.y} r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                  <text x={pos.x} y={pos.y + 3} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">N{i + 1}</text>
                </g>
              ))}
            </svg>
          )}

          {activeType === "ring" && (
            <svg viewBox="0 0 200 180" className="w-full h-full max-h-40">
              {/* Outer Ring path */}
              <circle cx="100" cy="90" r="50" fill="none" stroke="#000" strokeWidth="2" />
              {/* Circular Nodes */}
              {[0, 72, 144, 216, 288].map((angle, idx) => {
                const r = 50;
                const x = 100 + r * Math.cos((angle * Math.PI) / 180);
                const y = 90 + r * Math.sin((angle * Math.PI) / 180);
                return (
                  <g key={idx}>
                    <circle cx={x} cy={y} r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                    <text x={x} y={y + 3} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">N{idx + 1}</text>
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
                        // idx2 > idx1 avoids using the < symbol, ensuring HTML parser safety
                        if (idx2 > idx1) {
                          return <line key={`${idx1}-${idx2}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="#000" strokeWidth="1" strokeDasharray="1 1" />;
                        }
                        return null;
                      })
                    )}
                    {nodes.map((n, idx) => (
                      <g key={idx}>
                        <circle cx={n.x} cy={n.y} r="10" fill="#fff" stroke="#000" strokeWidth="2" />
                        <text x={n.x} y={n.y + 3} fontSize="8" fontWeight="black" textAnchor="middle" fill="#000">N{idx + 1}</text>
                      </g>
                    ))}
                  </g>
                );
              })()}
            </svg>
          )}
        </div>

        {/* Explanation text */}
        <div className="md:col-span-6 space-y-2">
          <div className="text-[10px] font-black uppercase text-gray-500">Curriculum Details</div>
          {activeType === "bus" && (
            <>
              <h5 className="text-xs font-bold uppercase text-black">BUS TOPOLOGY CHARACTERISTICS</h5>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                • <strong>Efficiency:</strong> Easy and inexpensive to install since all nodes connect to a single central coaxial cable trunk line.
                <br />
                • <strong>Vulnerability:</strong> High risk of failure. If the central cable trunk breaks anywhere, the entire LAN system immediately collapses.
              </p>
            </>
          )}
          {activeType === "star" && (
            <>
              <h5 className="text-xs font-bold uppercase text-black">STAR TOPOLOGY CHARACTERISTICS</h5>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                • <strong>Layout:</strong> Resembles layout spoke cycles of a bicycle wheel where all nodes cable to a central host (HUB/Switch).
                <br />
                • <strong>Fault-Tolerance:</strong> If one node cable snaps, only that node fails. However, if the central HUB fails, the whole network collapses.
              </p>
            </>
          )}
          {activeType === "ring" && (
            <>
              <h5 className="text-xs font-bold uppercase text-black">RING TOPOLOGY CHARACTERISTICS</h5>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                • <strong>Message Travel:</strong> A frame travels around a closed loop path stopping at each node. Targets accept data, others pass it on.
                <br />
                • <strong>Dual Ring protection:</strong> High-reliability setups run active counter-circulating secondary backup lines to avoid single link failures.
              </p>
            </>
          )}
          {activeType === "mesh" && (
            <>
              <h5 className="text-xs font-bold uppercase text-black">MESH TOPOLOGY CHARACTERISTICS</h5>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                • <strong>Ultra Fault-Tolerance:</strong> Connects every node to every other node individually for optimal reliability and failover redundancy.
                <br />
                • <strong>Enterprise Cost:</strong> Highly expensive and labor-intensive to implement. Restricted mostly to WAN backbones and critical financial banking servers.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// CPU & Bus Diagram widget
function CpuBusDiagram() {
  return (
    <div className="mt-6 bg-gray-50 border border-black p-6 space-y-4">
      <div className="text-[11px] font-black uppercase tracking-widest text-black border-b border-gray-200 pb-2">
        Von Neumann CPU &amp; Bus Infrastructure Diagram
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 bg-white p-4 border border-black select-none">
          <svg viewBox="0 0 320 200" className="w-full h-full max-h-48">
            {/* Input Device */}
            <rect x="10" y="70" width="60" height="40" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x="40" y="95" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">INPUTS</text>

            {/* Central Processing Unit (CPU) */}
            <rect x="100" y="15" width="120" height="150" fill="#f9f9f9" stroke="#000" strokeWidth="3" />
            <text x="160" y="32" fontSize="9" fontWeight="black" textAnchor="middle" fill="#000">CPU</text>

            {/* Inside CPU: CU and ALU */}
            <rect x="110" y="45" width="100" height="40" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x="160" y="65" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">Control Unit</text>

            <rect x="110" y="100" width="100" height="40" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x="160" y="125" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">ALU</text>

            {/* Output Device */}
            <rect x="250" y="70" width="60" height="40" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x="280" y="95" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">OUTPUTS</text>

            {/* RAM Memory below */}
            <rect x="100" y="175" width="120" height="20" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x="160" y="188" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">RAM (Primary Memory)</text>

            {/* Connective Paths */}
            <line x1="70" y1="90" x2="100" y2="90" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="220" y1="90" x2="250" y2="90" stroke="#000" strokeWidth="2" />
            <line x1="160" y1="165" x2="160" y2="175" stroke="#000" strokeWidth="2" />

            {/* Arrow Marker Definitions */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="md:col-span-5 space-y-2">
          <div className="text-[10px] font-black uppercase text-gray-500">System Bus Routing</div>
          <h5 className="text-xs font-bold uppercase text-black">BUS ROLES DURING MACHINE CYCLE</h5>
          <p className="text-xs text-gray-700 leading-relaxed font-medium">
            1. <strong>Fetch:</strong> Address lines index the target command, control lines trigger a READ action, and data lines feed the Instruction parameter back internally to the CPU's Control Unit registry.
            <br />
            2. <strong>Calculate:</strong> The CU schedules the ALU to complete the calculation.
            <br />
            3. <strong>Store:</strong> Finished values are routed back to the RAM grid over data lines.
          </p>
        </div>
      </div>
    </div>
  );
}

// Two's complement diagram
function TwoComplementDiagram() {
  return (
    <div className="mt-6 bg-gray-50 border border-black p-6 space-y-4">
      <div className="text-[11px] font-black uppercase tracking-widest text-black border-b border-gray-200 pb-2">
        Representation Circle: Binary Two's Complement (8-bit numbers)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-12 font-medium text-xs leading-relaxed space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-3 border border-black space-y-1">
              <span className="font-black text-black">Positive Domain</span>
              <p className="text-[11px] text-gray-600 leading-tight">
                Bit patterns starting with <strong>0</strong> represent standard positive values from 00000000 (0) extending up to 01111111 (127).
              </p>
            </div>
            <div className="bg-white p-3 border border-black space-y-1">
              <span className="font-black text-black">Negative Domain</span>
              <p className="text-[11px] text-gray-600 leading-tight">
                Patterns starting with <strong>1</strong> represent negative scores from 11111111 (-1) descending down to 10000000 (-128).
              </p>
            </div>
            <div className="bg-white p-3 border border-black space-y-1">
              <span className="font-black text-black">Zero-Handling Success</span>
              <p className="text-[11px] text-gray-600 leading-tight">
                Two's complement provides a single clean representation of zero (00000000), resolving the double zero problem of signed-magnitude.
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
    <div className="mt-6 bg-gray-50 border border-black p-6 space-y-4">
      <div className="text-[11px] font-black uppercase tracking-widest text-black border-b border-gray-200 pb-2">
        Boolean Operators &amp; Equivalent Silicon Gates
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {gates.map((g, idx) => (
          <div key={idx} className="bg-white p-4 border border-black space-y-2">
            <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
              <span className="text-xs font-black uppercase text-black">{g.name} Gate</span>
              <span className="text-[10px] font-mono text-gray-500 font-bold">{g.symbol}</span>
            </div>
            <p className="text-xs text-gray-600 leading-snug font-medium">
              <strong>Logic:</strong> {g.output}
            </p>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">
              Gate Style: {g.visual}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
