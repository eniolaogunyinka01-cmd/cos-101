import React, { useState, useEffect } from "react";
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
  const [activeSubTool, setActiveSubTool] = useState<"converter" | "logic" | "cpu">(() => {
    try {
      const saved = localStorage.getItem("csc101_activeSubTool");
      if (saved === "converter" || saved === "logic" || saved === "cpu") {
        return saved;
      }
    } catch (_) {}
    return "converter";
  });

  useEffect(() => {
    try {
      localStorage.setItem("csc101_activeSubTool", activeSubTool);
    } catch (_) {}
  }, [activeSubTool]);

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50/50">
      {/* Sub-tool selection rail */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col bg-slate-50 shrink-0">
        <div className="p-5 border-b border-slate-200/80 bg-white hidden md:block">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Tactile Playgrounds
          </h3>
          <p className="text-xs text-indigo-600 font-semibold mt-1 font-display">
            Interactive Learning Labs
          </p>
        </div>
        <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible p-3 gap-2.5 md:space-y-1.5 scrollbar-none">
          <button
            onClick={() => setActiveSubTool("converter")}
            className={`px-4 py-2.5 md:py-3.5 flex items-center gap-3 transition-all uppercase cursor-pointer shrink-0 rounded-xl border md:border text-left ${
              activeSubTool === "converter"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10 font-semibold"
                : "text-slate-700 bg-white hover:bg-slate-50 border-slate-200"
            }`}
          >
            <Binary className="w-4.5 h-4.5 shrink-0" />
            <span className="text-[11px] tracking-tight">Base Converter Lab</span>
          </button>

          <button
            onClick={() => setActiveSubTool("logic")}
            className={`px-4 py-2.5 md:py-3.5 flex items-center gap-3 transition-all uppercase cursor-pointer shrink-0 rounded-xl border md:border text-left ${
              activeSubTool === "logic"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10 font-semibold"
                : "text-slate-700 bg-white hover:bg-slate-50 border-slate-200"
            }`}
          >
            <Sliders className="w-4.5 h-4.5 shrink-0" />
            <span className="text-[11px] tracking-tight">Logic Gate SIM</span>
          </button>

          <button
            onClick={() => setActiveSubTool("cpu")}
            className={`px-4 py-2.5 md:py-3.5 flex items-center gap-3 transition-all uppercase cursor-pointer shrink-0 rounded-xl border md:border text-left ${
              activeSubTool === "cpu"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10 font-semibold"
                : "text-slate-700 bg-white hover:bg-slate-50 border-slate-200"
            }`}
          >
            <Cpu className="w-4.5 h-4.5 shrink-0" />
            <span className="text-[11px] tracking-tight">CPU Cycle Simulator</span>
          </button>
        </nav>
      </aside>

      {/* Main Sandbox Workspace */}
      <main className="flex-1 p-5 md:p-8 overflow-y-auto bg-white">
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
  const [decInput, setDecInput] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("csc101_sandbox_decInput");
      if (saved !== null) return saved;
    } catch (_) {}
    return "37";
  });
  const [targetBase, setTargetBase] = useState<2 | 8 | 16>(() => {
    try {
      const saved = localStorage.getItem("csc101_sandbox_targetBase");
      if (saved === "2" || saved === "8" || saved === "16") {
        return parseInt(saved, 10) as 2 | 8 | 16;
      }
    } catch (_) {}
    return 2;
  });
  
  // Fractional input states
  const [fracInput, setFracInput] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("csc101_sandbox_fracInput");
      if (saved !== null) return saved;
    } catch (_) {}
    return "0.625";
  });
  const [fracResultBits, setFracResultBits] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("csc101_sandbox_fracResultBits");
      if (saved !== null) return parseInt(saved, 10);
    } catch (_) {}
    return 8;
  });

  useEffect(() => {
    try {
      localStorage.setItem("csc101_sandbox_decInput", decInput);
      localStorage.setItem("csc101_sandbox_targetBase", targetBase.toString());
      localStorage.setItem("csc101_sandbox_fracInput", fracInput);
      localStorage.setItem("csc101_sandbox_fracResultBits", fracResultBits.toString());
    } catch (_) {}
  }, [decInput, targetBase, fracInput, fracResultBits]);

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
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-full tracking-wide inline-block">
            CONVERTER WORKSPACE
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
            Radix &amp; Positional Notation Sandbox
          </h2>
          <p className="text-xs font-medium text-slate-500 max-w-2xl">
            Explore step-by-step conversion mechanics. Study both whole integer division lists and fraction multipliers to understand binary, octal, and hexadecimal representation.
          </p>
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2.5 items-center bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-indigo-500" />
          Curriculum Presets:
        </span>
        <button
          onClick={() => triggerPreset("3567", "0.828125", 16)}
          className="bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5"
        >
          Preset 1: Dec 3567 &amp; 0.828 &rarr; Hex
        </button>
        <button
          onClick={() => triggerPreset("37", "0.625", 2)}
          className="bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5"
        >
          Preset 2: Dec 37 &amp; 0.625 &rarr; Binary
        </button>
        <button
          onClick={() => triggerPreset("375", "0.33", 8)}
          className="bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5"
        >
          Preset 3: Dec 375 &amp; 0.33 &rarr; Octal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Integer Conversion card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
              <Binary className="w-4.5 h-4.5 text-indigo-500" />
              1. Whole Integer Base Converter
            </h3>
            <span className="text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
              Positional Notation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Decimal Number (Positive Whole)
              </label>
              <input
                type="number"
                min="0"
                value={decInput}
                onChange={(e) => setDecInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800"
                placeholder="e.g. 37"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Target Base
              </label>
              <div className="flex border border-slate-200 rounded-xl bg-slate-50 p-1 overflow-hidden">
                {([2, 8, 16] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setTargetBase(b)}
                    className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg cursor-pointer transition-all ${
                      targetBase === b
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {b === 2 ? "Bin" : b === 8 ? "Oct" : "Hex"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output */}
          <div className="space-y-5">
            <div className="bg-indigo-950 text-white rounded-xl p-4.5 space-y-1 shadow-inner relative overflow-hidden">
              <span className="text-[9px] font-bold uppercase text-indigo-300 block tracking-widest leading-none">
                FINAL CONVERSION OUTPUT
              </span>
              <div className="flex items-baseline gap-2 pt-1.5">
                <span className="text-3xl font-extrabold text-white tracking-tight font-display font-mono">
                  {!("error" in intCalc) ? intCalc.final : "—"}
                </span>
                <span className="text-xs font-mono font-semibold text-indigo-300">
                  (Base {targetBase})
                </span>
              </div>
              <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-10">
                <Binary className="w-16 h-16 text-white" />
              </div>
            </div>

            {!("error" in intCalc) && (
              <div className="space-y-4">
                <h4 className="text-[11px] font-bold uppercase text-slate-400 tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
                  <ChevronsRight className="w-4 h-4 text-indigo-500" />
                  Step-by-Step Division Log
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 font-bold uppercase text-[9px] tracking-wider">
                        <th className="p-3 pl-4">Step</th>
                        <th className="p-3">Division (Dividend / Base)</th>
                        <th className="p-3">Quotient</th>
                        <th className="p-3 text-right">Remainder</th>
                        <th className="p-3 text-right pr-4">Equivalent Digits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-slate-600 text-xs">
                      {intCalc.steps.map((step, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-3 pl-4 font-bold text-slate-400">{idx + 1}</td>
                          <td className="p-3 text-slate-700">
                            {step.dividend} ÷ {step.divisor}
                          </td>
                          <td className="p-3">{step.quotient}</td>
                          <td className="p-3 text-right font-bold text-slate-900">{step.remainder}</td>
                          <td className="p-3 text-right pr-4">
                            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-extrabold font-mono shadow-sm">
                              {step.char}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal bg-slate-50 p-3 rounded-xl border border-slate-100/70 font-medium">
                  💡 <strong className="text-slate-800">How to read:</strong> Compile the final output string by copying the remainder column from the <strong>bottom row to the top row</strong>:{" "}
                  <strong className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{intCalc.final}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Fractional Conversion card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
              <Binary className="w-4.5 h-4.5 text-indigo-500" />
              2. Fractional Base-2 Converter
            </h3>
            <span className="text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
              Radix Math
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Fraction Part (0 ≤ X &lt; 1)
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                max="0.999"
                value={fracInput}
                onChange={(e) => setFracInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800"
                placeholder="e.g. 0.625"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Max Precision Bits
              </label>
              <div className="flex border border-slate-200 rounded-xl bg-slate-50 p-1 overflow-hidden">
                {([4, 8, 12] as const).map((bits) => (
                  <button
                    key={bits}
                    onClick={() => setFracResultBits(bits)}
                    className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg cursor-pointer transition-all ${
                      fracResultBits === bits
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {bits}-bit
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output fractional */}
          <div className="space-y-5">
            <div className="bg-slate-900 text-white rounded-xl p-4.5 space-y-1 shadow-inner relative overflow-hidden border border-slate-800">
              <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-widest leading-none">
                FRACTION BINARY OUTPUT
              </span>
              <div className="flex items-baseline gap-2 pt-1.5">
                <span className="text-2xl font-extrabold text-indigo-400 break-all font-display font-mono">
                  {!("error" in fracCalc) ? fracCalc.final : "—"}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-400 shrink-0">
                  (Base 2)
                </span>
              </div>
            </div>

            {!("error" in fracCalc) && (
              <div className="space-y-4">
                <h4 className="text-[11px] font-bold uppercase text-slate-400 tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
                  <ChevronsRight className="w-4 h-4 text-indigo-500" />
                  Step-by-Step Multiplication Log
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 font-bold uppercase text-[9px] tracking-wider">
                        <th className="p-3 pl-4">Step</th>
                        <th className="p-3">Multiplication (X * 2)</th>
                        <th className="p-3">Product</th>
                        <th className="p-3 text-right">Extracted Carry Bit</th>
                        <th className="p-3 text-right pr-4">Next Fraction</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-slate-600 text-xs">
                      {fracCalc.steps.map((step, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-3 pl-4 font-bold text-slate-400">{step.step}</td>
                          <td className="p-3 text-slate-700">
                            {step.multiplier.toFixed(6).replace(/\.?0+$/, "")} × 2
                          </td>
                          <td className="p-3">
                            {step.product.toFixed(6).replace(/\.?0+$/, "")}
                          </td>
                          <td className="p-3 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold font-mono shadow-sm ${
                              step.bit === 1 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
                            }`}>
                              {step.bit}
                            </span>
                          </td>
                          <td className="p-3 text-right pr-4 font-bold text-slate-900">
                            {step.next.toFixed(6).replace(/\.?0+$/, "")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal bg-slate-50 p-3 rounded-xl border border-slate-100/70 font-medium font-sans">
                  💡 <strong className="text-slate-800">How to read:</strong> Assemble the fractional sequence by recording the extracted carry bits from <strong>top to bottom</strong>: <strong className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{fracCalc.final}</strong>.
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
  const [inputA, setInputA] = useState<0 | 1>(() => {
    try {
      const saved = localStorage.getItem("csc101_gate_inputA");
      if (saved === "0" || saved === "1") return parseInt(saved, 10) as 0 | 1;
    } catch (_) {}
    return 1;
  });
  const [inputB, setInputB] = useState<0 | 1>(() => {
    try {
      const saved = localStorage.getItem("csc101_gate_inputB");
      if (saved === "0" || saved === "1") return parseInt(saved, 10) as 0 | 1;
    } catch (_) {}
    return 0;
  });
  const [selectedGate, setSelectedGate] = useState<"AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "XNOR">(() => {
    try {
      const saved = localStorage.getItem("csc101_gate_selectedGate");
      if (
        saved === "AND" || 
        saved === "OR" || 
        saved === "NOT" || 
        saved === "NAND" || 
        saved === "NOR" || 
        saved === "XOR" || 
        saved === "XNOR"
      ) {
        return saved;
      }
    } catch (_) {}
    return "AND";
  });

  useEffect(() => {
    try {
      localStorage.setItem("csc101_gate_inputA", inputA.toString());
      localStorage.setItem("csc101_gate_inputB", inputB.toString());
      localStorage.setItem("csc101_gate_selectedGate", selectedGate);
    } catch (_) {}
  }, [inputA, inputB, selectedGate]);

  const calculateOutput = (a: 0 | 1, b: 0 | 1, gate: string): 0 | 1 => {
    switch (gate) {
      case "AND": return a === 1 && b === 1 ? 1 : 0;
      case "OR": return a === 1 || b === 1 ? 1 : 0;
      case "NOT": return a === 1 ? 0 : 1; // Only uses input A
      case "NAND": return !(a === 1 && b === 1) ? 1 : 0;
      case "NOR": return !(a === 1 || b === 1) ? 1 : 0;
      case "XOR": return a !== b ? 1 : 0;
      case "XNOR": return a === b ? 1 : 0;
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
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-full tracking-wide inline-block">
            SILICON PLAYGROUND
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
            Interactive Logic Gate Simulator
          </h2>
          <p className="text-xs font-medium text-slate-500 max-w-2xl">
            Select standard logical operators, toggle input voltage pins, and inspect truth value state transitions inside live silicon logic gates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls & SVG Diagram Panel */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-4 gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Interactive Logic Graph
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {(["AND", "OR", "NOT", "NAND", "NOR", "XOR", "XNOR"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGate(g)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                    selectedGate === g
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Input Toggles and interactive values */}
          <div className="flex justify-around items-center bg-slate-50 border border-slate-200/60 rounded-xl p-5">
            <div className="text-center space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Input A</span>
              <button
                onClick={() => setInputA(prev => prev === 1 ? 0 : 1)}
                className={`w-12 h-12 text-sm font-extrabold rounded-xl border cursor-pointer shadow-sm transition-all flex items-center justify-center ${
                  inputA === 1 
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20" 
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {inputA}
              </button>
            </div>

            {selectedGate !== "NOT" && (
              <div className="text-center space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Input B</span>
                <button
                  onClick={() => setInputB(prev => prev === 1 ? 0 : 1)}
                  className={`w-12 h-12 text-sm font-extrabold rounded-xl border cursor-pointer shadow-sm transition-all flex items-center justify-center ${
                    inputB === 1 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20" 
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {inputB}
                </button>
              </div>
            )}

            <div className="h-10 w-px bg-slate-200"></div>

            <div className="text-center space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider font-sans">Calculated Out</span>
              <div className={`w-12 h-12 flex justify-center items-center text-sm font-extrabold rounded-xl border ${
                currentOutput === 1 
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20 animate-pulse" 
                  : "bg-white border-slate-200 text-slate-600"
              }`}>
                {currentOutput}
              </div>
            </div>
          </div>

          {/* Real-time SVG Diagram */}
          <div className="border border-slate-200/80 rounded-xl p-4 bg-slate-50/50 flex justify-center items-center h-48 select-none">
            <svg viewBox="0 0 250 120" className="w-full h-full max-h-40 font-mono">
              {/* Left hand Input lines */}
              <line x1="55" y1="40" x2="90" y2="40" strokeWidth="2.5" className={inputA === 1 ? "stroke-indigo-600" : "stroke-slate-300"} />
              <text x="48" y="43" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="end">{`A (${inputA})`}</text>

              {selectedGate !== "NOT" && (
                <>
                  <line x1="55" y1="80" x2="90" y2="80" strokeWidth="2.5" className={inputB === 1 ? "stroke-indigo-600" : "stroke-slate-300"} />
                  <text x="48" y="83" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="end">{`B (${inputB})`}</text>
                </>
              )}

              {/* Central Gate Draw - AND Shape */}
              {selectedGate === "AND" && (
                <g>
                  {/* D-Shape */}
                  <path d="M 90 30 L 120 30 A 30 30 0 0 1 120 90 L 90 90 Z" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <text x="110" y="64" fontSize="10" fontWeight="900" fill="#1e1b4b">AND</text>
                </g>
              )}

              {/* OR Shape */}
              {selectedGate === "OR" && (
                <g>
                  <path d="M 85 30 C 100 30, 110 40, 140 60 C 110 80, 100 90, 85 90 C 95 70, 95 50, 85 30 Z" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <text x="108" y="64" fontSize="10" fontWeight="900" fill="#1e1b4b">OR</text>
                </g>
              )}

              {/* NOT Shape */}
              {selectedGate === "NOT" && (
                <g>
                  <polygon points="90,35 140,60 90,85" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <circle cx="145" cy="60" r="4" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <text x="103" y="64" fontSize="10" fontWeight="900" fill="#1e1b4b">NOT</text>
                </g>
              )}

              {/* NAND Shape */}
              {selectedGate === "NAND" && (
                <g>
                  <path d="M 85 30 L 115 30 A 30 30 0 0 1 115 90 L 85 90 Z" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <circle cx="150" cy="60" r="4" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <text x="101" y="64" fontSize="9" fontWeight="900" fill="#1e1b4b">NAND</text>
                </g>
              )}

              {/* NOR Shape */}
              {selectedGate === "NOR" && (
                <g>
                  <path d="M 80 30 C 95 30, 105 40, 135 60 C 105 80, 95 90, 80 90 C 90 70, 90 50, 80 30 Z" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <circle cx="140" cy="60" r="4" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <text x="98" y="64" fontSize="9" fontWeight="900" fill="#1e1b4b">NOR</text>
                </g>
              )}

              {/* XOR Shape */}
              {selectedGate === "XOR" && (
                <g>
                  <path d="M 75 30 C 85 50, 85 70, 75 90" fill="none" stroke="#4f46e5" strokeWidth="2" />
                  <path d="M 82 30 C 97 30, 107 40, 137 60 C 107 80, 97 90, 82 90 C 92 70, 92 50, 82 30 Z" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <text x="103" y="64" fontSize="10" fontWeight="900" fill="#1e1b4b">XOR</text>
                </g>
              )}

              {/* XNOR Shape */}
              {selectedGate === "XNOR" && (
                <g>
                  <path d="M 75 30 C 85 50, 85 70, 75 90" fill="none" stroke="#4f46e5" strokeWidth="2" />
                  <path d="M 82 30 C 97 30, 107 40, 137 60 C 107 80, 97 90, 82 90 C 92 70, 92 50, 82 30 Z" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <circle cx="142" cy="60" r="4" fill="#fff" stroke="#4f46e5" strokeWidth="2.5" />
                  <text x="99" y="64" fontSize="9" fontWeight="900" fill="#1e1b4b">XNOR</text>
                </g>
              )}

              {/* Output Wire lines */}
              {selectedGate === "NOT" && (
                <line x1="150" y1="60" x2="210" y2="60" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-emerald-500" : "stroke-slate-300"} />
              )}
              {selectedGate === "AND" && (
                <line x1="150" y1="60" x2="210" y2="60" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-emerald-500" : "stroke-slate-300"} />
              )}
              {selectedGate === "OR" && (
                <line x1="140" y1="60" x2="210" y2="60" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-emerald-500" : "stroke-slate-300"} />
              )}
              {selectedGate === "NAND" && (
                <line x1="155" y1="60" x2="210" y2="60" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-emerald-500" : "stroke-slate-300"} />
              )}
              {selectedGate === "NOR" && (
                <line x1="145" y1="60" x2="210" y2="60" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-emerald-500" : "stroke-slate-300"} />
              )}
              {selectedGate === "XOR" && (
                <line x1="137" y1="60" x2="210" y2="60" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-emerald-500" : "stroke-slate-300"} />
              )}
              {selectedGate === "XNOR" && (
                <line x1="147" y1="60" x2="210" y2="60" strokeWidth="2.5" className={currentOutput === 1 ? "stroke-emerald-500" : "stroke-slate-300"} />
              )}

              <text x="215" y="64" fontSize="9" fontWeight="bold" fill={currentOutput === 1 ? "#10b981" : "#64748b"}>{`OUT (${currentOutput})`}</text>
            </svg>
          </div>
        </div>

        {/* Truth Table Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
              <Layers className="w-4.5 h-4.5 text-indigo-500" />
              Silicon Truth Table
            </h3>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-xl border border-slate-100 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 font-bold uppercase text-[9px] tracking-wider">
                    <th className="p-3 pl-4">In A</th>
                    {selectedGate !== "NOT" && <th className="p-3">In B</th>}
                    <th className="p-3 text-right pr-4">Result Out</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs text-slate-600">
                  {truthTable.map((row, idx) => {
                    const isActive = row.a === inputA && (selectedGate === "NOT" || row.b === inputB);
                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isActive
                            ? "bg-indigo-50/70 text-indigo-950 font-bold"
                            : "hover:bg-slate-50/50"
                        }`}
                      >
                        <td className="p-3 pl-4">{row.a}</td>
                        {selectedGate !== "NOT" && <td className="p-3">{row.b}</td>}
                        <td className="p-3 text-right pr-4">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold shadow-sm ${
                            row.out === 1
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {row.out}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Silicon Equivalency Note</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold font-sans">
                {selectedGate === "AND" && "AND gates output 1 only when A and B connect to positive voltage lines."}
                {selectedGate === "OR" && "OR gates require at least one input line with voltage to route signal to OUT."}
                {selectedGate === "NOT" && "NOT gates act as silicon inverters, reversing the voltage states completely."}
                {selectedGate === "NAND" && "NAND is a Universal Gate. Combination logic can build any chip solely from NAND gates!"}
                {selectedGate === "NOR" && "NOR is another Universal Gate, emitting 1 only when both inputs stay at 0 voltage."}
                {selectedGate === "XOR" && "XOR acts as an inequality evaluator, carrying signal only if inputs differ."}
                {selectedGate === "XNOR" && "XNOR acts as an equality evaluator, carrying signal only if inputs are equal."}
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
  const [cpuStep, setCpuStep] = useState<"IDLE" | "FETCH" | "DECODE" | "EXECUTE" | "STORE">(() => {
    try {
      const saved = localStorage.getItem("csc101_cpu_cpuStep");
      if (saved === "IDLE" || saved === "FETCH" || saved === "DECODE" || saved === "EXECUTE" || saved === "STORE") {
        return saved;
      }
    } catch (_) {}
    return "IDLE";
  });
  const [pc, setPc] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("csc101_cpu_pc");
      if (saved !== null) return parseInt(saved, 10);
    } catch (_) {}
    return 100;
  });
  const [mar, setMar] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("csc101_cpu_mar");
      if (saved !== null) return saved;
    } catch (_) {}
    return "0x00";
  });
  const [mdr, setMdr] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("csc101_cpu_mdr");
      if (saved !== null) return saved;
    } catch (_) {}
    return "LDA #15";
  });
  const [accumulator, setAccumulator] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("csc101_cpu_accumulator");
      if (saved !== null) return parseInt(saved, 10);
    } catch (_) {}
    return 0;
  });
  
  // Custom RAM contents
  const [ram, setRam] = useState<{ [addr: string]: string }>(() => {
    try {
      const saved = localStorage.getItem("csc101_cpu_ram");
      if (saved !== null) return JSON.parse(saved);
    } catch (_) {}
    return {
      "0x64": "00001111 (Dec 15)",
      "0x65": "00000101 (Dec 5)",
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem("csc101_cpu_cpuStep", cpuStep);
      localStorage.setItem("csc101_cpu_pc", pc.toString());
      localStorage.setItem("csc101_cpu_mar", mar);
      localStorage.setItem("csc101_cpu_mdr", mdr);
      localStorage.setItem("csc101_cpu_accumulator", accumulator.toString());
      localStorage.setItem("csc101_cpu_ram", JSON.stringify(ram));
    } catch (_) {}
  }, [cpuStep, pc, mar, mdr, accumulator, ram]);

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
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-full tracking-wide inline-block">
            VON NEUMANN LABORATORY
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
            CPU Machine Cycle Simulator
          </h2>
          <p className="text-xs font-medium text-slate-500 max-w-2xl">
            Execute microcode clock-cycle ticks on a simulated Control Unit (CU) and Arithmetic Logic Unit (ALU). Trace register updates across the system buses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Core processor control */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 flex-wrap gap-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
              <Cpu className="w-4.5 h-4.5 text-indigo-500" />
              Machine Control Unit &amp; Register Files
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleNextStep}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-tight flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/15 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                {cpuStep === "IDLE" ? "Init Fetch" : `Next: ${cpuStep}`}
              </button>
              <button
                onClick={handleReset}
                className="border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Graphical diagram representing active state of the registers */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              cpuStep === "FETCH" 
                ? "bg-indigo-950 border-indigo-950 text-white shadow-md shadow-indigo-950/15" 
                : "bg-slate-50 border-slate-200/60 text-slate-800"
            }`}>
              <span className={`text-[9px] font-bold uppercase block leading-tight ${cpuStep === "FETCH" ? "text-indigo-300" : "text-slate-400"}`}>Program Counter</span>
              <span className="text-xl font-mono font-extrabold block mt-1">PC: {pc}</span>
              <p className={`text-[10px] mt-2 leading-normal ${cpuStep === "FETCH" ? "text-indigo-200/80" : "text-slate-500"}`}>Points to the next memory instruction address row.</p>
            </div>

            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              cpuStep === "FETCH" 
                ? "bg-indigo-950 border-indigo-950 text-white shadow-md shadow-indigo-950/15" 
                : "bg-slate-50 border-slate-200/60 text-slate-800"
            }`}>
              <span className={`text-[9px] font-bold uppercase block leading-tight ${cpuStep === "FETCH" ? "text-indigo-300" : "text-slate-400"}`}>Memory Addr Reg</span>
              <span className="text-xl font-mono font-extrabold block mt-1">MAR: {mar}</span>
              <p className={`text-[10px] mt-2 leading-normal ${cpuStep === "FETCH" ? "text-indigo-200/80" : "text-slate-500"}`}>Holds memory location targeted for active read/write cycles.</p>
            </div>

            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              cpuStep === "FETCH" 
                ? "bg-indigo-950 border-indigo-950 text-white shadow-md shadow-indigo-950/15" 
                : "bg-slate-50 border-slate-200/60 text-slate-800"
            }`}>
              <span className={`text-[9px] font-bold uppercase block leading-tight ${cpuStep === "FETCH" ? "text-indigo-300" : "text-slate-400"}`}>Memory Data Reg</span>
              <span className="text-xs font-mono font-extrabold block truncate mt-2 bg-white/10 px-1.5 py-0.5 rounded text-indigo-100">{mdr}</span>
              <p className={`text-[10px] mt-2 leading-normal ${cpuStep === "FETCH" ? "text-indigo-200/80" : "text-slate-500"}`}>Caches instructions or values buffered from system RAM.</p>
            </div>

            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              cpuStep === "EXECUTE" 
                ? "bg-emerald-950 border-emerald-900 text-emerald-100 shadow-md shadow-emerald-900/15" 
                : "bg-slate-50 border-slate-200/60 text-slate-800"
            }`}>
              <span className={`text-[9px] font-bold uppercase block leading-tight ${cpuStep === "EXECUTE" ? "text-emerald-400" : "text-slate-400"}`}>Accumulator</span>
              <span className="text-xl font-mono font-extrabold block mt-1">ACC: {accumulator}</span>
              <p className={`text-[10px] mt-2 leading-normal ${cpuStep === "EXECUTE" ? "text-emerald-200/80" : "text-slate-500"}`}>Holds immediate inputs and mathematical outputs inside the ALU.</p>
            </div>
          </div>

          {/* Active explanation track */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo-600 text-white px-2.5 py-1 rounded-full shadow-sm">
                {cpuStep} PHASE ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold font-sans">
              {cpuStep === "IDLE" && "Machine is waiting. Click \"Init Fetch\" to push address pointer lines onto the Address Bus and start processing."}
              {cpuStep === "FETCH" && "The Control Unit broadcasts MAR signals over the Address Bus to find address. The command word 'LDA #15' is fed back into the MDR registrars over our Data Bus."}
              {cpuStep === "DECODE" && "The Control Unit decodes 'LDA #15' (Load Accumulator with Decimal value 15). Inside modern CPU microchip grids, logic pathways open to trigger specific internal circuits."}
              {cpuStep === "EXECUTE" && "The ALU gates fire! The decimal value 15 is formally locked directly into the physical Accumulator Register."}
              {cpuStep === "STORE" && "Memory write lines pulse. The finished result in Accumulator is safely routed back to layout RAM grid address 0x66 over writing copper circuits."}
            </p>
          </div>
        </div>

        {/* RAM View Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
              <Layers className="w-4.5 h-4.5 text-indigo-500" />
              Primary Memory Grid (RAM)
            </h3>
          </div>

          <div className="space-y-5">
            <div className="space-y-2.5">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                <span>Address</span>
                <span>Silicon Byte Value</span>
              </div>
              <div className="divide-y divide-slate-100 font-mono text-xs border border-slate-100 rounded-xl p-3 space-y-1 bg-slate-50/50 text-slate-600 shadow-inner">
                <div className="flex justify-between py-1.5 hover:bg-slate-100/50 transition-colors px-1">
                  <span className="font-bold text-slate-700">0x64</span>
                  <span>{ram["0x64"]}</span>
                </div>
                <div className="flex justify-between py-1.5 hover:bg-slate-100/50 transition-colors px-1">
                  <span className="font-bold text-slate-700">0x65</span>
                  <span>{ram["0x65"]}</span>
                </div>
                <div className="flex justify-between py-1.5 hover:bg-slate-100/50 transition-colors px-1">
                  <span className="font-bold text-indigo-600">0x66</span>
                  <span className="font-bold text-indigo-700">{ram["0x66"] || "00000000 (Empty)"}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-[11px] text-slate-500 leading-relaxed font-medium">
              💡 <strong className="text-slate-800">RAM Architecture:</strong> Address rows map specifically to physical storage grids holding standard 8-bit bytes. Clocked fetch steps access these locations instantly via the system bus line structures.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
