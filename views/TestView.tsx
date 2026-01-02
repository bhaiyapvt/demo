
import React, { useState, useEffect } from 'react';
import { OnlineTest } from '../types';
import { Timer, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TestViewProps {
  test: OnlineTest;
  onComplete: () => void;
}

const TestView: React.FC<TestViewProps> = ({ test, onComplete }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(test.durationMinutes * 60);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (optionIdx: number) => {
    setAnswers({ ...answers, [test.questions[currentQuestionIdx].id]: optionIdx });
  };

  const calculateScore = () => {
    let score = 0;
    test.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  if (isFinished) {
    const finalScore = calculateScore();
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2">टेस्ट समाप्त!</h2>
        <p className="text-gray-600 mb-8">आपका परिणाम नीचे दिया गया है:</p>
        
        <div className="flex justify-around mb-8">
          <div className="bg-gray-50 p-4 rounded-xl flex-1 mx-2">
            <span className="block text-2xl font-black text-orange-600">{finalScore}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase">सही उत्तर</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl flex-1 mx-2">
            <span className="block text-2xl font-black text-gray-800">{test.questions.length}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase">कुल प्रश्न</span>
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200"
        >
          डैशबोर्ड पर वापस जाएँ
        </button>
      </div>
    );
  }

  const currentQ = test.questions[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / test.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border sticky top-20 z-40">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-gray-400">Question {currentQuestionIdx + 1}/{test.questions.length}</span>
        </div>
        <div className={`flex items-center font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-800'}`}>
          <Timer size={18} className="mr-1" />
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
        <div className="bg-orange-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border min-h-[400px] flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-8 leading-relaxed">
          {currentQ.question}
        </h3>

        <div className="space-y-4 flex-grow">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center ${
                answers[currentQ.id] === idx 
                ? 'border-orange-500 bg-orange-50 font-bold' 
                : 'border-gray-100 hover:border-orange-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 text-sm ${
                answers[currentQ.id] === idx ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-300'
              }`}>
                {String.fromCharCode(65 + idx)}
              </div>
              {option}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-12">
          <button 
            disabled={currentQuestionIdx === 0}
            onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
            className="text-gray-400 disabled:opacity-30 font-bold"
          >
            Previous
          </button>
          {currentQuestionIdx === test.questions.length - 1 ? (
            <button 
              onClick={() => setIsFinished(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-md"
            >
              Submit Test
            </button>
          ) : (
            <button 
              onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
              className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold"
            >
              Next
            </button>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex items-start text-xs text-yellow-800 leading-relaxed">
        <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
        <div>
          <span className="font-bold">Warning:</span> Do not minimize the app or switch windows. Doing so may auto-submit your exam.
        </div>
      </div>
    </div>
  );
};

export default TestView;
