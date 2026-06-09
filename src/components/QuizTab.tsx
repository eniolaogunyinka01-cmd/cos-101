import React, { useState } from "react";
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

export default function QuizTab() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState<boolean[]>([]);

  const activeQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

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
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerConfirmed(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetryQuiz = () => {
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

  const verdict = getQuizVerdict(correctAnswersCount, QUIZ_QUESTIONS.length);

  return (
    <div className="flex-1 bg-white p-6 md:p-10 overflow-y-auto max-w-4xl mx-auto w-full">
      
      {/* Quiz Header */}
      <div className="border-b-4 border-black pb-4 mb-8">
        <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-1 tracking-wider">
          ASSESSMENT CENTER
        </span>
        <h2 className="text-3xl font-black uppercase text-black tracking-tighter mt-3">
          CSC 101 Curriculum Quiz Engine
        </h2>
        <p className="text-sm font-medium text-gray-600 mt-1">
          Validate your knowledge with a curriculum-aligned examination simulator testing binary radix conversion, logical gates, and architectures.
        </p>
      </div>

      {!quizFinished ? (
        <div className="space-y-8">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center bg-gray-50 border border-black p-4 flex-wrap gap-2">
            <span className="text-xs font-black uppercase text-black tracking-tight">
              Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <div className="flex gap-1.5">
              {QUIZ_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 border border-black rounded-none ${
                    idx === currentQuestionIndex 
                      ? "bg-black" 
                      : idx < currentQuestionIndex
                        ? userAnswersHistory[idx] ? "bg-green-500" : "bg-red-500"
                        : "bg-white"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-black text-gray-600 font-mono">
              Score: {correctAnswersCount}/{currentQuestionIndex}
            </span>
          </div>

          {/* Active Question Box */}
          <div className="space-y-6">
            <div className="p-6 border-2 border-black bg-white space-y-4">
              <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-0.5">
                QUESTION TOPIC
              </span>
              <h3 className="text-lg font-black text-black leading-snug">
                {activeQuestion.question}
              </h3>
            </div>

            {/* Options list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedOptionIndex === oIdx;
                const isCorrectAnswer = oIdx === activeQuestion.answerIndex;
                
                let optionStyle = "border-black text-black bg-white hover:bg-gray-50";
                
                if (isAnswerConfirmed) {
                  if (isCorrectAnswer) {
                    optionStyle = "border-green-600 text-green-800 bg-green-50 font-black";
                  } else if (isSelected) {
                    optionStyle = "border-red-600 text-red-800 bg-red-50";
                  } else {
                    optionStyle = "border-gray-200 text-gray-400 bg-white opacity-60";
                  }
                } else if (isSelected) {
                  optionStyle = "border-black text-white bg-black font-black";
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={isAnswerConfirmed}
                    className={`text-left p-4 border-2 transition-all cursor-pointer flex items-center justify-between text-xs font-bold uppercase tracking-tight rounded-none ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono opacity-50">0{oIdx + 1}</span>
                      <span>{opt}</span>
                    </div>

                    {isAnswerConfirmed && isCorrectAnswer && (
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    )}
                    {isAnswerConfirmed && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-4 h-4 text-red-500 shrink-0" />
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
                className={`w-full py-4 text-center text-xs font-black uppercase tracking-widest border-2 border-black transition-all cursor-pointer ${
                  selectedOptionIndex === null
                    ? "opacity-40 bg-white text-black cursor-not-allowed"
                    : "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                }`}
              >
                SUBMIT ANSWER FOR GRADING
              </button>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-gray-50 border border-black p-5 space-y-2">
                  <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                    <BookOpen className="w-4 h-4 text-black" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-black">
                      Academic Explanation &amp; Feedback
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                    {activeQuestion.explanation}
                  </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full py-4 text-center text-xs bg-black text-white font-black uppercase tracking-widest border-2 border-black cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? "Next Syllabus Question" : "Finish Quiz & View Verdict"}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Dashboard */
        <div className="border-2 border-black p-8 bg-gray-50 text-center space-y-8 animate-fadeIn">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-black text-white flex justify-center items-center border border-black">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase bg-black text-white px-3 py-1">
              FINISH LINE STATEMENT
            </span>
            <h3 className={`text-2xl font-black uppercase italic ${verdict.color}`}>
              {verdict.title}
            </h3>
            <p className="text-xs text-gray-700 max-w-xl mx-auto font-medium leading-relaxed">
              {verdict.desc}
            </p>
          </div>

          {/* Scorboard */}
          <div className="max-w-md mx-auto bg-white border border-black divide-y divide-gray-200 uppercase text-xs font-bold">
            <div className="flex justify-between p-4">
              <span className="text-gray-500">Total Questions Tested</span>
              <span className="text-black font-black">{QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-gray-500">Correct Answers</span>
              <span className="text-green-600 font-black">{correctAnswersCount}</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-gray-500">Wrong Answers</span>
              <span className="text-red-500 font-black">{QUIZ_QUESTIONS.length - correctAnswersCount}</span>
            </div>
            <div className="flex justify-between p-4 bg-gray-100 text-black font-black">
              <span>Final score efficiency</span>
              <span>{Math.round((correctAnswersCount / QUIZ_QUESTIONS.length) * 100)}%</span>
            </div>
          </div>

          <button
            onClick={handleRetryQuiz}
            className="px-8 py-3.5 bg-black text-white text-xs font-black uppercase tracking-wider border-2 border-black hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Restart Exam Simulator
          </button>
        </div>
      )}
    </div>
  );
}
