import React, { useState } from 'react';
import { ChevronLeft, Flame, Coins, Bell, Check, Book, Star, CheckCircle, Trophy, Target } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { NotificationsMenu } from '../components/NotificationsMenu';

interface AchievementsTabProps {
  setActiveTab: (tab: string) => void;
}

export const AchievementsTab: React.FC<AchievementsTabProps> = ({ setActiveTab }) => {
  const { language, user, userXP } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Calculate level based on XP (e.g., 1000 XP per level)
  const currentLevel = Math.floor(userXP / 1000) + 1;
  const xpToNextLevel = 1000 - (userXP % 1000);
  const progressPercentage = ((userXP % 1000) / 1000) * 100; // 0 to 100

  const streak = user?.streak || 0;
  const days = [
    { label: 'Mo', active: streak > 6 },
    { label: 'Tu', active: streak > 5 },
    { label: 'We', active: streak > 4 },
    { label: 'Th', active: streak > 3 },
    { label: 'Fr', active: streak > 2 },
    { label: 'Sa', active: streak > 1 },
    { label: 'Su', active: streak > 0 }
  ];

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F8FAFC' }}>
      
      {/* Custom Header for Achievements */}
      <header style={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '16px 20px', background: 'white', borderBottom: '1px solid var(--border-light)',
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => setActiveTab('home')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <ChevronLeft size={24} color="#334155" />
          </button>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>
            {language === 'EN' ? 'Achievements & XP' : 'ಸಾಧನೆಗಳು ಮತ್ತು XP'}
          </h2>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', padding: '6px 12px', borderRadius: '20px', color: '#D97706', fontWeight: 700, fontSize: '0.8rem' }}>
            <Flame size={14} fill="#D97706" color="#D97706" /> {streak}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', padding: '6px 12px', borderRadius: '20px', color: '#D97706', fontWeight: 700, fontSize: '0.8rem' }}>
            <Coins size={14} fill="#F59E0B" color="#F59E0B" /> {userXP}
          </div>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ position: 'relative', marginLeft: '4px', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
            >
              <Bell size={20} color="#94A3B8" />
              <div style={{ position: 'absolute', top: -2, right: -2, width: '10px', height: '10px', background: '#EF4444', borderRadius: '50%', border: '2px solid white' }}></div>
            </button>

            {showNotifications && (
              <NotificationsMenu onClose={() => setShowNotifications(false)} />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Total XP Card (Purple) */}
        <div style={{ 
          background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
          borderRadius: '24px', padding: '32px 24px',
          color: 'white', textAlign: 'center',
          boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.4)'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '8px', fontWeight: 500 }}>
            {language === 'EN' ? 'Total Experience Points' : 'ಒಟ್ಟು ಅನುಭವದ ಅಂಕಗಳು'}
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-1px' }}>
            {userXP.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '24px' }}>
            {language === 'EN' ? `Level ${currentLevel} • ${xpToNextLevel.toLocaleString()} XP to next level` : `ಹಂತ ${currentLevel} • ಮುಂದಿನ ಹಂತಕ್ಕೆ ${xpToNextLevel.toLocaleString()} XP`}
          </div>
          
          {/* Progress Bar */}
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercentage}%`, height: '100%', background: 'white', borderRadius: '4px' }}></div>
          </div>
        </div>

        {/* Streak Card (Beige) */}
        <div style={{ 
          background: 'linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%)',
          borderRadius: '24px', padding: '24px',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(251, 146, 60, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ 
                width: '64px', height: '64px', background: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)', 
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(234, 88, 12, 0.3)'
              }}>
                <Flame size={32} fill="white" color="white" />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#9A3412', lineHeight: 1.2 }}>{streak}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#B45309' }}>{language === 'EN' ? 'Day Streak!' : 'ದಿನದ ಸ್ಟ್ರೀಕ್!'}</div>
                <div style={{ fontSize: '0.8rem', color: '#D97706', marginTop: '4px' }}>
                  {language === 'EN' ? 'Keep learning every day!' : 'ಪ್ರತಿದಿನ ಕಲಿಯುತ್ತಲೇ ಇರಿ!'}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 600, marginBottom: '6px' }}>
                {language === 'EN' ? 'Best: 21 days' : 'ಅತ್ಯುತ್ತಮ: 21 ದಿನಗಳು'}
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.7)', padding: '4px 8px', borderRadius: '12px',
                display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem',
                color: '#9A3412', fontWeight: 700
              }}>
                🏆 {language === 'EN' ? 'Week Warrior' : 'ವಾರದ ಯೋಧ'}
              </div>
            </div>
          </div>

          {/* Week Bubbles */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px' }}>
            {days.map((day, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: day.active ? '#F59E0B' : 'rgba(255,255,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: day.active ? 'white' : '#9CA3AF'
                }}>
                  {day.active ? <Check size={16} strokeWidth={3} /> : null}
                </div>
                <span style={{ fontSize: '0.7rem', color: day.active ? '#B45309' : '#9CA3AF', fontWeight: 600 }}>{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Journey Timeline */}
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', marginBottom: '16px' }}>
            {language === 'EN' ? 'Learning Journey' : 'ಕಲಿಕೆಯ ಪಯಣ'}
          </h3>
          
          <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            
            {/* Timeline Item 1 */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '20px', top: '40px', bottom: '-32px', width: '2px', background: '#E2E8F0' }}></div>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', background: '#DCFCE7', 
                border: '2px solid #22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2
              }}>
                <span style={{ fontSize: '1.2rem' }}>🌱</span>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '1rem' }}>{language === 'EN' ? 'Beginner' : 'ಆರಂಭಿಕ'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{language === 'EN' ? 'Completed first 5 lessons' : 'ಮೊದಲ 5 ಪಾಠಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ'}</div>
                </div>
                <div style={{ background: '#DCFCE7', color: '#16A34A', padding: '4px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={12} /> {language === 'EN' ? 'Done' : 'ಮುಗಿದಿದೆ'}
                </div>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '20px', top: '40px', bottom: '-32px', width: '2px', background: '#E2E8F0' }}></div>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', background: '#E0E7FF', 
                border: '2px solid #6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2
              }}>
                <Book size={20} color="#6366F1" />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '1rem' }}>{language === 'EN' ? 'Learner' : 'ಕಲಿಯುವವನು'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{language === 'EN' ? 'Mastered 10 chapters' : '10 ಅಧ್ಯಾಯಗಳನ್ನು ಕರಗತ ಮಾಡಿಕೊಂಡಿದ್ದಾರೆ'}</div>
                </div>
                <div style={{ background: '#DCFCE7', color: '#16A34A', padding: '4px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={12} /> {language === 'EN' ? 'Done' : 'ಮುಗಿದಿದೆ'}
                </div>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', background: '#FEF9C3', 
                border: '2px solid #EAB308', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2
              }}>
                <Star size={20} color="#EAB308" fill="#EAB308" />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '1rem' }}>{language === 'EN' ? 'Scholar' : 'ವಿದ್ವಾಂಸ'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{language === 'EN' ? 'Score 80%+ consistently' : 'ನಿರಂತರವಾಗಿ 80%+ ಸ್ಕೋರ್ ಮಾಡಿ'}</div>
                </div>
                <div style={{ background: '#EFF6FF', color: '#3B82F6', padding: '4px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700 }}>
                  {language === 'EN' ? 'In Progress' : 'ಪ್ರಗತಿಯಲ್ಲಿದೆ'}
                </div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};
