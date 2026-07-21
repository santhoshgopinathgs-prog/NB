import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Building2, Users, UserCheck, BookOpen, AlertCircle, TrendingUp, 
  BarChart2, Award, Bot, Download, Send, Bell, Settings, ShieldCheck, 
  Sparkles, CheckCircle2, ChevronRight, Activity, Calendar, LogOut
} from 'lucide-react';

interface TeacherItem {
  id: string;
  name: string;
  subject: string;
  classes: string;
  performance: number;
  attendance: number;
  quizzesCreated: number;
  trainingNeeded: boolean;
}

const MOCK_TEACHERS: TeacherItem[] = [
  { id: 't1', name: 'Mrs. Suma', subject: 'Mathematics & Science', classes: 'Class 8-A, 9-B', performance: 94, attendance: 98, quizzesCreated: 14, trainingNeeded: false },
  { id: 't2', name: 'Mr. Prakash Rao', subject: 'English & Social', classes: 'Class 8-B, 10-A', performance: 88, attendance: 95, quizzesCreated: 9, trainingNeeded: false },
  { id: 't3', name: 'Ms. Roopa K', subject: 'Digital Skills & Physics', classes: 'Class 9-A, 10-B', performance: 96, attendance: 100, quizzesCreated: 18, trainingNeeded: false },
  { id: 't4', name: 'Mr. Nagesh B', subject: 'Kannada Literature', classes: 'Class 8-A, 8-B', performance: 76, attendance: 89, quizzesCreated: 4, trainingNeeded: true }
];

