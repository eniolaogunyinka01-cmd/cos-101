import React, { useState } from "react";
import HandbookTab from "./components/HandbookTab";
import ToolsTab from "./components/ToolsTab";
import QuizTab from "./components/QuizTab";
import AiTutorTab from "./components/AiTutorTab";
import { 
  BookOpen, 
  Sliders, 
  HelpCircle, 
  Sparkles, 
  Cpu, 
  Network, 
  UserCircle2 
} from "lucide-react";

type TabType = "handbook" | "tools" | "quiz" | "tutor";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("handbook");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-black selection:bg-black selection:text-white">
      {/* Top Header Bar */}
      <header className="bg-black text-white px-6 py-4 border-b-4 border-black shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-black flex justify-center items-center border border-white shrink-0">
            <Cpu className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-wider leading-none">
              CSC 101 STUDY PORTAL
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">
              Curriculum Companion & Visual Learning Lab
            </p>
          </div>
        </div>

        {/* User profile card */}
        <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 px-4 py-2 text-left self-stretch sm:self-auto">
          <UserCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
          <div className="min-w-0">
            <span className="text-[8px] font-black uppercase text-gray-500 tracking-widest block leading-none">
              Student Profile
            </span>
            <span className="text-[10px] text-white font-bold truncate block mt-0.5">
              eniolaogunyinka01@gmail.com
            </span>
          </div>
        </div>
      </header>

      {/* Main Mode Navigation Bar */}
      <nav className="bg-white border-b-2 border-black shrink-0 overflow-x-auto flex divide-x divide-black">
        <button
          onClick={() => setActiveTab("handbook")}
          className={`flex-1 py-4 px-6 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap min-w-[150px] transition-all ${
            activeTab === "handbook"
              ? "bg-black text-white"
              : "text-black hover:bg-gray-100"
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>Curriculum Handbook</span>
        </button>

        <button
          onClick={() => setActiveTab("tools")}
          className={`flex-1 py-4 px-6 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap min-w-[150px] transition-all ${
            activeTab === "tools"
              ? "bg-black text-white"
              : "text-black hover:bg-gray-100"
          }`}
        >
          <Sliders className="w-4 h-4 shrink-0" />
          <span>Sandbox & Tools</span>
        </button>

        <button
          onClick={() => setActiveTab("quiz")}
          className={`flex-1 py-4 px-6 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap min-w-[150px] transition-all ${
            activeTab === "quiz"
              ? "bg-black text-white"
              : "text-black hover:bg-gray-100"
          }`}
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Practice Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab("tutor")}
          className={`flex-1 py-4 px-6 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap min-w-[150px] transition-all ${
            activeTab === "tutor"
              ? "bg-black text-white"
              : "text-black hover:bg-gray-100"
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>AI Tutor Companion</span>
        </button>
      </nav>

      {/* Main Interactive Screen Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#fafafa]">
        {activeTab === "handbook" && <HandbookTab />}
        {activeTab === "tools" && <ToolsTab />}
        {activeTab === "quiz" && <QuizTab />}
        {activeTab === "tutor" && <AiTutorTab />}
      </div>

      {/* Footer copyright and credit line */}
      <footer className="bg-black text-white px-6 py-3 border-t-2 border-black text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0">
        <span className="text-[10px] font-bold uppercase text-gray-500">
          Computer Science 101 Interactive Study Portal
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#eeeeee]">
          Designed in High Contrast Modernism
        </span>
      </footer>
    </div>
  );
}
