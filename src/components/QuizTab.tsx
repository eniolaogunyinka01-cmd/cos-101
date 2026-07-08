import React, { useState, useEffect } from "react";
import { QUIZ_QUESTIONS } from "../data";
import { 
  Award, 
  HelpCircle, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  BookOpen 
} from "lucide-react";
import { triggerCloudSync } from "../syncService";

export default function QuizTab() {
  const [examMode, setExamMode] = useState<"full" | "sprint" | null>(() => {
    try {
      const saved = localStorage.getItem("csc101_quiz_examMode");
      if (saved === "full" || saved === "sprint") return saved;
    } catch (_) {}
    return null;
  });
  const [activeSet, setActiveSet] = useState<typeof QUIZ_QUESTIONS>(() => {
    try {
      const saved = localStorage.getItem("csc101_quiz_activeSet");
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return QUIZ_QUESTIONS;
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("csc101_quiz_currentQuestionIndex");
      if (saved) return parseInt(saved, 10);
    } catch (_) {}
    return 0;
  });
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem("csc101_quiz_selectedOptionIndex");
      if (saved && saved !== "null") return parseInt(saved, 10);
    } catch (_) {}
    return null;
  });
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("csc101_quiz_isAnswerConfirmed");
      if (saved) return saved === "true";
    } catch (_) {}
    return false;
  });
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("csc101_quiz_correctAnswersCount");
      if (saved) return parseInt(saved, 10);
    } catch (_) {}
    return 0;
  });
  const [quizFinished, setQuizFinished] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("csc101_quiz_quizFinished");
      if (saved) return saved === "true";
    } catch (_) {}
    return false;
  });
  const [userAnswersHistory, setUserAnswersHistory] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem("csc101_quiz_userAnswersHistory");
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  useEffect(() => {
    try {
      if (examMode) {
        localStorage.setItem("csc101_quiz_examMode", examMode);
      } else {
        localStorage.removeItem("csc101_quiz_examMode");
      }
      localStorage.setItem("csc101_quiz_activeSet", JSON.stringify(activeSet));
      localStorage.setItem("csc101_quiz_currentQuestionIndex", currentQuestionIndex.toString());
      localStorage.setItem("csc101_quiz_selectedOptionIndex", selectedOptionIndex !== null ? selectedOptionIndex.toString() : "null");
      localStorage.setItem("csc101_quiz_isAnswerConfirmed", isAnswerConfirmed.toString());
      localStorage.setItem("csc101_quiz_correctAnswersCount", correctAnswersCount.toString());
      localStorage.setItem("csc101_quiz_quizFinished", quizFinished.toString());
      localStorage.setItem("csc101_quiz_userAnswersHistory", JSON.stringify(userAnswersHistory));
      
      triggerCloudSync();
    } catch (e) {
      console.error(e);
    }
  }, [examMode, activeSet, currentQuestionIndex, selectedOptionIndex, isAnswerConfirmed, correctAnswersCount, quizFinished, userAnswersHistory]);

  const handleStartExam = (mode: "full" | "sprint") => {
    let questions = [...QUIZ_QUESTIONS];
    if (mode === "sprint") {
      // shuffle and take 20 questions
      questions.sort(() => 0.5 - Math.random());
      questions = questions.slice(0, 20);
    }
    setActiveSet(questions);
    setExamMode(mode);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerConfirmed(false);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
    setUserAnswersHistory([]);
  };

  const activeQuestion = activeSet[currentQuestionIndex] || activeSet[0] || QUIZ_QUESTIONS[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerConfirmed) return;
    setSelectedOptionIndex(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOptionIndex === null || isAnswerConfirmed) return;
    
    const isCorrect = selectedOptionIndex === activeQuestion.answerIndex;
    setIsAnswerConfirmed(true);
    setUserAnswersHistory(prev => [...prev, isCorrect]);

    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeSet.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerConfirmed(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetryQuiz = () => {
    setExamMode(null);
    setActiveSet(QUIZ_QUESTIONS);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerConfirmed(false);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
    setUserAnswersHistory([]);
  };

  // Grade/Feedback generator
  const getQuizVerdict = (score: number, total: number) => {
    const ratio = score / total;
    if (ratio === 1) return { title: "PERFECT! CSC 101 MASTER", desc: "Superb! You demonstrated complete conceptual mastery over positional notation, networks, logic gates, and the machine cycle.", color: "text-green-600" };
    if (ratio >= 0.7) return { title: "AMAZING JOB! VERY STRONG PASS", desc: "Fantastic effort! You possess very strong foundations. Re-read the handbook on missteps to secure a 100% score.", color: "text-blue-600" };
    if (ratio >= 0.4) return { title: "DEVELOPING KNOWLEDGE", desc: "Good start, but some concepts still require study. Practice with the Sandbox Tools to build intuition.", color: "text-yellow-600" };
    return { title: "REQUIRES ACTIVE REVISION", desc: "Don't be discouraged! Computer Science involves heavy practice. Read the curriculum sections and retry.", color: "text-red-500" };
  };

  const verdict = getQuizVerdict(correctAnswersCount, activeSet.length);

  return (
    <div className="flex-1 bg-slate-50/50 p-5 md:p-8 overflow-y-auto w-full">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        
        {/* Quiz Header */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-full tracking-wide inline-block">
              ASSESSMENT CENTER
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              CSC 101 Curriculum Quiz Engine
            </h2>
            <p className="text-xs font-medium text-slate-500 max-w-2xl">
              Validate your knowledge with a curriculum-aligned examination simulator testing binary radix conversion, logical gates, networking concepts, and Von Neumann cycle steps.
            </p>
          </div>
        </div>

        {examMode === null ? (
          /* Mode Selection Screen */
          <div className="space-y-6 py-2">
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">Select Assessment Routine</h3>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                We have integrated all 319 questions from the Computer Fundamentals MCQ Bank (Suresh Khanal) and CSC 101 curriculum slides. Choose your workout size below:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => handleStartExam("sprint")}
                className="group text-left border border-slate-200/80 rounded-2xl p-6 bg-white hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between h-48 shadow-sm hover:-translate-y-1"
              >
                <div className="space-y-2.5">
                  <span className="text-[9px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full tracking-wide">
                    POPULAR ROUTINE
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 font-display group-hover:text-indigo-600 transition-colors">Quick Study Sprint</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Test your skills on 20 randomly drawn questions from the full 319 questions pool. Perfect for a rapid-round diagnostic test.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mt-4 group-hover:text-indigo-700">
                  <span>Start Sprint Run</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </button>

              <button
                onClick={() => handleStartExam("full")}
                className="group text-left border border-slate-200/80 rounded-2xl p-6 bg-white hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between h-48 shadow-sm hover:-translate-y-1"
              >
                <div className="space-y-2.5">
                  <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-full tracking-wide">
                    FULL ACCESS
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 font-display group-hover:text-indigo-600 transition-colors">Complete Syllabus Block</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Go head-to-head with the entire collection of 319 questions spanning binary arithmetic, memory subdivisions, networking, and logical algebra.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mt-4 group-hover:text-indigo-700">
                  <span>Start Final Exam</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>
        ) : !quizFinished ? (
          <div className="space-y-6">
            {/* Progress Indicator HUD */}
            <div className="flex justify-between items-center bg-white border border-slate-200/80 rounded-2xl p-4.5 flex-wrap gap-4 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Question {currentQuestionIndex + 1} of {activeSet.length}
              </span>
              
              {/* Elegant HUD Progress Bar slider */}
              <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden max-w-md hidden sm:block relative">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / activeSet.length) * 100}%` }}
                />
              </div>

              <span className="text-xs font-semibold text-slate-700 font-mono">
                Score: <strong className="text-slate-900">{correctAnswersCount}/{currentQuestionIndex}</strong> ({Math.round(currentQuestionIndex > 0 ? (correctAnswersCount / currentQuestionIndex) * 100 : 0)}%)
              </span>
            </div>

            {/* Active Question Box */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-slate-200/80 bg-white space-y-4 shadow-sm">
                <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-full tracking-wide inline-block">
                  QUESTION TOPIC
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-relaxed font-display">
                  {activeQuestion.question}
                </h3>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeQuestion.options.map((opt, oIdx) => {
                  const isSelected = selectedOptionIndex === oIdx;
                  const isCorrectAnswer = oIdx === activeQuestion.answerIndex;
                  
                  let optionStyle = "border-slate-200 text-slate-700 bg-white hover:border-slate-300 hover:bg-slate-50";
                  
                  if (isAnswerConfirmed) {
                     if (isCorrectAnswer) {
                       optionStyle = "border-emerald-500 text-emerald-900 bg-emerald-50/70 shadow-sm font-semibold";
                     } else if (isSelected) {
                       optionStyle = "border-rose-500 text-rose-900 bg-rose-50/70";
                     } else {
                       optionStyle = "border-slate-100 text-slate-400 bg-white opacity-60";
                     }
                  } else if (isSelected) {
                    optionStyle = "border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold ring-2 ring-indigo-600/10";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      disabled={isAnswerConfirmed}
                      className={`text-left p-4.5 border rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs font-medium leading-normal shadow-sm ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-bold text-slate-400">0{oIdx + 1}</span>
                        <span>{opt}</span>
                      </div>

                      {isAnswerConfirmed && isCorrectAnswer && (
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerConfirmed && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action buttons and explanation */}
            <div className="space-y-4">
              {!isAnswerConfirmed ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedOptionIndex === null}
                  className={`w-full py-3.5 text-center text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                    selectedOptionIndex === null
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/15"
                  }`}
                >
                  SUBMIT ANSWER FOR GRADING
                </button>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Academic Explanation &amp; Feedback
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold font-sans">
                      {activeQuestion.explanation || `The correct option is Option 0${activeQuestion.answerIndex + 1}: "${activeQuestion.options[activeQuestion.answerIndex]}". This represents a core theoretical benchmark standard within computer architecture parameters.`}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleRetryQuiz}
                      className="flex-1 py-3.5 text-center text-xs bg-white text-slate-700 font-semibold uppercase tracking-wider border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      Quit to Modes Selection
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      className="flex-1 py-3.5 text-center text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold uppercase tracking-wider rounded-xl cursor-pointer shadow-md shadow-indigo-600/15 transition-all"
                    >
                      {currentQuestionIndex < activeSet.length - 1 ? "Next Syllabus Question" : "Finish Quiz & View Verdict"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Completed Dashboard */
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-6 shadow-sm animate-fade-in">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex justify-center items-center border border-indigo-100 shadow-sm">
                <Award className="w-9 h-9" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full inline-block tracking-wide">
                FINISH LINE STATEMENT ({examMode === "sprint" ? "QUICK SPRINT" : "FULL EXAM"})
              </span>
              <h3 className={`text-xl font-extrabold tracking-tight font-display ${verdict.color}`}>
                {verdict.title}
              </h3>
              <p className="text-xs text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
                {verdict.desc}
              </p>
            </div>

            {/* Scoreboard */}
            <div className="max-w-md mx-auto bg-slate-50 rounded-xl border border-slate-100 divide-y divide-slate-100 text-xs font-semibold text-slate-600">
              <div className="flex justify-between p-3.5">
                <span>Total Questions Tested</span>
                <span className="text-slate-950 font-bold">{activeSet.length}</span>
              </div>
              <div className="flex justify-between p-3.5">
                <span>Correct Answers</span>
                <span className="text-emerald-600 font-bold">{correctAnswersCount}</span>
              </div>
              <div className="flex justify-between p-3.5">
                <span>Wrong Answers</span>
                <span className="text-rose-600 font-bold">{activeSet.length - correctAnswersCount}</span>
              </div>
              <div className="flex justify-between p-3.5 bg-indigo-50/50 rounded-b-xl text-indigo-950 font-bold">
                <span>Final Score Efficiency</span>
                <span>{Math.round((correctAnswersCount / activeSet.length) * 100)}%</span>
              </div>
            </div>

            <button
              onClick={handleRetryQuiz}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl uppercase tracking-wider transition-all shadow-md shadow-indigo-600/15 cursor-pointer"
            >
              Restart Exam Simulator
            </button>
          </div>
        )}

        {/* Slide 47 Essay Discussion Section */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-display">
                Curriculum Essay &amp; Self-Reflection Study Questions
              </h4>
            </div>
            <p className="text-xs font-medium text-slate-500 leading-relaxed">
              These five essential essay topics from Slide 47 of the CSC 101 curriculum challenge your conceptual reasoning. Tap any question to explore a high-scoring guide answer:
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  q: "Discuss the relevance of computers to your course in University of Ibadan",
                  a: "Regardless of your dynamic major (Medicine, Law, Humanities, or Sciences), Slide 44 emphasizes that computational models are ubiquitous. For example, geologists predict earthquakes, biologists map genetics (Computational Biology), and astrophysicists command lasers. Computing serves humanity by acting as a fast execution fabric for problem-solving in all domains."
                },
                {
                  q: "What is the core of Computer Science?",
                  a: "As defined on Slide 8 and developed by Donald Knuth, the absolute core is the systematic study of algorithmic processes that describe and transform information (automation). This encompasses their mathematical theory, space/time efficiency, logical modeling, and hardware-software execution."
                },
                {
                  q: "Distinguish between systems areas and applications areas of Computer Science discipline.",
                  a: "Slide 14 outlines: The Systems Area manages computer infrastructure (Algorithms, Programming Languages, Compilers, Computer Architecture, OS, Software Engineering, Networks, and HCI). The Applications Area develops domain-specific solutions (Numerical Computation, Databases, Artificial Intelligence & Robotics, Computer Graphics, Bioinformatics, and WWW/Games)."
                },
                {
                  q: "Is computing a mathematical discipline, a scientific discipline, or an engineering discipline? Explain.",
                  a: "Slide 26-27 establishes that computing brings together all three founding traditions: 1. Mathematics gives structural theories, logic, and algebra to reason about correctness. 2. Engineering provides creativity, design paradigms, and constraint analysis. 3. Experimental Science builds testable predictions, systematic experiments, and proves limits."
                },
                {
                  q: "Briefly discuss the steps involved in solving problems computationally.",
                  a: "Slide 9 outlines the three vital steps: 1. Abstraction (creating clean mental models omitting complex dashboard physical details). 2. Automation (translating models into explicit step-by-step algorithms). 3. Implementation (compiling code instruction streams that execute on processors to prove correctness)."
                }
              ].map((study, idx) => (
                <details key={idx} className="group border border-slate-200/60 bg-white rounded-xl p-4 transition-all hover:border-slate-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer focus:outline-none select-none">
                    <div className="flex gap-3 items-start text-xs font-semibold text-slate-800 tracking-tight pr-4">
                      <span className="font-mono text-[9px] text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded font-extrabold mt-0.5 shrink-0">STUDY_0{idx + 1}</span>
                      <span className="text-left font-display text-slate-900 font-bold">{study.q}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-open:rotate-180 transition-transform shrink-0">↓</span>
                  </summary>
                  <div className="mt-3.5 pt-3.5 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-semibold font-sans">
                    {study.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
