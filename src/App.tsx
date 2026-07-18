import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './tabs/HomeTab';
import { LearnTab } from './tabs/LearnTab';
import { PracticeTab } from './tabs/PracticeTab';
import { TopTab } from './tabs/TopTab';
import { ProfileTab } from './tabs/ProfileTab';
import { AchievementsTab } from './tabs/AchievementsTab';
import { RegistrationScreen } from './components/RegistrationScreen';
import { useAppContext } from './context/AppContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <RegistrationScreen />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab />;
      case 'learn': return <LearnTab />;
      case 'practice': return <PracticeTab />;
      case 'top': return <TopTab />;
      case 'profile': return <ProfileTab />;
      case 'achievements': return <AchievementsTab setActiveTab={setActiveTab} />;
      default: return <HomeTab />;
    }
  };

  return (
    <>
      {activeTab !== 'achievements' && <Header setActiveTab={setActiveTab} />}
      <main className="page-container" style={{ padding: activeTab === 'achievements' ? 0 : undefined }}>
        {renderTab()}
      </main>
      {activeTab !== 'achievements' && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </>
  );
}

export default AppContent;
