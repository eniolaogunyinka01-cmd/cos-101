import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { signInWithGoogle } from "../authService";
import { 
  Cpu, 
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

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await signInWithGoogle();
      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else if (res.user) {
        setSuccess(`Welcome, ${res.user.displayName || "Student"}! Redirecting to study portal...`);
        setTimeout(() => {
          onAuthSuccess();
        }, 1500);
      } else {
        setError("Unable to authenticate. Please try again.");
        setLoading(false);
      }
    } catch (err: any) {
      setError("An unexpected authentication error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-white relative overflow-hidden px-4 py-12">
      {/* Dynamic ambient background glows */}
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

        {/* Main Sign In Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/80 backdrop-blur-lg border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative"
        >
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

          {/* Title & Description */}
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <span>Sign In to Access Portal</span>
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Authenticate via Google to automatically save your progress, practice quiz history, reading stats, and AI tutor interactions.
            </p>
          </div>

          <div className="space-y-6">
            {/* Success & Error Banners */}
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

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white hover:bg-slate-100 disabled:bg-slate-800 text-slate-900 disabled:text-slate-500 font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98] transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Connecting Securely...</span>
                </>
              ) : (
                <>
                  {/* Google Custom SVG Logo */}
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 ml-1" />
                </>
              )}
            </button>

            {/* Privacy & Security Footnote */}
            <div className="flex items-start gap-2.5 bg-slate-950/40 border border-slate-850 p-3.5 rounded-2xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-[10.5px] text-slate-400 leading-normal">
                <span className="font-semibold text-slate-300 block mb-0.5">Secure Authentication Session</span>
                Credentials are encrypted and handled directly via Google Identity services. We never save or access your Google account password.
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Footer info links */}
        <p className="text-center text-[11px] text-slate-500 mt-6 tracking-wide">
          Need support? Please contact the course coordinator or system admin.
        </p>
      </div>
    </div>
  );
}
