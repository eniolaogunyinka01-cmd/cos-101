import React, { useState } from "react";
import { 
  Binary, 
  HelpCircle, 
  Cpu, 
  Settings, 
  RefreshCw, 
  Play, 
  ArrowRight, 
  Sliders, 
  Layers, 
  ChevronsRight 
} from "lucide-react";

export default function ToolsTab() {
  const [activeSubTool, setActiveSubTool] = useState<"converter" | "logic" | "cpu">("converter");

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Sub-tool selection rail */}
      <aside className="w-full md:w-60 border-b md:border-b-0 md:border-r border-black flex flex-col bg-gray-50 shrink-0">
        <div className="p-6 border-b border-black bg-white">
          <h3 className="text-xs font-black uppercase tracking-widest text-black">
            SANDBOX UTILITIES
          </h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">
            Tactile Learning Widgets
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveSubTool("converter")}
            className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all uppercase cursor-pointer ${
              activeSubTool === "converter"
                ? "bg-black text-white font-black"
                : "text-black hover:bg-gray-100"
            }`}
          >
            <Binary className="w-4 h-4 shrink-0" />
            <span className="text-[11px] font-bold tracking-tight">Radix &amp; Base Conv</span>
          </button>

          <button
            onClick={() => setActiveSubTool("logic")}
            className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all uppercase cursor-pointer ${
              activeSubTool === "logic"
                ? "bg-black text-white font-black"
                : "text-black hover:bg-gray-100"
            }`}
          >
            <Sliders className="w-4 h-4 shrink-0" />
            <span className="text-[11px] font-bold tracking-tight">Logic Gate SIM</span>
          </button>

          <button
            onClick={() => setActiveSubTool("cpu")}
            className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all uppercase cursor-pointer ${
              activeSubTool === "cpu"
                ? "bg-black text-white font-black"
                : "text-black hover:bg-gray-100"
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0" />
            <span className="text-[11px] font-bold tracking-tight">CPU Cycle Simulator</span>
          </button>
        </nav>
      </aside>

      {/* Main Sandbox Workspace */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeSubTool === "converter" && <RadixConverterSandbox />}
        {activeSubTool === "logic" && <LogicGateSandbox />}
        {activeSubTool === "cpu" && <CpuSimulatorSandbox />}
      </main>
    </div>
  );
}