export const PrincipalDashboard: React.FC = () => {
  const { language, user, setUserRole, logout } = useAppContext();
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'analytics' | 'teachers' | 'classes' | 'dropout' | 'ai' | 'announcements' | 'reports'>('overview');

  const handlePrincipalLogout = () => {
    setUserRole('student');
    logout();
  };

  // Announcement modal state
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementTarget, setAnnouncementTarget] = useState<'all' | 'teachers' | 'parents' | 'students'>('all');
  const [announcementText, setAnnouncementText] = useState('');

  // AI Assistant Chat state
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState<Array<{ role: 'user' | 'assistant', text: string }>>([
    { role: 'assistant', text: language === 'EN' ? 'Greetings Principal Dr. Ramesh Kumar! I am your AI Executive School Advisor. How may I assist your administration today?' : 'ನಮಸ್ತೆ ಪ್ರಾಂಶುಪಾಲರಾದ ಡಾ. ರಮೇಶ್ ಕುಮಾರ್! ನಾನು ನಿಮ್ಮ AI ಶಾಲಾ ಕಾರ್ಯನಿರ್ವಾಹಕ ಸಲಹೆಗಾರ. ಇಂದು ಶಾಲಾ ನಿರ್ವಹಣೆಯಲ್ಲಿ ನಾನು ಹೇಗೆ ನೆರವಾಗಲಿ?' }
  ]);

  const handleSendAi = (textToSend?: string) => {
    const prompt = textToSend || aiInput;
    if (!prompt.trim()) return;

    const newChat = [...aiChat, { role: 'user' as const, text: prompt }];
    setAiChat(newChat);
    if (!textToSend) setAiInput('');

    setTimeout(() => {
      let reply = "Here is the school administrative insight:";
      if (prompt.includes('attention') || prompt.includes('class')) {
        reply = "🏫 Class 8-B requires academic attention. Math average is 72% (vs 84% school avg). Recommended intervention: Assign Mrs. Suma for 2 hours weekly peer mentoring.";
      } else if (prompt.includes('teacher') || prompt.includes('support')) {
        reply = "👩‍🏫 Mr. Nagesh B has created 4 quizzes (vs 14 avg). Recommending a 30-minute Digital Tool Orientation session.";
      } else if (prompt.includes('board') || prompt.includes('readiness')) {
        reply = "🎓 Board Exam Readiness Index: 88.4% for Class 10. 46 out of 52 students are currently in the Distinction/First Class band.";
      } else if (prompt.includes('report')) {
        reply = "📄 Monthly GHPS Anekal School Report (July 2026) compiled! Overall Health Score: 92/100. Ready for Block Education Officer (BEO) export.";
      } else {
        reply = "📊 Digital Adoption across GHPS Anekal is 88%. Student active practice hours increased by 18% this month!";
      }
      setAiChat(prev => [...prev, { role: 'assistant', text: reply }]);
    }, 600);
  };

  return (
    <div className="principal-dashboard animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Principal Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 12px 30px rgba(15,23,42,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ background: 'rgba(255,255,255,0.15)', color: '#38BDF8', padding: '4px 12px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 800, width: 'fit-content', marginBottom: '8px' }}>
              🏫 Executive Principal Dashboard • GHPS Anekal
            </div>
            <h1 style={{ fontSize: '1.65rem', margin: 0, fontWeight: 900 }}>
              {user?.name || 'Principal'}
            </h1>
            <p style={{ margin: '4px 0 0 0', opacity: 0.85, fontSize: '0.92rem' }}>
              Karnataka Government High School Anekal • BEO Office Region: Bengaluru South
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid #10B981', padding: '10px 16px', borderRadius: '16px', color: '#34D399', fontWeight: 900, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} /> School Health Score: 92/100
            </div>
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              style={{ background: '#38BDF8', color: '#0F172A', border: 'none', padding: '10px 16px', borderRadius: '16px', fontWeight: 900, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Bell size={18} /> Broadcast Announcement
            </button>
            <button 
              onClick={handlePrincipalLogout}
              style={{ background: '#EF4444', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '16px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}
              title="Logout Principal Account"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'overview', label: 'School Overview', icon: Building2 },
          { id: 'analytics', label: 'School Analytics', icon: BarChart2 },
          { id: 'teachers', label: 'Teacher Management', icon: Users },
          { id: 'classes', label: 'Class Monitoring', icon: Activity },
          { id: 'dropout', label: 'Dropout Risk AI', icon: AlertCircle },
          { id: 'ai', label: 'AI Principal Advisor', icon: Bot },
          { id: 'reports', label: 'Board & School Reports', icon: Download }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              style={{
                padding: '10px 16px',
                borderRadius: '20px',
                border: 'none',
                background: isActive ? '#0F172A' : 'var(--bg-surface)',
                color: isActive ? 'white' : 'var(--text-secondary)',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 12px rgba(15,23,42,0.3)' : 'var(--shadow-sm)',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SCHOOL OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Key School Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #2563EB' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>Total Teachers</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '4px' }}>18</div>
              <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, marginTop: '4px' }}>100% Present Today</div>
            </div>

            <div className="card" style={{ padding: '20px', borderTop: '4px solid #10B981' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>Total Students</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '4px' }}>520</div>
              <div style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, marginTop: '4px' }}>Classes 8, 9 & 10</div>
            </div>

            <div className="card" style={{ padding: '20px', borderTop: '4px solid #F59E0B' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>Attendance Today</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '4px' }}>94.2%</div>
              <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, marginTop: '4px' }}>+1.8% vs District Avg</div>
            </div>

            <div className="card" style={{ padding: '20px', borderTop: '4px solid #8B5CF6' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>Digital Adoption</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '4px' }}>88%</div>
              <div style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: 700, marginTop: '4px' }}>Namma Buddy Active</div>
            </div>
          </div>

          {/* Interactive School Analytics Visualization */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem', fontWeight: 900 }}>Class Performance & Attendance Comparison</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { className: 'Class 10-A (Board Track)', attendance: 97, performance: 91, color: '#10B981' },
                { className: 'Class 9-A (Science Special)', attendance: 95, performance: 88, color: '#2563EB' },
                { className: 'Class 8-A (Digital Skills)', attendance: 93, performance: 84, color: '#8B5CF6' },
                { className: 'Class 8-B (General Track)', attendance: 88, performance: 72, color: '#F59E0B' }
              ].map((cls, idx) => (
                <div key={idx} style={{ padding: '14px', background: 'var(--bg-app)', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
                    <span>{cls.className}</span>
                    <span style={{ color: cls.color }}>Avg Marks: {cls.performance}% • Attendance: {cls.attendance}%</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: 'var(--border-light)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ width: `${cls.performance}%`, height: '100%', background: cls.color, borderRadius: '5px', transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TEACHER MANAGEMENT */}
      {activeSubTab === 'teachers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 900 }}>GHPS Anekal Faculty Roster</h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-tertiary)' }}>
                    <th style={{ padding: '12px 10px' }}>Teacher Name</th>
                    <th style={{ padding: '12px 10px' }}>Subject & Classes</th>
                    <th style={{ padding: '12px 10px' }}>Quizzes Created</th>
                    <th style={{ padding: '12px 10px' }}>Rating / Rating</th>
                    <th style={{ padding: '12px 10px' }}>Training Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TEACHERS.map(t => (
                    <tr key={t.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 900 }}>{t.name}</td>
                      <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>{t.subject} ({t.classes})</td>
                      <td style={{ padding: '12px 10px', fontWeight: 800, color: '#2563EB' }}>{t.quizzesCreated} Quizzes</td>
                      <td style={{ padding: '12px 10px', fontWeight: 800, color: '#10B981' }}>{t.performance}%</td>
                      <td style={{ padding: '12px 10px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 800, background: t.trainingNeeded ? '#FEF3C7' : '#D1FAE5', color: t.trainingNeeded ? '#B45309' : '#047857' }}>
                          {t.trainingNeeded ? '⚠️ Workshop Recommended' : '✓ Certified'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI PRINCIPAL ADVISOR */}
      {activeSubTab === 'ai' && (
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
            <Bot size={28} color="#0F172A" />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900 }}>AI Principal Executive Advisor</h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>School Performance Forecasting & Policy Guidance</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              "Which class needs attention?",
              "Which teacher requires support?",
              "Predict board exam readiness",
              "Generate monthly school report"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendAi(chip)}
                style={{ background: '#F1F5F9', color: '#0F172A', border: '1px solid #CBD5E1', padding: '6px 12px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                🏛️ {chip}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
            {aiChat.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '14px 18px',
                  borderRadius: '18px',
                  background: msg.role === 'user' ? '#0F172A' : 'var(--bg-app)',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  lineHeight: 1.5
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Ask AI Principal Advisor anything..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAi()}
              style={{ flex: 1, padding: '14px', borderRadius: '16px', border: '1.5px solid var(--border-light)', fontSize: '0.95rem' }}
            />
            <button
              onClick={() => handleSendAi()}
              style={{ background: '#0F172A', color: 'white', border: 'none', padding: '0 20px', borderRadius: '16px', fontWeight: 800, cursor: 'pointer' }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: REPORTS & ANNOUNCEMENTS */}
      {(activeSubTab === 'reports' || activeSubTab === 'announcements' || activeSubTab === 'classes' || activeSubTab === 'dropout') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 900 }}>Official School Compliance Exports</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {[
                { title: 'Full School Academic Report', desc: 'Classes 8-10 performance summary', type: 'PDF' },
                { title: 'Teacher Performance Digest', desc: 'Faculty evaluation & quiz logs', type: 'Excel' },
                { title: 'BEO Inspection Compliance', desc: 'Attendance & digital adoption index', type: 'PDF' },
                { title: 'SSLC Board Exam Readiness', desc: 'Class 10 predicted scoring band', type: 'PDF' }
              ].map((rep, idx) => (
                <div key={idx} style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontWeight: 800, fontSize: '0.95rem' }}>{rep.title}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: '12px' }}>{rep.desc}</div>
                  <button 
                    onClick={() => alert(`Generated ${rep.title} (${rep.type})`)}
                    style={{ width: '100%', padding: '8px', background: '#0F172A', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Download size={14} /> Export ({rep.type})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Announcement Modal */}
      {showAnnouncementModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card animate-slide-up" style={{ width: '100%', maxWidth: '500px', padding: '24px', position: 'relative' }}>
            <button onClick={() => setShowAnnouncementModal(false)} style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>✖</button>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 900 }}>Broadcast School Announcement</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 800 }}>Target Audience</label>
                <select value={announcementTarget} onChange={(e) => setAnnouncementTarget(e.target.value as any)} style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1.5px solid var(--border-light)', marginTop: '4px' }}>
                  <option value="all">Entire School (Teachers, Students & Parents)</option>
                  <option value="teachers">Faculty Teachers Only</option>
                  <option value="parents">Parents Only</option>
                  <option value="students">Students Only</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 800 }}>Announcement Message (English & Kannada)</label>
                <textarea 
                  rows={4}
                  placeholder="e.g. Mid-term examinations commence next Monday..."
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1.5px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
                />
              </div>

              <button 
                onClick={() => { setShowAnnouncementModal(false); alert('Announcement Broadcasted Successfully!'); }}
                style={{ marginTop: '12px', padding: '14px', background: '#0F172A', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 900, cursor: 'pointer' }}
              >
                Send Broadcast Notification
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
