import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  User, 
  Loader2, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  AlertTriangle 
} from "lucide-react";
import { triggerCloudSync } from "../syncService";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export default function AiTutorTab() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem("csc101_ai_messages");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("csc101_ai_messages", JSON.stringify(messages));
      triggerCloudSync();
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  const listEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest chats
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || userInput).trim();
    if (!text || isLoading) return;

    setMessages(prev => [...prev, { role: "user", content: text }]);
    if (!textToSend) setUserInput("");
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "model", content: data.text }]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Could not connect to the server. Please verify your internet connection and make sure your server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadPresetMessage = (preset: string) => {
    handleSend(preset);
  };

  return (
    <div className="flex-1 bg-slate-50/50 p-5 md:p-8 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
      {/* Tab Header */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 mb-6 shrink-0 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-full tracking-wide inline-block">
            AI ASSISTANT
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
            CSC 101 AI Tutor Companion
          </h2>
          <p className="text-xs font-medium text-slate-500 max-w-2xl">
            Ask any questions on positional radix mathematics, networking structures, or hardware circuits. Tested and calibrated for local UI core standards.
          </p>
        </div>
      </div>

      {/* Chat logs area */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 flex flex-col overflow-hidden mb-4 shadow-sm">
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center p-4 space-y-6 max-w-lg mx-auto">
              <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 text-indigo-600 flex justify-center items-center rounded-2xl shadow-sm animate-pulse">
                <Bot className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase text-slate-900 tracking-wider font-display">
                  Welcome to the CSC 101 Study Lounge
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Ask me questions about logic gates, decimal-to-binary radix conversion, Two's complement representing negative numbers, star/mesh layouts, or hardware subdivisions!
                </p>
              </div>

              {/* hints */}
              <div className="w-full space-y-3.5 pt-2">
                <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-widest text-center">
                  SUGGESTED LESSON QUESTIONS
                </span>
                <div className="grid grid-cols-1 gap-2 text-left">
                  <button
                    onClick={() => loadPresetMessage("How do computers do Two's Complement to represent negative numbers?")}
                    className="border border-slate-200/60 p-4.5 rounded-xl bg-white text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:shadow-md hover:bg-slate-50/50 transition-all text-left truncate cursor-pointer flex items-center gap-3 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>How does Two's Complement work?</span>
                  </button>
                  <button
                    onClick={() => loadPresetMessage("Explain the six phases of the Software Development Method (SDM).")}
                    className="border border-slate-200/60 p-4.5 rounded-xl bg-white text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:shadow-md hover:bg-slate-50/50 transition-all text-left truncate cursor-pointer flex items-center gap-3 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Explain the 6 steps of the SDM</span>
                  </button>
                  <button
                    onClick={() => loadPresetMessage("Show me standard mathematical base conversions from decimal 3567 onto Hex.")}
                    className="border border-slate-200/60 p-4.5 rounded-xl bg-white text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:shadow-md hover:bg-slate-50/50 transition-all text-left truncate cursor-pointer flex items-center gap-3 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Walkthrough Decimal 3567 to Hexadecimal</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 p-4.5 rounded-2xl border transition-all ${
                    msg.role === "user"
                      ? "bg-indigo-50/50 border-indigo-100/50 ml-4 sm:ml-16 shadow-sm"
                      : "bg-slate-50 border-slate-100 mr-4 sm:mr-16 shadow-sm"
                  } animate-fade-in`}
                >
                  <div className="shrink-0 mt-0.5">
                    {msg.role === "user" ? (
                      <div className="w-8 h-8 bg-indigo-600 text-white flex justify-center items-center font-bold text-xs rounded-full shadow-sm">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-white text-indigo-600 border border-indigo-100 flex justify-center items-center font-bold text-xs rounded-full shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                      {msg.role === "user" ? "Student" : "CSC 101 Tutor"}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold whitespace-pre-line font-sans">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 p-4.5 rounded-2xl border border-slate-100 bg-slate-50 mr-4 sm:mr-16 animate-pulse">
                  <div className="shrink-0 mt-0.5">
                    <div className="w-8 h-8 bg-white border border-indigo-100 flex justify-center items-center font-bold text-xs rounded-full shadow-sm">
                      <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                      Tutor is calculating...
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold italic font-sans">
                      Analyzing curriculum context and formulating step-by-step breakdown...
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="flex gap-4 p-4.5 rounded-2xl border border-rose-150 bg-rose-50/50 mr-4 sm:mr-16 animate-fade-in">
                  <div className="shrink-0 mt-0.5">
                    <div className="w-8 h-8 bg-rose-100 text-rose-700 flex justify-center items-center font-bold text-xs rounded-full">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest block">
                      Tutoring connection offline
                    </span>
                    <p className="text-xs text-rose-700 leading-relaxed font-semibold font-sans">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              <div ref={listEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input panel area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-indigo-600/10 p-1.5 gap-2 shrink-0"
      >
        <input
          type="text"
          value={userInput}
          disabled={isLoading}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about CPU fetch steps, gate tables, star topologies, binary values..."
          className="flex-1 px-4 py-3 text-sm font-medium bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-3 font-semibold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/10 disabled:opacity-40 transition-colors cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
