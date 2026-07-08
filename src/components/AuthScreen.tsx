import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  signIn, 
  signUp, 
  isValidEmail 
} from "../authService";
import { 
  Cpu, 
  Mail, 
  Lock, 
  Sparkles, 
  Loader2, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  GraduationCap
} from "lucide-react";

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

type AuthMode = "signin" | "signup";

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Feedback states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isEmailValid = isValidEmail(email);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email address format (e.g. user@example.com).");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signin") {
        const res = await signIn(cleanEmail, password);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(`Welcome back! Accessing study portal...`);
          setTimeout(() => {
            onAuthSuccess();
          }, 1000);
        }
      } else {
        const res = await signUp(cleanEmail, password);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess("Account created! Logging you in automatically...");
          setTimeout(() => {
            onAuthSuccess();
          }, 1000);
        }
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-white relative overflow-hidden px-4 py-12 font-sans">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

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
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1 flex items-center justify-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              University of Ibadan Study Companion
            </p>
          </motion.div>
        </div>

        {/* Main Auth Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/80 backdrop-blur-lg border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative animate-fade-in"
        >
          {/* Mode Selector Tabs */}
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setError(null);
                setSuccess(null);
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
                setSuccess(null);
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

          {/* Title & Description */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{mode === "signin" ? "Student Sign In" : "Register Student Account"}</span>
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {mode === "signin" 
                ? "Enter your registered credentials to access your progress, sandbox workspace, and custom study handbook."
                : "Register with any valid email address to enable personalized quizzes, active notes trackers, and AI assistant."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {/* Feedback Alerts */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-rose-500/10 border border-rose-500/30 text-rose-200 p-3.5 rounded-xl text-xs flex gap-2.5 items-start overflow-hidden"
                >
                  <AlertTriangle className="w-4.5 h-4.5 text-rose-400 shrink-0 mt-0.5" />
                  <div>{error}</div>
                </motion.div>
              )}
              {success && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 p-3.5 rounded-xl text-xs flex gap-2.5 items-start overflow-hidden"
                >
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>{success}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
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
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                  required
                />
              </div>

              {email && (
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px]">
                  {isEmailValid ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Valid email address format.
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Please enter a valid format (e.g. user@example.com).
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                  required
                />
              </div>
              {password && password.length < 6 && (
                <div className="mt-1.5 text-[10px] text-rose-400 font-medium">
                  Password must be at least 6 characters.
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white disabled:text-slate-500 font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{mode === "signin" ? "Sign In to Portal" : "Register and Sign In"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Mode swappers link */}
            <div className="text-center mt-4">
              {mode === "signin" ? (
                <p className="text-xs text-slate-400">
                  New to the portal?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-400">
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>

            {/* Privacy & Security Footnote */}
            <div className="flex items-start gap-2.5 bg-slate-950/40 border border-slate-850 p-3.5 rounded-2xl mt-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-[10px] text-slate-400 leading-normal">
                <span className="font-semibold text-slate-300 block mb-0.5">Local Client-Side Storage</span>
                Your credentials and course progress are securely encrypted and saved inside your browser's private local workspace.
              </div>
            </div>
          </form>
        </motion.div>
        
        {/* Footer info links */}
        <p className="text-center text-[11px] text-slate-500 mt-6 tracking-wide">
          Need support? Please contact the course coordinator or system admin.
        </p>
      </div>
    </div>
  );
}
