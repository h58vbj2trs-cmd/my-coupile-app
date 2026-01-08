
import React, { useState, useEffect } from 'react';
import { fetchDailyQuestion } from '../services/geminiService';

interface Props { onAnswered: () => void; }

const DailyQuestion: React.FC<Props> = ({ onAnswered }) => {
  const [question, setQuestion] = useState('질문을 가져오는 중...');
  const [answer, setAnswer] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    fetchDailyQuestion().then(setQuestion);
  }, []);

  const submit = () => {
    if (!answer) return;
    setIsDone(true);
    onAnswered();
  };

  return (
    <div className="p-10 h-full flex flex-col items-center justify-center">
      <div className="text-center space-y-8 w-full">
        <p className="font-round text-[#FF9E9E]">오늘의 질문</p>
        <h2 className="font-round text-3xl text-gray-700">"{question}"</h2>
        {!isDone ? (
          <div className="space-y-6">
            <textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="당신의 대답은?" className="w-full h-32 p-4 bg-white rounded-3xl border border-gray-100 font-round text-xl outline-none" />
            <button onClick={submit} className="w-full py-4 bg-[#FF9E9E] text-white rounded-2xl font-round text-xl shadow-lg shadow-rose-100">답변 완료</button>
          </div>
        ) : (
          <div className="p-8 bg-white rounded-3xl border border-rose-50 animate-in fade-in duration-1000">
            <p className="font-round text-[#FF9E9E] text-sm mb-2">상대방의 답변</p>
            <p className="font-round text-2xl text-gray-600 italic">"언제나 당신과 함께라면 행복해요."</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyQuestion;