// ==========================================
// Sub-Tool 1: Radix / Base Converter Sandbox
// ==========================================
function RadixConverterSandbox() {
  const [decInput, setDecInput] = useState<string>("37");
  const [targetBase, setTargetBase] = useState<2 | 8 | 16>(2);
  
  // Fractional input states
  const [fracInput, setFracInput] = useState<string>("0.625");
  const [fracResultBits, setFracResultBits] = useState<number>(8);

  const calculateIntegerConversion = (decNum: number, base: 2 | 8 | 16) => {
    if (isNaN(decNum) || decNum < 0) return { error: "Please enter a valid, non-negative integer." };
    if (decNum === 0) return { steps: [{ quotient: 0, remainder: 0, char: "0" }], final: "0" };

    const steps = [];
    let temp = decNum;
    const digits = "0123456789ABCDEF";

    while (temp > 0) {
      const quotient = Math.floor(temp / base);
      const remainder = temp % base;
      const char = digits[remainder];
      steps.push({
        dividend: temp,
        divisor: base,
        quotient,
        remainder,
        char
      });
      temp = quotient;
    }

    const finalResult = steps.map(s => s.char).reverse().join("");

    return { steps, final: finalResult };
  };

  const calculateFractionalConversion = (fracStr: string, limit: number) => {
    const val = parseFloat(fracStr);
    if (isNaN(val) || val < 0 || val >= 1) {
      return { error: "Fraction must be >= 0 and < 1 (e.g. 0.625)" };
    }

    const steps = [];
    let temp = val;
    let finalStr = "0.";

    for (let i = 0; i < limit; i++) {
      const product = temp * 2;
      const bit = product >= 1 ? 1 : 0;
      steps.push({
        step: i + 1,
        multiplier: temp,
        product,
        bit,
        next: product >= 1 ? product - 1 : product
      });
      finalStr += bit.toString();
      temp = product >= 1 ? product - 1 : product;
      if (temp === 0) break;
    }

    return { steps, final: finalStr };
  };

  const integerVal = parseInt(decInput, 10);
  const intCalc = calculateIntegerConversion(integerVal, targetBase);
  const fracCalc = calculateFractionalConversion(fracInput, fracResultBits);

  const triggerPreset = (presetInt: string, presetFrac: string, base: 2 | 8 | 16) => {
    setDecInput(presetInt);
    setFracInput(presetFrac);
    setTargetBase(base);
  };

  return (
    <div className="space-y-10">
      <div className="border-b-4 border-black pb-4">
        <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-1 tracking-wider">
          CONVERTER WORKSPACE
        </span>
        <h2 className="text-3xl font-black uppercase text-black tracking-tighter mt-3">
          Radix &amp; Positional Notation Sandbox
        </h2>
        <p className="text-sm font-medium text-gray-600 mt-1">
          Explore step-by-step conversion mechanics. Study both whole integer division lists and fraction multipliers.
        </p>
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[10px] font-bold uppercase text-gray-500 mr-2">Curriculum Presets:</span>
        <button
          onClick={() => triggerPreset("3567", "0.828125", 16)}
          className="border border-black px-3 py-1.5 text-xs font-bold uppercase text-black hover:bg-black hover:text-white cursor-pointer transition-colors"
        >
          Preset 1: Dec 3567 &amp; 0.828 &rarr; Hex
        </button>
        <button
          onClick={() => triggerPreset("37", "0.625", 2)}
          className="border border-black px-3 py-1.5 text-xs font-bold uppercase text-black hover:bg-black hover:text-white cursor-pointer transition-colors"
        >
          Preset 2: Dec 37 &amp; 0.625 &rarr; Binary
        </button>
        <button
          onClick={() => triggerPreset("375", "0.33", 8)}
          className="border border-black px-3 py-1.5 text-xs font-bold uppercase text-black hover:bg-black hover:text-white cursor-pointer transition-colors"
        >
          Preset 3: Dec 375 &amp; 0.33 &rarr; Octal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Integer Conversion card */}
        <div className="border-2 border-black p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
              <Binary className="w-4 h-4 text-black" />
              1. Whole Integer Base Converter
            </h3>
            <span className="text-[9px] font-black uppercase bg-gray-100 text-gray-700 px-2 py-0.5 border border-gray-300">
              Positional Notation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-black tracking-tight block">
                Decimal Number (Positive Whole)
              </label>
              <input
                type="number"
                min="0"
                value={decInput}
                onChange={(e) => setDecInput(e.target.value)}
                className="w-full bg-white border border-black p-2.5 font-bold text-sm focus:outline-none"
                placeholder="e.g. 37"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-black tracking-tight block">
                Target Base
              </label>
              <div className="flex border border-black bg-white overflow-hidden">
                {([2, 8, 16] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setTargetBase(b)}
                    className={`flex-1 py-2 text-center text-xs font-black cursor-pointer transition-colors ${
                      targetBase === b
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {b === 2 ? "Bin (B2)" : b === 8 ? "Oct (B8)" : "Hex (B16)"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output */}
          <div className="space-y-4">
            <div className="bg-gray-50 border border-black p-4 space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400 block tracking-widest leading-none">
                FINAL OUTPUTS
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-black">
                  {!("error" in intCalc) ? intCalc.final : "—"}
                </span>
                <span className="text-xs font-mono font-bold text-gray-600">
                  (Base {targetBase})
                </span>
              </div>
            </div>

            {!("error" in intCalc) && (
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase text-black tracking-widest border-b border-gray-200 pb-1">
                  Step-by-Step Division Log
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-medium border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-black border-y border-black font-bold uppercase text-[10px]">
                        <th className="p-2">Step</th>
                        <th className="p-2">Division (Dividend / Base)</th>
                        <th className="p-2">Quotient</th>
                        <th className="p-2 text-right">Remainder</th>
                        <th className="p-2 text-right">Equivalent Digits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-mono text-gray-700">
                      {intCalc.steps.map((step, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="p-2 font-bold">{idx + 1}</td>
                          <td className="p-2">
                            {step.dividend} ÷ {step.divisor}
                          </td>
                          <td className="p-2">{step.quotient}</td>
                          <td className="p-2 text-right font-bold text-black">{step.remainder}</td>
                          <td className="p-2 text-right">
                            <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black">
                              {step.char}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-gray-600 leading-tight font-medium">
                  💡 <strong>How to read:</strong> Read the remainder column from the <strong>bottom to the top</strong> to formulate your final base output:{" "}
                  <strong className="text-black">{intCalc.final}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Fractional Conversion card */}
        <div className="border-2 border-black p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
              <Binary className="w-4 h-4 text-black" />
              2. Fractional Base-2 Converter
            </h3>
            <span className="text-[9px] font-black uppercase bg-gray-100 text-gray-700 px-2 py-0.5 border border-gray-300">
              Radix Math
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-black tracking-tight block">
                Fraction Part (0 ≤ X &lt; 1)
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                max="0.999"
                value={fracInput}
                onChange={(e) => setFracInput(e.target.value)}
                className="w-full bg-white border border-black p-2.5 font-bold text-sm focus:outline-none"
                placeholder="e.g. 0.625"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-black tracking-tight block">
                Max Precision Bits
              </label>
              <div className="flex border border-black bg-white overflow-hidden">
                {([4, 8, 12] as const).map((bits) => (
                  <button
                    key={bits}
                    onClick={() => setFracResultBits(bits)}
                    className={`flex-1 py-2 text-center text-xs font-black cursor-pointer transition-colors ${
                      fracResultBits === bits
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {bits}-bit
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output fractional */}
          <div className="space-y-4">
            <div className="bg-gray-50 border border-black p-4 space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400 block tracking-widest leading-none">
                FRACTION BINARY OUTPUT
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-black break-all">
                  {!("error" in fracCalc) ? fracCalc.final : "—"}
                </span>
                <span className="text-xs font-mono font-bold text-gray-600 shrink-0">
                  (Base 2)
                </span>
              </div>
            </div>

            {!("error" in fracCalc) && (
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase text-black tracking-widest border-b border-gray-200 pb-1">
                  Step-by-Step Multiplication Log
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-medium border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-black border-y border-black font-bold uppercase text-[10px]">
                        <th className="p-2">Step</th>
                        <th className="p-2">Multiplication (X * 2)</th>
                        <th className="p-2">Product</th>
                        <th className="p-2 text-right">Extracted Carry Bit</th>
                        <th className="p-2 text-right">Next Fraction</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-mono text-gray-700">
                      {fracCalc.steps.map((step, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="p-2 font-bold">{step.step}</td>
                          <td className="p-2">
                            {step.multiplier.toFixed(6).replace(/\.?0+$/, "")} × 2
                          </td>
                          <td className="p-2">
                            {step.product.toFixed(6).replace(/\.?0+$/, "")}
                          </td>
                          <td className="p-2 text-right">
                            <span className={`px-2 py-0.5 text-[10px] font-black ${
                              step.bit === 1 ? "bg-black text-white" : "bg-gray-200 text-black"
                            }`}>
                              {step.bit}
                            </span>
                          </td>
                          <td className="p-2 text-right font-bold text-black">
                            {step.next.toFixed(6).replace(/\.?0+$/, "")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-gray-600 leading-tight font-medium">
                  💡 <strong>How to read:</strong> Read the extracted carry bits from <strong>top to bottom</strong> to compile your fractional radix: <strong className="text-black">{fracCalc.final}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// Sub-Tool 2: Interactive Logic Gate Sandbox
// ==========================================
function LogicGateSandbox() {
  const [inputA, setInputA] = useState<0 | 1>(1);
  const [inputB, setInputB] = useState<0 | 1>(0);
  const [selectedGate, setSelectedGate] = useState<"AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR">("AND");

  const calculateOutput = (a: 0 | 1, b: 0 | 1, gate: string): 0 | 1 => {
    switch (gate) {
      case "AND": return a === 1 && b === 1 ? 1 : 0;
      case "OR": return a === 1 || b === 1 ? 1 : 0;
      case "NOT": return a === 1 ? 0 : 1; // Only uses input A
      case "NAND": return !(a === 1 && b === 1) ? 1 : 0;
      case "NOR": return !(a === 1 || b === 1) ? 1 : 0;
      case "XOR": return a !== b ? 1 : 0;
      default: return 0;
    }
  };

  const currentOutput = calculateOutput(inputA, inputB, selectedGate);

  const getTruthTableRows = (gate: string) => {
    if (gate === "NOT") {
      return [
        { a: 0, b: 0, out: 1 },
        { a: 1, b: 0, out: 0 }
      ];
    }
    return [
      { a: 0, b: 0, out: calculateOutput(0, 0, gate) },
      { a: 0, b: 1, out: calculateOutput(0, 1, gate) },
      { a: 1, b: 0, out: calculateOutput(1, 0, gate) },
      { a: 1, b: 1, out: calculateOutput(1, 1, gate) }
    ];
  };

  const truthTable = getTruthTableRows(selectedGate);

  return (
    <div className="space-y-10">
      <div className="border-b-4 border-black pb-4">
        <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-1 tracking-wider">
          SILICON PLAYGROUND
        </span>
        <h2 className="text-3xl font-black uppercase text-black tracking-tighter mt-3">
          Interactive Logic Gate Simulator
        </h2>
        <p className="text-sm font-medium text-gray-600 mt-1">
          Select logical operators, toggle input pins, and study truth value transitions instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls & SVG Diagram Panel */}
        <div className="lg:col-span-7 border-2 border-black p-6 bg-white space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-[10px] font-black uppercase text-gray-500">
              Interactive Logic Graph
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {(["AND", "OR", "NOT", "NAND", "NOR", "XOR"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGate(g)}
                  className={`px-3 py-1 text-[10px] uppercase font-black cursor-pointer border ${
                    selectedGate === g
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Input Toggles and interactive values */}
          <div className="flex justify-around items-center bg-gray-50 border border-black p-4">
            <div className="text-center space-y-1">
              <span className="text-[9px] font-black text-gray-400 block uppercase">Input pin A</span>
              <button
                onClick={() => setInputA(prev => prev === 1 ? 0 : 1)}
                className={`w-12 h-12 text-sm font-black rounded-none border-2 border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all ${
                  inputA === 1 ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {inputA}
              </button>
            </div>

            {selectedGate !== "NOT" && (
              <div className="text-center space-y-1">
                <span className="text-[9px] font-black text-gray-400 block uppercase">Input pin B</span>
                <button
                  onClick={() => setInputB(prev => prev === 1 ? 0 : 1)}
                  className={`w-12 h-12 text-sm font-black rounded-none border-2 border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all ${
                    inputB === 1 ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {inputB}
                </button>
              </div>
            )}

            <div className="h-10 w-px bg-gray-300"></div>

            <div className="text-center space-y-1">
              <span className="text-[9px] font-black text-gray-400 block uppercase">Calculated Out</span>
              <div className={`w-12 h-12 flex justify-center items-center text-sm font-black border-2 border-black ${
                currentOutput === 1 ? "bg-black text-white animate-pulse" : "bg-white text-black"
              }`}>
                {currentOutput}
              </div>
            </div>
          </div>

          {/* Real-time SVG Diagram */}
          <div className="border border-black p-4 bg-white flex justify-center items-center h-48 select-none">
            <svg viewBox="0 0 250 120" className="w-full h-full max-h-40 font-mono">
              {/* Left hand Input lines */}
              <line x1="20" y1="40" x2="90" y2="40" stroke="#000" strokeWidth="2.5" className={inputA === 1 ? "stroke-black" : "stroke-gray-300"} />
              <text x="15" y="44" fontSize="10" fontWeight="bold">{`A (${inputA})`}</text>

              {selectedGate !== "NOT" && (
                <>
                  <line x1="20" y1="80" x2="90" y2="80" stroke="#000" strokeWidth="2.5" className={inputB === 1 ? "stroke-black" : "stroke-gray-300"} />
                  <text x="15" y="84" fontSize="10" fontWeight="bold">{`B (${inputB})`}</text>
                </>
              )}

              {/* Central Gate Draw - AND Shape */}
              {selectedGate === "AND" && (
                <g>
                  {/* D-Shape */}
                  <path d="M 90 30 L 120 30 A 30 30 0 0 1 120 90 L 90 90 Z" fill="#fff" stroke="#000" strokeWidth="3" />
                  <text x="110" y="64" fontSize="11" fontWeight="black">AND</text>
                </g>
              )}

              {/* OR Shape */}
              {selectedGate === "OR" && (
                <g>
                  <path d="M 85 30 C 100 30, 110 40, 140 60 C 110 80, 100 90, 85 90 C 95 70, 95 50, 85 30 Z" fill="#fff" stroke="#000" strokeWidth="3" />
                  <text x="110" y="64" fontSize="11" fontWeight="black">OR</text>
                </g>
              )}

              {/* NOT Shape */}
              {selectedGate === "NOT" && (
                <g>
                  <polygon points="90,35 140,60 90,85" fill="#fff" stroke="#000" strokeWidth="3" />
                  <circle cx="145" cy="60" r="5" fill="#fff" stroke="#000" strokeWidth="3" />
                  <text x="105" y="64" fontSize="11" fontWeight="black">NOT</text>
                </g>
              )}

              {/* NAND Shape */}
              {selectedGate === "NAND" && (
                <g>
                  <path d="M 85 30 L 115 30 A 30 30 0 0 1 115 90 L 85 90 Z" fill="#fff" stroke="#000" strokeWidth="3" />
                  <circle cx="150" cy="60" r="5" fill="#fff" stroke="#000" strokeWidth="3" />
                  <text x="105" y="64" fontSize="10" fontWeight="black">NAND</text>
                </g>
              )}

              {/* NOR Shape */}
              {selectedGate === "NOR" && (
                <g>
                  <path d="M 80 30 C 95 30, 105 40, 135 60 C 105 80, 95 90, 80 90 C 90 70, 90 50, 80 30 Z" fill="#fff" stroke="#000" strokeWidth="3" />
                  <circle cx="140" cy="60" r="5" fill="#fff" stroke="#000" strokeWidth="3" />
                  <text x="102" y="64" fontSize="10" fontWeight="black">NOR</text>
                </g>
              )}

              {/* XOR Shape */}
              {selectedGate === "XOR" && (
                <g>
                  <path d="M 75 30 C 85 50, 85 70, 75 90" fill="none" stroke="#000" strokeWidth="2.5" />
                  <path d="M 82 30 C 97 30, 107 40, 137 60 C 107 80, 97 90, 82 90 C 92 70, 92 50, 82 30 Z" fill="#fff" stroke="#000" strokeWidth="3" />
                  <text x="105" y="64" fontSize="11" fontWeight="black">XOR</text>
                </g>
              )}

              {/* Output Wire lines */}
              {selectedGate === "NOT" && (
                <line x1="150" y1="60" x2="210" y2="60" stroke="#000" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-black" : "stroke-gray-300"} />
              )}
              {selectedGate === "AND" && (
                <line x1="150" y1="60" x2="210" y2="60" stroke="#000" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-black" : "stroke-gray-300"} />
              )}
              {selectedGate === "OR" && (
                <line x1="140" y1="60" x2="210" y2="60" stroke="#000" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-black" : "stroke-gray-300"} />
              )}
              {selectedGate === "NAND" && (
                <line x1="155" y1="60" x2="210" y2="60" stroke="#000" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-black" : "stroke-gray-300"} />
              )}
              {selectedGate === "NOR" && (
                <line x1="145" y1="60" x2="210" y2="60" stroke="#000" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-black" : "stroke-gray-300"} />
              )}
              {selectedGate === "XOR" && (
                <line x1="137" y1="60" x2="210" y2="60" stroke="#000" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-black" : "stroke-gray-300"} />
              )}

              <text x="215" y="64" fontSize="10" fontWeight="bold">{`OUT (${currentOutput})`}</text>
            </svg>
          </div>
        </div>

        {/* Truth Table Panel */}
        <div className="lg:col-span-5 border-2 border-black p-6 bg-white space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Silicon Truth Table
            </h3>
          </div>

          <div className="space-y-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 text-black border-y border-black font-black uppercase text-[10px]">
                  <th className="p-2.5">In A</th>
                  {selectedGate !== "NOT" && <th className="p-2.5">In B</th>}
                  <th className="p-2.5 text-right">Result Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-mono text-xs font-bold">
                {truthTable.map((row, idx) => {
                  const isActive = row.a === inputA && (selectedGate === "NOT" || row.b === inputB);
                  return (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        isActive
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-2.5">{row.a}</td>
                      {selectedGate !== "NOT" && <td className="p-2.5">{row.b}</td>}
                      <td className="p-2.5 text-right font-black">
                        <span className={`px-2 py-0.5 text-[10px] ${
                          row.out === 1
                            ? isActive 
                              ? "bg-white text-black" 
                              : "bg-black text-white"
                            : isActive 
                              ? "bg-gray-800 text-gray-300" 
                              : "bg-gray-100 text-gray-600"
                        }`}>
                          {row.out}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="bg-gray-50 border border-black p-4 space-y-2">
              <h4 className="text-[10px] font-black uppercase text-black">Silicon Equivalency Note</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold uppercase text-[9px]">
                {selectedGate === "AND" && "AND gates output 1 only when A and B connect to positive voltage lines."}
                {selectedGate === "OR" && "OR gates require at least one input line with voltage to route signal to OUT."}
                {selectedGate === "NOT" && "NOT gates act as silicon inverters, reversing the voltage states completely."}
                {selectedGate === "NAND" && "NAND is a Universal Gate. Combination logic can build any chip solely from NAND gates!"}
                {selectedGate === "NOR" && "NOR is another Universal Gate, emitting 1 only when both inputs stay at 0 voltage."}
                {selectedGate === "XOR" && "XOR acts as an inequality evaluator, carrying signal only if inputs differ."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// Sub-Tool 3: Von Neumann CPU simulator
// ==========================================
function CpuSimulatorSandbox() {
  const [cpuStep, setCpuStep] = useState<"IDLE" | "FETCH" | "DECODE" | "EXECUTE" | "STORE">("IDLE");
  const [pc, setPc] = useState<number>(100);
  const [mar, setMar] = useState<string>("0x00");
  const [mdr, setMdr] = useState<string>("LDA #15");
  const [accumulator, setAccumulator] = useState<number>(0);
  
  // Custom RAM contents
  const [ram, setRam] = useState<{ [addr: string]: string }>({
    "0x64": "00001111 (Dec 15)",
    "0x65": "00000101 (Dec 5)",
  });

  const handleNextStep = () => {
    switch (cpuStep) {
      case "IDLE":
        setCpuStep("FETCH");
        setMar(`0x${pc.toString(16).toUpperCase()}`);
        setMdr("LDA #15");
        break;
      case "FETCH":
        setCpuStep("DECODE");
        break;
      case "DECODE":
        setCpuStep("EXECUTE");
        setAccumulator(15);
        break;
      case "EXECUTE":
        setCpuStep("STORE");
        // Pretend step ends with saving to RAM
        setRam(prev => ({
          ...prev,
          "0x66": "00001111 (Dec 15)"
        }));
        break;
      case "STORE":
        setCpuStep("IDLE");
        setPc(prev => prev + 1);
        break;
    }
  };

  const handleReset = () => {
    setCpuStep("IDLE");
    setPc(100);
    setMar("0x00");
    setMdr("LDA #15");
    setAccumulator(0);
    setRam({
      "0x64": "00001111 (Dec 15)",
      "0x65": "00000101 (Dec 5)",
    });
  };

  return (
    <div className="space-y-10">
      <div className="border-b-4 border-black pb-4">
        <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-1 tracking-wider">
          VON NEUMANN LABORATORY
        </span>
        <h2 className="text-3xl font-black uppercase text-black tracking-tighter mt-3">
          CPU Machine Cycle Simulator
        </h2>
        <p className="text-sm font-medium text-gray-600 mt-1">
          Perform clock-cycle ticks on a simulated Control Unit and ALU. Study how variables move through system busses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Core processor control */}
        <div className="lg:col-span-8 border-2 border-black p-6 bg-white space-y-6">
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-3 flex-wrap gap-2">
            <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Machine Control Unit &amp; Register Files
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleNextStep}
                className="bg-black text-white px-4 py-1.5 text-xs font-black uppercase tracking-tight flex items-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                {cpuStep === "IDLE" ? "Init Fetch" : `Next: ${cpuStep}`}
              </button>
              <button
                onClick={handleReset}
                className="border border-black px-3 py-1.5 text-xs font-bold uppercase hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Graphical diagram representing active state of the registers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className={`p-4 border border-black ${cpuStep === "FETCH" ? "bg-black text-white" : "bg-gray-50"}`}>
              <span className="text-[8px] font-black uppercase opacity-60 block">Program Counter (PC)</span>
              <span className="text-lg font-mono font-black">{pc}</span>
              <p className="text-[8px] mt-1 font-bold">Points to the next instruction positioning line.</p>
            </div>

            <div className={`p-4 border border-black ${cpuStep === "FETCH" ? "bg-black text-white" : "bg-gray-50"}`}>
              <span className="text-[8px] font-black uppercase opacity-60 block">Memory Address Reg (MAR)</span>
              <span className="text-lg font-mono font-black">{mar}</span>
              <p className="text-[8px] mt-1 font-bold">Holds memory location currently targeted for read/write.</p>
            </div>

            <div className={`p-4 border border-black ${cpuStep === "FETCH" ? "bg-black text-white" : "bg-gray-50"}`}>
              <span className="text-[8px] font-black uppercase opacity-60 block">Memory Data Reg (MDR)</span>
              <span className="text-sm font-mono font-black block truncate mt-1">{mdr}</span>
              <p className="text-[8px] mt-1 font-bold">Temporarily caches active command data bytes.</p>
            </div>

            <div className={`p-4 border border-black ${cpuStep === "EXECUTE" ? "bg-black text-white" : "bg-gray-50"}`}>
              <span className="text-[8px] font-black uppercase opacity-60 block">ALU Accumulator (ACC)</span>
              <span className="text-lg font-mono font-black">{accumulator}</span>
              <p className="text-[8px] mt-1 font-bold">Contains output accumulator buffer score.</p>
            </div>
          </div>

          {/* Active explanation track */}
          <div className="border border-black p-4 bg-gray-50 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5">
                {cpuStep} PHASE Active
              </span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed font-semibold">
              {cpuStep === "IDLE" && "Machine is waiting. Click \"Init Fetch\" to push address pointer lines onto the Address Bus and start processing."}
              {cpuStep === "FETCH" && "The Control Unit broadcasts MAR signals over the Address Bus to find address. The command word 'LDA #15' is fed back into the MDR registrars over our Data Bus."}
              {cpuStep === "DECODE" && "The Control Unit decodes 'LDA #15' (Load Accumulator with Decimal value 15). Inside modern CPU microchip grids, logic pathways open to trigger specific internal circuits."}
              {cpuStep === "EXECUTE" && "The ALU gates fire! The decimal value 15 is formally locked directly into the physical Accumulator Register."}
              {cpuStep === "STORE" && "Memory write lines pulse. The finished result in Accumulator is safely routed back to layout RAM grid address 0x66 over writing copper circuits."}
            </p>
          </div>
        </div>

        {/* RAM View Panel */}
        <div className="lg:col-span-4 border-2 border-black p-6 bg-white space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h3 className="text-sm font-black uppercase text-black flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Primary Memory Grid (RAM)
            </h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-black uppercase text-gray-400 px-1">
                <span>Address</span>
                <span>Silicon Byte Value</span>
              </div>
              <div className="divide-y divide-gray-100 font-mono text-xs max-h-48 overflow-y-auto border border-gray-200 p-2 space-y-1 text-gray-700">
                <div className="flex justify-between py-1.5 hover:bg-gray-50">
                  <span className="font-bold">0x64</span>
                  <span>{ram["0x64"]}</span>
                </div>
                <div className="flex justify-between py-1.5 hover:bg-gray-50">
                  <span className="font-bold">0x65</span>
                  <span>{ram["0x65"]}</span>
                </div>
                <div className="flex justify-between py-1.5 hover:bg-gray-50">
                  <span className="font-bold text-black font-black">0x66</span>
                  <span className="font-bold text-black">{ram["0x66"] || "00000000 (Empty)"}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-black p-3 text-[10px] text-gray-600 leading-snug font-medium">
              💡 <strong>RAM Architecture:</strong> Address rows map specifically to storage grids holding standard 8-bit bytes. Fetch steps access these locations instantly via the Address and Data Bus lines.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
