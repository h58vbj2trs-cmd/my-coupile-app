
import React, { useState, useEffect } from 'react';
import { Anniversary, ScheduleEvent } from '../types';
import { INITIAL_ANNIVERSARIES } from '../constants';

const Calendar: React.FC = () => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>(() => {
    const saved = localStorage.getItem('sweetheart_anniversaries');
    return saved ? JSON.parse(saved) : INITIAL_ANNIVERSARIES;
  });

  const calculateDDay = (date: string) => {
    const diff = new Date(date).getTime() - new Date().setHours(0,0,0,0);
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? 'D-Day' : days > 0 ? `D-${days}` : `D+${Math.abs(days) + 1}`;
  };

  return (
    <div className="p-8 h-full">
      <h1 className="font-round text-3xl text-gray-800 pt-12 mb-8">우리의 기념일</h1>
      <div className="space-y-4">
        {anniversaries.map(a => (
          <div key={a.id} className="p-6 bg-white rounded-3xl border border-gray-50 flex justify-between items-center">
            <div>
              <p className="font-round text-2xl text-gray-700">{a.title}</p>
              <p className="font-round text-sm text-gray-300">{a.date}</p>
            </div>
            <p className="font-round text-3xl text-[#FF9E9E]">{calculateDDay(a.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
