import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  signIn, 
  signUp, 
  forgotPassword, 
  isValidEmail 
} from "../authService";
import { 
  Cpu, 
  Mail, 
  Lock, 
  GraduationCap, 
  Sparkles, 
  Loader2, 
  Info, 
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from "lucide-react";

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

type AuthMode = "signin" | "signup" | "forgot";

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Email format validation using standard regex
  const isEmailValid = isValidEmail(email);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address (e.g., student@domain.com).");
      return;
    }

    if (mode !== "forgot" && !password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signin") {
        const res = await signIn(email, password);
        if (res.error) {
          setError(res.error);
        } else {
          onAuthSuccess();
        }
      } else if (mode === "signup") {
        const res = await signUp(email, password);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccessMessage("Account created successfully! Welcome to the portal.");
          setTimeout(() => {
            onAuthSuccess();
          }, 1500);
        }
      } else if (mode === "forgot") {
        const res = await forgotPassword(email);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccessMessage("Password reset email sent! Please check your inbox.");
        }
      }
    } catch (err: any) {
      setError("An unexpected connection error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 text-white relative overflow-hidden px-4 py-12">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Portal Branding Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex w-14 h-14 bg-indigo-600/20 text-indigo-400 items-center justify-center rounded-2xl border border-indigo-500/40 shadow-inner mb-4"
          >
            <Cpu className="w-7 h-7 text-indigo-400 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-2xl font-extrabold tracking-tight font-display text-white">
              CSC 101 <span className="text-indigo-400">STUDY PORTAL</span>
            </h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">
              University of Ibadan Study Companion
            </p>
          </motion.div>
        </div>

        {/* Main Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/80 backdrop-blur-lg border border-slate-700/60 rounded-3xl p-8 shadow-2xl overflow-hidden relative"
        >
          {/* Form tab selectors (only if not in forgot mode) */}
          {mode !== "forgot" && (
            <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  mode === "signin"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  mode === "signup"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Form Title & Subtitle */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {mode === "signin" && "Welcome Back, Student"}
              {mode === "signup" && "Join the Study Portal"}
              {mode === "forgot" && "Reset Your Password"}
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {mode === "signin" && "Log in to retrieve your study progress, handbook reading list, and quiz scores."}
              {mode === "signup" && "Sign up with any valid email address to unlock active practice tools, practice tests, and tutor chat."}
              {mode === "forgot" && "Enter your email address and we will send you a password recovery link."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {/* Success & Error Banners */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-rose-500/10 border border-rose-500/30 text-rose-200 p-3.5 rounded-xl text-xs flex gap-2.5 items-start overflow-hidden"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>{error}</div>
                </motion.div>
              )}
              {successMessage && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 p-3.5 rounded-xl text-xs flex gap-2.5 items-start overflow-hidden"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>{successMessage}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email input field */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., student@domain.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  required
                />
              </div>

              {/* Email validation sub-text */}
              {email && mode === "signup" && (
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px]">
                  {isEmailValid ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Valid email address format.
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      Please enter a valid format (e.g., example@domain.com).
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Password input field (only if not in forgot mode) */}
            {mode !== "forgot" && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Password
                  </label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode("forgot");
                        setError(null);
                        setSuccessMessage(null);
                      }}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            {/* Main Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>
                    {mode === "signin" && "Sign In to Portal"}
                    {mode === "signup" && "Register Account"}
                    {mode === "forgot" && "Send Reset Link"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Mode swappers */}
            {mode === "forgot" && (
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="w-full text-center text-xs text-slate-400 hover:text-white mt-4 font-semibold cursor-pointer block"
              >
                Back to Sign In
              </button>
            )}
            
            {mode === "signup" && (
              <p className="text-center text-xs text-slate-400 mt-4">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}

            {mode === "signin" && (
              <p className="text-center text-xs text-slate-400 mt-4">
                New to the portal?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
