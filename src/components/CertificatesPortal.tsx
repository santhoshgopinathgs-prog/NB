import React from 'react';
import { useAppContext } from '../context/AppContext';
import { mockQuizzes } from '../data/mockData';

export const CertificatesPortal = ({ onClose }: { onClose: () => void }) => {
  const { language, completedQuizzes } = useAppContext();

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#120F0D', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: '#1B1714', borderBottom: '1px solid #332B24' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', fontSize: '1.5rem', color: '#FFFFFF' }}>
          ←
        </button>
        <h2 style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>{language === 'EN' ? 'My Certificates' : 'ನನ್ನ ಪ್ರಮಾಣಪತ್ರಗಳು'}</h2>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        
        {completedQuizzes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#E5DDD0' }}>
            <div style={{ width: '80px', height: '80px', background: '#231E19', border: '1px solid #332B24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2.5rem' }}>
              🔒
            </div>
            <h3 style={{ color: '#FFFFFF' }}>No certificates yet!</h3>
            <p style={{ marginTop: '8px', color: '#A69685' }}>Complete a practice quiz or chapter to earn your first certificate.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {completedQuizzes.map(quizId => {
              const quizInfo = mockQuizzes.find(q => q.id === quizId);
              if (!quizInfo) return null;
              
              const title = language === 'EN' ? quizInfo.title : quizInfo.title_kn;
              const subject = language === 'EN' ? quizInfo.subject : quizInfo.subject_kn;

              return (
                <div key={quizId} style={{ background: '#231E19', borderRadius: '24px', overflow: 'hidden', border: '1px solid #332B24', boxShadow: '0 10px 25px rgba(0,0,0,0.4)' }}>
                  <div style={{ background: 'linear-gradient(135deg, #fef08a, #eab308)', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#713f12' }}>
                    <div style={{ marginBottom: '16px', background: 'white', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src="/logo.jpg" alt="Logo" style={{ height: '64px', width: '64px', borderRadius: '50%' }} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', textAlign: 'center', marginBottom: '8px', fontWeight: 900 }}>Certificate of Completion</h3>
                    <p style={{ opacity: 0.9, fontWeight: 700 }}>Awarded for mastering</p>
                    <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginTop: '8px', fontWeight: 900 }}>{title}</h2>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1B1714' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#A69685', textTransform: 'uppercase', fontWeight: 700 }}>Subject</div>
                      <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{subject}</div>
                    </div>
                    <button style={{ padding: '10px 20px', background: '#FEF08A', borderRadius: '16px', fontWeight: 900, color: '#161310', border: 'none', cursor: 'pointer' }}>
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
