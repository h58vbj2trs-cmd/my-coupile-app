
import React, { useState, useEffect } from 'react';
import { PetState } from '../types';
import { getPetMessage } from '../services/geminiService';

interface Props { pet: PetState; onAction: (a: 'FEED' | 'PLAY') => void; }

const PetRoom: React.FC<Props> = ({ pet, onAction }) => {
  const [msg, setMsg] = useState('주인님들 안녕!');

  useEffect(() => {
    getPetMessage(pet.hunger, pet.happiness, pet.level).then(setMsg);
  }, [pet.level]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-[#FDFBF9]">
      <div className="w-full flex justify-between items-start mb-12">
        <div>
          <h2 className="font-round text-2xl text-gray-700">LV.{pet.level}</h2>
          <div className="w-24 h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#FF9E9E]" style={{width: `${pet.hunger}%`}} />
          </div>
        </div>
        <p className="font-round text-gray-300 italic">EXP {pet.exp}</p>
      </div>

      <div className="text-center mb-10">
        <p className="font-round text-xl text-gray-400 italic">"{msg}"</p>
      </div>

      <div className="w-48 h-48 bg-white rounded-full shadow-sm flex items-center justify-center relative animate-bounce duration-[2000ms]">
        <div className="text-6xl">🐣</div>
        <div className="absolute -bottom-2 w-24 h-4 bg-black/5 rounded-full blur-md" />
      </div>

      <div className="flex space-x-4 mt-20">
        <button onClick={() => onAction('FEED')} className="px-8 py-3 bg-white border border-gray-100 rounded-2xl font-round text-gray-500 shadow-sm">밥주기 🍎</button>
        <button onClick={() => onAction('PLAY')} className="px-8 py-3 bg-white border border-gray-100 rounded-2xl font-round text-gray-500 shadow-sm">놀아주기 🎾</button>
      </div>
    </div>
  );
};

export default PetRoom;
