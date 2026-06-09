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

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export default function AiTutorTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <div className="flex-1 bg-white p-6 md:p-10 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
      {/* Tab Header */}
      <div className="border-b-4 border-black pb-4 mb-6 shrink-0">
        <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-1 tracking-wider">
          AI ASSISTANT
        </span>
        <h2 className="text-3xl font-black uppercase text-black tracking-tighter mt-3">
          CSC 101 AI Tutor Companion
        </h2>
        <p className="text-sm font-medium text-gray-600 mt-1">
          A server-side AI study assistant trained precisely in CSC 101 curriculum standards. Ask anything!
        </p>
      </div>

      {/* Chat logs area */}
      <div className="flex-1 border-2 border-black bg-gray-50 flex flex-col overflow-hidden mb-4">
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center p-4 space-y-6 max-w-lg mx-auto">
              <div className="w-12 h-12 bg-black flex justify-center items-center border border-black animate-bounce">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-black uppercase text-black">
                  Welcome to the CSC 101 Study Lounge
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-bold">
                  Ask me questions about logic gates, decimal-to-binary radix conversion, Von Neumann registers, CD lands and pits, or network star and mesh topologies!
                </p>
              </div>

              {/* hints */}
              <div className="w-full space-y-2">
                <span className="text-[9px] font-black uppercase text-gray-400 block tracking-widest text-center">
                  SUGGESTED LESSON QUESTIONS
                </span>
                <div className="grid grid-cols-1 gap-2 text-left">
                  <button
                    onClick={() => loadPresetMessage("How do computers do Two's Complement to represent negative numbers?")}
                    className="border border-black p-3 bg-white text-xs font-bold uppercase text-black hover:bg-black hover:text-white transition-all text-left truncate cursor-pointer"
                  >
                    💡 How does Two's Complement work?
                  </button>
                  <button
                    onClick={() => loadPresetMessage("Explain the six phases of the Software Development Method (SDM).")}
                    className="border border-black p-3 bg-white text-xs font-bold uppercase text-black hover:bg-black hover:text-white transition-all text-left truncate cursor-pointer"
                  >
                    💡 Explain the 6 steps of the SDM
                  </button>
                  <button
                    onClick={() => loadPresetMessage("Show me standard mathematical base conversions from decimal 3567 onto Hex.")}
                    className="border border-black p-3 bg-white text-xs font-bold uppercase text-black hover:bg-black hover:text-white transition-all text-left truncate cursor-pointer"
                  >
                    💡 Walkthrough Decimal 3567 to Hexadecimal
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 p-4 border border-black ${
                    msg.role === "user"
                      ? "bg-white ml-10"
                      : "bg-gray-100 mr-10"
                  } animate-fadeIn`}
                >
                  <div className="shrink-0 mt-0.5">
                    {msg.role === "user" ? (
                      <div className="w-7 h-7 bg-black text-white flex justify-center items-center font-bold text-xs">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 bg-white text-black border border-black flex justify-center items-center font-bold text-xs">
                        <Bot className="w-4 h-4 text-black" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">
                      {msg.role === "user" ? "Student" : "CSC 101 Tutor"}
                    </span>
                    <p className="text-xs text-gray-800 leading-relaxed font-semibold whitespace-pre-line">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 p-4 border border-black bg-gray-100 mr-10 animate-pulse">
                  <div className="shrink-0 mt-0.5">
                    <div className="w-7 h-7 bg-white text-black border border-black flex justify-center items-center font-bold text-xs">
                      <Loader2 className="w-4 h-4 text-black animate-spin" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">
                      Tutor is calculating...
                    </span>
                    <p className="text-xs text-gray-500 leading-relaxed font-bold italic">
                      Analyzing curriculum context and formulating step-by-step breakdown...
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="flex gap-4 p-4 border border-red-400 bg-red-50 mr-10 animate-fadeIn">
                  <div className="shrink-0 mt-0.5">
                    <div className="w-7 h-7 bg-red-100 text-red-700 flex justify-center items-center font-bold text-xs rounded-full">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[8px] font-black text-red-500 uppercase tracking-widest block">
                      Tutoring connection offline
                    </span>
                    <p className="text-xs text-red-700 leading-relaxed font-bold">
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
        className="flex border-2 border-black bg-white overflow-hidden shrink-0"
      >
        <input
          type="text"
          value={userInput}
          disabled={isLoading}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about CPU fetch, gates, topologies, binary fractions..."
          className="flex-1 p-4 text-sm font-bold bg-white text-black outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className="bg-black text-white px-6 uppercase font-black text-xs flex items-center gap-2 hover:bg-gray-800 disabled:opacity-40 transition-colors cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
