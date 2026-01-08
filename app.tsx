
import React, { useState } from 'react';
import { TabType, PetState } from './types';
import Feed from './components/Feed';
import Calendar from './components/Calendar';
import DailyQuestion from './components/DailyQuestion';
import PetRoom from './components/PetRoom';
import MiniGame from './components/MiniGame';
import BucketList from './components/BucketList';

const App: React.FC = () => {
  // 현재 보고 있는 화면 탭 상태
  const [activeTab, setActiveTab] = useState<TabType>('HOME');

  // 다마고치(캐릭터) 상태 관리 및 저장
  const [pet, setPet] = useState<PetState>(() => {
    const saved = localStorage.getItem('sweetheart_pet');
    return saved ? JSON.parse(saved) : {
      name: '모찌',
      level: 1,
      exp: 0,
      hunger: 70,
      happiness: 70,
      lastUpdated: new Date().toISOString()
    };
  });

  // 캐릭터 상태 업데이트 함수
  const updatePet = (newPet: PetState) => {
    setPet(newPet);
    localStorage.setItem('sweetheart_pet', JSON.stringify(newPet));
  };

  // 밥주기, 놀아주기 시 캐릭터 성장 로직
  const handlePetAction = (action: 'FEED' | 'PLAY') => {
    const newPet = { ...pet };
    if (action === 'FEED') {
      newPet.hunger = Math.min(100, newPet.hunger + 20);
    } else {
      newPet.happiness = Math.min(100, newPet.happiness + 20);
    }
    
    // 경험치 증가 및 레벨업
    newPet.exp += 30;
    if (newPet.exp >= newPet.level * 100) {
      newPet.exp -= newPet.level * 100;
      newPet.level += 1;
    }
    
    updatePet(newPet);
  };

  // 선택된 탭에 따라 화면 렌더링
  const renderContent = () => {
    switch (activeTab) {
      case 'HOME':
        return <PetRoom pet={pet} onAction={handlePetAction} />;
      case 'FEED':
        return <Feed />;
      case 'CALENDAR':
        return <Calendar />;
      case 'BUCKET':
        return <BucketList />;
      case 'QUESTION':
        return <DailyQuestion onAnswered={() => handlePetAction('PLAY')} />;
      case 'GAME':
        return <MiniGame onScore={() => handlePetAction('PLAY')} />;
      default:
        return <PetRoom pet={pet} onAction={handlePetAction} />;
    }
  };

  return (
    <div className="h-screen max-w-lg mx-auto bg-[#FDFBF9] flex flex-col relative overflow-hidden border-x border-gray-50 shadow-2xl">
      {/* 메인 화면 영역 */}
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
        
        {/* 달력/버킷리스트 전환 버튼 (특정 화면에서만 노출) */}
        {(activeTab === 'CALENDAR' || activeTab === 'BUCKET') && (
          <div className="absolute top-16 right-6 z-10">
            <button 
              onClick={() => setActiveTab(activeTab === 'CALENDAR' ? 'BUCKET' : 'CALENDAR')}
              className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-xs font-round text-[#FF9E9E] border border-rose-50 shadow-sm"
            >
              {activeTab === 'CALENDAR' ? '꿈 리스트 보기' : '기념일 보기'}
            </button>
          </div>
        )}
      </main>
      
      {/* 하단 네비게이션 바 */}
      <nav className="h-24 bg-white/80 backdrop-blur-xl border-t border-gray-50 flex justify-around items-center px-4 pb-4">
        <NavButton 
          active={activeTab === 'FEED'} 
          onClick={() => setActiveTab('FEED')} 
          label="기록" 
          icon="📸"
        />
        <NavButton 
          active={activeTab === 'QUESTION'} 
          onClick={() => setActiveTab('QUESTION')} 
          label="질문" 
          icon="💌"
        />
        
        {/* 중앙 홈 버튼 (다마고치) */}
        <div className="flex flex-col items-center -translate-y-4">
           <button 
            onClick={() => setActiveTab('HOME')} 
            className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all ${activeTab === 'HOME' ? 'bg-[#FF9E9E] text-white scale-110' : 'bg-white text-gray-300'}`}
          >
            🏠
          </button>
          <span className={`text-[10px] mt-1 font-round ${activeTab === 'HOME' ? 'text-[#FF9E9E]' : 'text-gray-300'}`}>우리집</span>
        </div>

        <NavButton 
          active={activeTab === 'GAME'} 
          onClick={() => setActiveTab('GAME')} 
          label="놀이" 
          icon="🎮"
        />
        <NavButton 
          active={activeTab === 'CALENDAR' || activeTab === 'BUCKET'} 
          onClick={() => setActiveTab('CALENDAR')} 
          label="기념일" 
          icon="🗓️"
        />
      </nav>
    </div>
  );
};

// 네비게이션 버튼 컴포넌트
interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, label, icon }) => (
  <button onClick={onClick} className="flex flex-col items-center space-y-1 w-12">
    <span className={`text-xl transition-all ${active ? 'scale-125 grayscale-0' : 'grayscale opacity-50'}`}>{icon}</span>
    <span className={`text-[10px] font-round transition-all ${active ? 'text-[#FF9E9E]' : 'text-gray-300'}`}>{label}</span>
  </button>
);

export default App;
