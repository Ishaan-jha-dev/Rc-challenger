'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockRCs } from '@/data/mockRCs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Pause, Play, ChevronRight, ChevronLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function RCPracticePage() {
  const { id } = useParams();
  const router = useRouter();
  
  const rc = mockRCs.find(r => r.id === id);
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState((rc?.estimatedTimeMinutes || 10) * 60);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!rc || isSubmitted || isPaused) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit could go here
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [rc, isSubmitted, isPaused]);

  if (!rc) {
    return <div className="p-8 text-center">RC not found</div>;
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionKey: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [rc.questions[currentQuestionIdx].id]: optionKey
    }));
  };

  const calculateScore = () => {
    let score = 0;
    rc.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const currentQuestion = rc.questions[currentQuestionIdx];
  const hasAnsweredCurrent = !!answers[currentQuestion.id];
  const allAnswered = rc.questions.every(q => !!answers[q.id]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <div className="font-semibold text-neutral-900">
            Question {currentQuestionIdx + 1} of {rc.questions.length}
          </div>
          
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-2 font-mono font-medium px-3 py-1.5 rounded-md",
              timeLeft < 60 ? "bg-error/10 text-error" : "bg-neutral-100 text-neutral-700"
            )}>
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
            {!isSubmitted && (
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 transition-colors"
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row relative">
        
        {/* Left Panel: Passage */}
        <div className="md:w-1/2 md:border-r border-neutral-200 bg-white md:h-[calc(100vh-3.5rem)] md:overflow-y-auto overflow-hidden relative">
          {isPaused && !isSubmitted ? (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Paused</h3>
                <Button onClick={() => setIsPaused(false)}>Resume Reading</Button>
              </div>
            </div>
          ) : null}
          
          <div className="p-6 md:p-8 lg:p-10">
            <div className="mb-6 flex flex-wrap gap-2 items-center">
              <Badge variant="outline" className="text-xs font-mono bg-neutral-50">{rc.wordCount} words</Badge>
              <Badge variant="outline" className="text-xs">{rc.topicCategory}</Badge>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 font-heading tracking-tight leading-tight">
              {rc.title}
            </h1>
            
            <div className="passage-text text-neutral-800 space-y-6">
              {rc.passage.split('\\n\\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Questions */}
        <div className="md:w-1/2 bg-neutral-50 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto flex flex-col">
          {isSubmitted ? (
            <div className="p-6 md:p-8 space-y-6">
              {/* Results Summary */}
              <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-primary-500">
                    {calculateScore()}/{rc.questions.length}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mb-1">Passage Completed</h2>
                <p className="text-neutral-500 mb-6">You took {formatTime((rc.estimatedTimeMinutes * 60) - timeLeft)}</p>
                <div className="flex gap-2">
                  {rc.questions.map((q, idx) => {
                    const correct = answers[q.id] === q.correctAnswer;
                    return (
                      <button 
                        key={q.id}
                        onClick={() => setCurrentQuestionIdx(idx)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-medium border-2 transition-all",
                          currentQuestionIdx === idx ? "border-primary-500 ring-2 ring-primary-100" : "border-transparent",
                          correct ? "bg-success/10 text-success" : "bg-error/10 text-error"
                        )}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanations */}
              <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="uppercase tracking-wider text-[10px]">
                    {currentQuestion.questionType.replace('_', ' ')}
                  </Badge>
                  {answers[currentQuestion.id] === currentQuestion.correctAnswer ? (
                    <span className="flex items-center text-success text-sm font-semibold gap-1"><CheckCircle2 className="w-4 h-4"/> Correct</span>
                  ) : (
                    <span className="flex items-center text-error text-sm font-semibold gap-1"><XCircle className="w-4 h-4"/> Incorrect</span>
                  )}
                </div>
                
                <h3 className="text-lg font-medium text-neutral-900 mb-6 question-text">
                  Q{currentQuestionIdx + 1}. {currentQuestion.questionText}
                </h3>

                <div className="space-y-3 mb-8">
                  {Object.entries(currentQuestion.options).map(([key, text]) => {
                    const isSelected = answers[currentQuestion.id] === key;
                    const isCorrect = key === currentQuestion.correctAnswer;
                    
                    return (
                      <div 
                        key={key}
                        className={cn(
                          "p-4 rounded-lg border-2 flex items-start gap-3",
                          isCorrect ? "border-success bg-success/5" : 
                          isSelected && !isCorrect ? "border-error bg-error/5" : "border-neutral-100 bg-white opacity-60"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded flex items-center justify-center shrink-0 font-bold text-sm",
                          isCorrect ? "bg-success text-white" : 
                          isSelected && !isCorrect ? "bg-error text-white" : "bg-neutral-200 text-neutral-500"
                        )}>
                          {key}
                        </div>
                        <div className="flex-1 text-sm md:text-base">{text}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-primary-50/50 rounded-lg p-5 border border-primary-100 space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary-800 flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-success" /> Why {currentQuestion.correctAnswer} is correct:
                    </h4>
                    <p className="text-sm text-neutral-700 leading-relaxed">{currentQuestion.explanation.whyCorrect}</p>
                  </div>
                  
                  {currentQuestion.explanation.commonTrap && (
                    <div>
                      <h4 className="font-semibold text-warning flex items-center gap-2 mb-1">
                        <AlertCircle className="w-4 h-4" /> Common Trap:
                      </h4>
                      <p className="text-sm text-neutral-700 leading-relaxed">{currentQuestion.explanation.commonTrap}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-6 md:p-8 flex-1">
                <div className="mb-4 flex items-center justify-between">
                  <Badge variant="secondary" className="uppercase tracking-wider text-[10px] bg-neutral-200/50">
                    {currentQuestion.questionType.replace('_', ' ')}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-medium text-neutral-900 mb-8 question-text">
                  Q{currentQuestionIdx + 1}. {currentQuestion.questionText}
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(currentQuestion.options).map(([key, text]) => {
                    const isSelected = answers[currentQuestion.id] === key;
                    return (
                      <label 
                        key={key}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group hover:shadow-md",
                          isSelected 
                            ? "border-primary-500 bg-primary-50/50 shadow-sm" 
                            : "border-neutral-200 bg-white hover:border-primary-200 hover:bg-neutral-50"
                        )}
                      >
                        <div className="flex items-center h-6">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            isSelected ? "border-primary-500" : "border-neutral-300 group-hover:border-primary-300"
                          )}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                          </div>
                        </div>
                        <span className={cn(
                          "flex-1 text-base md:text-[17px] leading-relaxed transition-colors",
                          isSelected ? "text-primary-900 font-medium" : "text-neutral-700"
                        )}>
                          <span className="font-semibold mr-2 text-neutral-400 group-hover:text-primary-400">{key}.</span> 
                          {text}
                        </span>
                        <input 
                          type="radio" 
                          name={currentQuestion.id} 
                          value={key} 
                          className="sr-only"
                          checked={isSelected}
                          onChange={() => handleOptionSelect(key)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              
              {/* Bottom Navigation Bar */}
              <div className="p-6 bg-white border-t border-neutral-200 flex items-center justify-between shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.05)]">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="font-medium px-6"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Previous
                </Button>
                
                <div className="hidden md:flex gap-2">
                  {rc.questions.map((q, idx) => (
                    <div 
                      key={q.id} 
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all",
                        answers[q.id] ? "bg-primary-500" : "bg-neutral-200",
                        currentQuestionIdx === idx && "ring-4 ring-primary-100"
                      )}
                    />
                  ))}
                </div>

                {currentQuestionIdx < rc.questions.length - 1 ? (
                  <Button 
                    size="lg"
                    onClick={() => setCurrentQuestionIdx(prev => Math.min(rc.questions.length - 1, prev + 1))}
                    className="font-medium px-6 bg-neutral-900 hover:bg-neutral-800 text-white"
                  >
                    Next <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                ) : (
                  <Button 
                    size="lg"
                    onClick={() => setIsSubmitted(true)}
                    disabled={!allAnswered}
                    className="font-medium px-8 bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20"
                  >
                    Submit Answers
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
