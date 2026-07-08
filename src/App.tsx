import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import HandbookTab from "./components/HandbookTab";
import ToolsTab from "./components/ToolsTab";
import QuizTab from "./components/QuizTab";
import AiTutorTab from "./components/AiTutorTab";
import { CHAPTERS } from "./data";
import { 
  BookOpen, 
  Sliders, 
  HelpCircle, 
  Sparkles, 
  Cpu, 
  Network, 
  UserCircle2,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon
} from "lucide-react";

type TabType = "handbook" | "tools" | "quiz" | "tutor";

export default function App() {
  const [activeTab, setActiveTab ] = useState<TabType>(() => {
    try {
      const saved = localStorage.getItem("csc101_activeTab");
      if (saved === "handbook" || saved === "tools" || saved === "quiz" || saved === "tutor") {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return "handbook";
  });

  const [readChapters, setReadChapters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("csc101_readChapters");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("csc101_darkMode");
      if (saved !== null) {
        return saved === "true";
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem("csc101_activeTab", activeTab);
    } catch (e) {
      console.error(e);
    }
  }, [activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem("csc101_readChapters", JSON.stringify(readChapters));
    } catch (e) {
      console.error(e);
    }
  }, [readChapters]);

  useEffect(() => {
    try {
      localStorage.setItem("csc101_darkMode", String(darkMode));
    } catch (e) {
      console.error(e);
    }
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const totalChapters = CHAPTERS.length;
  const readCount = readChapters.length;
  const percent = totalChapters > 0 ? Math.round((readCount / totalChapters) * 100) : 0;

  const [pulseActive, setPulseActive] = useState(false);
  const [lastPercent, setLastPercent] = useState(percent);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  useEffect(() => {
    if (percent !== lastPercent) {
      const milestones = [25, 50, 75, 100];
      if (milestones.includes(percent) && percent > lastPercent) {
        setPulseActive(true);
        const timer = setTimeout(() => setPulseActive(false), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [percent, lastPercent]);

  useEffect(() => {
    setLastPercent(percent);
  }, [percent]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-indigo-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-indigo-600/10 text-indigo-400 flex justify-center items-center rounded-xl border border-indigo-500/30 shrink-0 shadow-inner group-hover:scale-105 transition-all duration-300">
            <Cpu className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight leading-none font-display text-white">
              CSC 101 <span className="text-indigo-400">STUDY PORTAL</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1 font-sans">
              University of Ibadan Curriculum Companion
            </p>
          </div>
        </div>

        {/* Controls & User Profile */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Sleek Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl flex items-center justify-center transition-all duration-300 text-slate-300 hover:text-white cursor-pointer group shadow-inner shrink-0"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            id="theme-toggle"
          >
            {darkMode ? (
              <Sun className="w-4.5 h-4.5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-indigo-300 group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>

          {/* User profile card with progress tracker */}
          <div className="flex flex-col bg-slate-800/50 backdrop-blur-md border border-slate-700/60 rounded-2xl text-left flex-1 sm:flex-initial sm:min-w-[280px] shadow-sm overflow-hidden hover:border-slate-600/80 transition-colors duration-300">
          {/* Header section (always visible, clickable on mobile to expand) */}
          <button
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
            className="w-full flex items-center justify-between gap-3 p-3 text-left focus:outline-none transition-colors hover:bg-slate-700/30 sm:hover:bg-transparent sm:cursor-default"
            id="profile-toggle-header"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center">
                <UserCircle2 className="w-4.5 h-4.5 text-indigo-300 shrink-0" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block leading-none">
                  Student Profile
                </span>
                <span className="text-[11px] text-white font-medium truncate block mt-1">
                  eniolaogunyinka01@gmail.com
                </span>
              </div>
            </div>

            {/* Mobile-only compact indicators and trigger */}
            <div className="flex items-center gap-2 sm:hidden shrink-0">
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                {percent}% Done
              </span>
              {isProfileExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </button>

          {/* Collapsible progress details - hidden on mobile unless toggled open; always open on sm+ screens */}
          <div className={`px-4 pb-3 border-t border-slate-700/60 pt-2.5 sm:block ${isProfileExpanded ? "block" : "hidden"}`}>
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400 h-4">
              <span className="flex items-center gap-1.5">
                <span>Handbook Progress</span>
                {pulseActive && (
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                    className="bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0 uppercase tracking-tight"
                  >
                    Milestone!
                  </motion.span>
                )}
              </span>
              <span className="text-slate-300 font-mono text-[10px]">{readCount} / {totalChapters} Read</span>
            </div>
            
            <motion.div 
              className="w-full bg-slate-900 h-2 mt-1.5 rounded-full relative overflow-hidden border border-slate-800"
              animate={pulseActive ? {
                scale: [1, 1.02, 0.99, 1.01, 1],
                borderColor: ["#1e293b", "#10b981", "#1e293b"],
              } : {}}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                style={{ width: `${percent}%` }}
              />
              {pulseActive && (
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0, 0.3, 0] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </header>

      {/* Main Mode Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 shrink-0 overflow-x-auto flex p-2 gap-2 scrollbar-none shadow-sm">
        <button
          onClick={() => setActiveTab("handbook")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold tracking-tight flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap min-w-[150px] transition-all duration-300 ${
            activeTab === "handbook"
              ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <BookOpen className={`w-4 h-4 shrink-0 ${activeTab === "handbook" ? "text-indigo-600" : "text-slate-400"}`} />
          <span>Curriculum Handbook</span>
        </button>

        <button
          onClick={() => setActiveTab("tools")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold tracking-tight flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap min-w-[150px] transition-all duration-300 ${
            activeTab === "tools"
              ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Sliders className={`w-4 h-4 shrink-0 ${activeTab === "tools" ? "text-indigo-600" : "text-slate-400"}`} />
          <span>Sandbox & Tools</span>
        </button>

        <button
          onClick={() => setActiveTab("quiz")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold tracking-tight flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap min-w-[150px] transition-all duration-300 ${
            activeTab === "quiz"
              ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <HelpCircle className={`w-4 h-4 shrink-0 ${activeTab === "quiz" ? "text-indigo-600" : "text-slate-400"}`} />
          <span>Practice Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab("tutor")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold tracking-tight flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap min-w-[150px] transition-all duration-300 ${
            activeTab === "tutor"
              ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Sparkles className={`w-4 h-4 shrink-0 ${activeTab === "tutor" ? "text-indigo-600" : "text-slate-400"}`} />
          <span>AI Tutor Companion</span>
        </button>
      </nav>

      {/* Main Interactive Screen Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
        {activeTab === "handbook" && (
          <HandbookTab 
            readChapters={readChapters}
            onToggleRead={(id) => {
              setReadChapters((prev) => 
                prev.includes(id) 
                  ? prev.filter((item) => item !== id) 
                  : [...prev, id]
              );
            }}
          />
        )}
        {activeTab === "tools" && <ToolsTab />}
        {activeTab === "quiz" && <QuizTab />}
        {activeTab === "tutor" && <AiTutorTab />}
      </div>

      {/* Footer copyright and credit line */}
      <footer className="bg-slate-900 text-slate-400 px-6 py-3.5 border-t border-slate-800 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0 text-xs">
        <span className="font-semibold text-slate-400">
          Computer Science 101 Interactive Study Portal
        </span>
        <span className="font-medium text-indigo-400 tracking-wide font-display">
          Crafted for University of Ibadan Classmates
        </span>
      </footer>
      <Analytics />
    </div>
  );
}
