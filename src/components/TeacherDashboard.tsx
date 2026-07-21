import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Users, UserCheck, BookOpen, AlertTriangle, Search, Filter, 
  Plus, CheckCircle, FileText, Bot, Download, Award, TrendingUp, 
  Calendar, Send, Sparkles, PieChart, BarChart2, ShieldAlert, LogOut
} from 'lucide-react';

import { supabase } from '../utils/supabaseClient';
import { exportStudentsToCSV } from '../utils/exportToSheets';

import { COLLECTED_STUDENTS } from '../data/collectedStudents';

interface StudentData {
  id: string;
  name: string;
  rollNo: string;
  className: string;
  section: string;
  attendance: number;
  score: number;
  level: number;
  xp: number;
  badges: number;
  lastLogin: string;
  status: 'active' | 'needs_help' | 'inactive';
  parentName: string;
  parentPhone: string;
  strengths: string[];
  weaknesses: string[];
  aiRecommendation: string;
}

const INITIAL_COLLECTED_STUDENTS: StudentData[] = COLLECTED_STUDENTS.map((s, idx) => ({
  id: s.id,
  name: s.name,
  rollNo: s.rollNo || `80${idx + 1}`,
  className: `Class ${s.classLevel}`,
  section: 'A',
  attendance: s.attendance || 90,
  score: s.score || 75,
  level: s.level || 1,
  xp: s.points,
  badges: Math.max(1, Math.floor(s.points / 20)),
  lastLogin: 'Active Today',
  status: s.status || (s.points >= 50 ? 'active' : 'needs_help'),
  parentName: `${s.name.split(' ')[0]} Guardian`,
  parentPhone: '+91 98765 43210',
  strengths: ['Digital Skills', 'Mathematics'],
  weaknesses: ['English Grammar'],
  aiRecommendation: `Student from ${s.school}. ${s.points} XP collected.`
}));

export const TeacherDashboard: React.FC = () => {
  const { language, user, userXP, setUserRole, logout } = useAppContext();
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'students' | 'attendance' | 'assignments' | 'quizzes' | 'analytics' | 'ai' | 'reports'>('overview');
  const [students, setStudents] = useState<StudentData[]>(INITIAL_COLLECTED_STUDENTS);

  React.useEffect(() => {
    const fetchRealStudents = async () => {
      try {
        const { data: dbProfiles } = await supabase.from('profiles').select('*');
        const { data: dbProgress } = await supabase.from('user_progress').select('*');

        let combinedList: StudentData[] = [];

        if (dbProfiles && dbProfiles.length > 0) {
          const dbList: StudentData[] = dbProfiles.map((p, idx) => {
            const prog = dbProgress?.find(pr => pr.user_id === p.id);
            const xpVal = prog?.total_xp || (p.id === user?.id ? userXP : 60);
            return {
              id: p.id,
              name: p.name || 'Registered Student',
              rollNo: `80${idx + 1}`,
              className: p.class_level ? `Class ${p.class_level}` : 'Class 8',
              section: 'A',
              attendance: Math.min(100, 90 + (idx % 8)),
              score: Math.min(100, Math.max(55, Math.floor(xpVal / 15) + 65)),
              level: Math.floor(xpVal / 250) + 1,
              xp: xpVal,
              badges: Math.floor(xpVal / 200) + 1,
              lastLogin: 'Today, Active',
              status: xpVal > 40 ? ('active' as const) : ('needs_help' as const),
              parentName: `${p.name?.split(' ')[0] || 'Parent'} Guardian`,
              parentPhone: '+91 98765 43210',
              strengths: ['Digital Skills', 'Mathematics'],
              weaknesses: ['English Grammar'],
              aiRecommendation: `Active learner from ${p.school || 'GHPS Anekal'}.`
            };
          });

          const combined = [...dbList];
          for (const cs of INITIAL_COLLECTED_STUDENTS) {
            if (!combined.some(s => s.name.toLowerCase() === cs.name.toLowerCase())) {
              combined.push(cs);
            }
          }
          setStudents(combined);
        } else {
          setStudents(INITIAL_COLLECTED_STUDENTS);
        }
      } catch (err) {
        console.error('Error fetching registered students:', err);
      }
    };

    fetchRealStudents();
  }, [user, userXP]);

  const handleTeacherLogout = () => {
    setUserRole('student');
    logout();
  };
  
  // Search & Filter state for Students
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

  // Attendance Module state
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, 'present' | 'absent' | 'late'>>({
    's1': 'present', 's2': 'present', 's3': 'absent'
  });
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // Assignment Modal state
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [assignTitle, setAssignTitle] = useState('');
  const [assignSubject, setAssignSubject] = useState('Mathematics');
  const [assignClass, setAssignClass] = useState('Class 8');

  // Quiz Creator state
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);

  // AI Teacher Assistant Chat state
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState<Array<{ role: 'user' | 'assistant', text: string }>>([
    { role: 'assistant', text: language === 'EN' ? 'Namaste Teacher! I am your AI Teaching Assistant. How can I support your classroom today?' : 'ನಮಸ್ತೆ ಶಿಕ್ಷಕರೇ! ನಾನು ನಿಮ್ಮ AI ಬೋಧನಾ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?' }
  ]);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNo.includes(searchQuery);
    const matchesClass = filterClass === 'all' || s.className === filterClass;
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceRecords(prev => ({ ...prev, [studentId]: status }));
    setAttendanceSaved(false);
  };

  const handleSendAi = (textToSend?: string) => {
    const prompt = textToSend || aiInput;
    if (!prompt.trim()) return;

    const newChat = [...aiChat, { role: 'user' as const, text: prompt }];
    setAiChat(newChat);
    if (!textToSend) setAiInput('');

    setTimeout(() => {
      let reply = "Here is my recommendation for your class:";
      if (prompt.includes('behind') || prompt.includes('help')) {
        reply = "🔍 Based on current progress, Anil Naik (68% attendance) and Chetan M (45% attendance) need targeted support in Mathematics and Science. I recommend assigning 15-minute diagnostic flashcards.";
      } else if (prompt.includes('homework') || prompt.includes('assignment')) {
        reply = "📝 Homework Generated: 5 Practice Problems on Rational Numbers & Basic Equations for Class 8-A. Ready to publish to student portals!";
      } else if (prompt.includes('quiz')) {
        reply = "⚡ Quick 5-Question Science Quiz created on Matter & Energy! Includes MCQs with instant Kannada translation.";
      } else if (prompt.includes('Kannada') || prompt.includes('translate')) {
        reply = "🌐 Translated to Kannada: 'ದಯವಿಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳು ನಾಳೆ ಗಣಿತದ ಅಭ್ಯಾಸ 2.1 ನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ತರಬೇಕು.'";
      } else {
        reply = "✨ I have analyzed Class 8-A performance data. Overall accuracy is 84%, with highest engagement in Digital Skills!";
      }
      setAiChat(prev => [...prev, { role: 'assistant', text: reply }]);
    }, 600);
  };

  return (
    <div className="teacher-dashboard animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', color: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(37,99,235,0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '4px 12px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 800, width: 'fit-content', marginBottom: '8px' }}>
              👩‍🏫 Teacher Portal • GHPS Anekal
            </div>
            <h1 style={{ fontSize: '1.6rem', margin: 0, fontWeight: 900 }}>
              Welcome, {user?.name || 'Teacher'}
            </h1>
            <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '0.92rem' }}>
              Assigned Classes: <strong>Class 8-A & Class 9-B</strong> • Today: {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              onClick={() => setShowCreateAssignment(true)}
              style={{ background: '#10B981', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '16px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
            >
              <Plus size={18} /> New Assignment
            </button>
            <button 
              onClick={() => setShowCreateQuiz(true)}
              style={{ background: '#F59E0B', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '16px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(245,158,11,0.3)' }}
            >
              <Sparkles size={18} /> Create Quiz
            </button>
            <button 
              onClick={handleTeacherLogout}
              style={{ background: '#EF4444', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '16px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}
              title="Logout Teacher Account"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'students', label: 'Students Directory', icon: Users },
          { id: 'attendance', label: 'Attendance', icon: UserCheck },
          { id: 'assignments', label: 'Assignments', icon: FileText },
          { id: 'quizzes', label: 'Quizzes', icon: BookOpen },
          { id: 'analytics', label: 'Analytics', icon: BarChart2 },
          { id: 'ai', label: 'AI Assistant', icon: Bot },
          { id: 'reports', label: 'Reports & Export', icon: Download }
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
                background: isActive ? 'var(--accent-blue)' : 'var(--bg-surface)',
                color: isActive ? 'white' : 'var(--text-secondary)',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 12px rgba(37,99,235,0.25)' : 'var(--shadow-sm)',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderLeft: '5px solid #2563EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Total Students</span>
                <Users color="#2563EB" size={24} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '8px', color: 'var(--text-primary)' }}>45</div>
              <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, marginTop: '4px' }}>Class 8-A & 9-B</div>
            </div>

            <div className="card" style={{ padding: '20px', borderLeft: '5px solid #10B981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Present Today</span>
                <UserCheck color="#10B981" size={24} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '8px', color: 'var(--text-primary)' }}>42 / 45</div>
              <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, marginTop: '4px' }}>93.3% Attendance Rate</div>
            </div>

            <div className="card" style={{ padding: '20px', borderLeft: '5px solid #F59E0B' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Pending Assignments</span>
                <FileText color="#F59E0B" size={24} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '8px', color: 'var(--text-primary)' }}>3</div>
              <div style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700, marginTop: '4px' }}>Due this week</div>
            </div>

            <div className="card" style={{ padding: '20px', borderLeft: '5px solid #8B5CF6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Average Class Score</span>
                <Award color="#8B5CF6" size={24} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '8px', color: 'var(--text-primary)' }}>84%</div>
              <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, marginTop: '4px' }}>+4% from last month</div>
            </div>
          </div>

          {/* AI Attention Banner */}
          <div className="card" style={{ padding: '20px', background: '#FEF3C7', border: '2px solid #FCD34D', borderRadius: '20px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ background: '#F59E0B', color: 'white', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldAlert size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#92400E', fontWeight: 900 }}>AI Attention Alert: 2 Students Need Assistance</h4>
                <p style={{ margin: '6px 0 10px 0', fontSize: '0.88rem', color: '#78350F' }}>
                  <strong>Anil Naik</strong> (68% attendance) and <strong>Chetan M</strong> (45% attendance) have missed 3 consecutive practice tests.
                </p>
                <button 
                  onClick={() => setActiveSubTab('ai')}
                  style={{ background: '#D97706', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '12px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Ask AI Teacher Assistant →
                </button>
              </div>
            </div>
          </div>

          {/* Recent Student Activity Table Preview */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900 }}>Recent Student Submissions & Activity</h3>
              <button onClick={() => setActiveSubTab('students')} style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 800, cursor: 'pointer' }}>View All Students →</button>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-tertiary)' }}>
                    <th style={{ padding: '10px' }}>Student</th>
                    <th style={{ padding: '10px' }}>Class</th>
                    <th style={{ padding: '10px' }}>Score</th>
                    <th style={{ padding: '10px' }}>XP Points</th>
                    <th style={{ padding: '10px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 5).map((s: StudentData) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 800, color: 'var(--text-primary)' }}>{s.name}</td>
                      <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>{s.className}-{s.section}</td>
                      <td style={{ padding: '12px 10px', fontWeight: 800, color: s.score >= 80 ? '#10B981' : '#F59E0B' }}>{s.score}%</td>
                      <td style={{ padding: '12px 10px', fontWeight: 800, color: '#2563EB' }}>⭐ {s.xp}</td>
                      <td style={{ padding: '12px 10px' }}>
                        <span style={{ 
                          padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800,
                          background: s.status === 'active' ? '#D1FAE5' : (s.status === 'needs_help' ? '#FEF3C7' : '#FEE2E2'),
                          color: s.status === 'active' ? '#047857' : (s.status === 'needs_help' ? '#B45309' : '#B91C1C')
                        }}>
                          {s.status === 'active' ? '● Active' : (s.status === 'needs_help' ? '▲ Needs Help' : '✖ Inactive')}
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

      {/* TAB 2: STUDENTS OVERVIEW & DETAIL MODAL */}
      {activeSubTab === 'students' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Controls: Search & Filters */}
          <div className="card" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search by student name or roll no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '14px', border: '1.5px solid var(--border-light)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                value={filterClass} 
                onChange={(e) => setFilterClass(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '14px', border: '1.5px solid var(--border-light)', fontSize: '0.85rem', fontWeight: 700 }}
              >
                <option value="all">All Classes</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
              </select>

              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '14px', border: '1.5px solid var(--border-light)', fontSize: '0.85rem', fontWeight: 700 }}
              >
                <option value="all">All Learning Statuses</option>
                <option value="active">Active (Green)</option>
                <option value="needs_help">Needs Help (Orange)</option>
                <option value="inactive">Inactive (Red)</option>
              </select>
            </div>
          </div>

          {/* Students Directory Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {filteredStudents.map(student => (
              <div 
                key={student.id} 
                className="card" 
                onClick={() => setSelectedStudent(student)}
                style={{ 
                  padding: '20px', cursor: 'pointer', transition: 'transform 0.2s',
                  borderTop: `4px solid ${student.status === 'active' ? '#10B981' : (student.status === 'needs_help' ? '#F59E0B' : '#EF4444')}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem' }}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>{student.name}</h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>Roll: {student.rollNo} • {student.className}-{student.section}</div>
                    </div>
                  </div>
                  <span style={{ 
                    width: '10px', height: '10px', borderRadius: '50%', 
                    background: student.status === 'active' ? '#10B981' : (student.status === 'needs_help' ? '#F59E0B' : '#EF4444') 
                  }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px', padding: '10px', background: 'var(--bg-app)', borderRadius: '12px', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Attendance:</span>
                    <div style={{ fontWeight: 800, color: student.attendance >= 75 ? '#10B981' : '#EF4444' }}>{student.attendance}%</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Avg Score:</span>
                    <div style={{ fontWeight: 800, color: '#2563EB' }}>{student.score}%</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Level:</span>
                    <div style={{ fontWeight: 800 }}>Lvl {student.level}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>XP Points:</span>
                    <div style={{ fontWeight: 800, color: '#F59E0B' }}>⭐ {student.xp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Student Profile Modal */}
          {selectedStudent && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <div className="card animate-slide-up" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', position: 'relative' }}>
                <button onClick={() => setSelectedStudent(null)} style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>✖</button>
                
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#2563EB', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem' }}>
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900 }}>{selectedStudent.name}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Roll No: {selectedStudent.rollNo} • {selectedStudent.className}-{selectedStudent.section} • Parent: {selectedStudent.parentName} ({selectedStudent.parentPhone})</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '14px', background: '#EFF6FF', borderRadius: '16px', border: '1px solid #BFDBFE' }}>
                    <h4 style={{ margin: '0 0 6px 0', color: '#1E40AF', fontSize: '0.95rem', fontWeight: 900 }}>🤖 AI Learning Recommendation</h4>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#1E3A8A' }}>{selectedStudent.aiRecommendation}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ padding: '12px', background: '#D1FAE5', borderRadius: '14px' }}>
                      <strong style={{ color: '#065F46', fontSize: '0.85rem' }}>💪 Key Strengths</strong>
                      <ul style={{ margin: '6px 0 0 16px', padding: 0, fontSize: '0.82rem', color: '#047857' }}>
                        {selectedStudent.strengths.map((st, i) => <li key={i}>{st}</li>)}
                      </ul>
                    </div>

                    <div style={{ padding: '12px', background: '#FEE2E2', borderRadius: '14px' }}>
                      <strong style={{ color: '#991B1B', fontSize: '0.85rem' }}>⚠️ Areas to Improve</strong>
                      <ul style={{ margin: '6px 0 0 16px', padding: 0, fontSize: '0.82rem', color: '#B91C1C' }}>
                        {selectedStudent.weaknesses.map((wk, i) => <li key={i}>{wk}</li>)}
                      </ul>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Downloaded Official Performance Report for ${selectedStudent.name} (PDF)`)}
                    style={{ width: '100%', padding: '14px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Download size={18} /> Download Student Progress Report (PDF)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ATTENDANCE MODULE */}
      {activeSubTab === 'attendance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>Daily Attendance Tracker</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Class 8-A • GHPS Anekal</div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                  type="date" 
                  value={attendanceDate} 
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '12px', border: '1.5px solid var(--border-light)', fontWeight: 700 }}
                />
                <button 
                  onClick={() => setAttendanceSaved(true)}
                  style={{ background: '#10B981', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '14px', fontWeight: 800, cursor: 'pointer' }}
                >
                  Save Attendance
                </button>
              </div>
            </div>

            {attendanceSaved && (
              <div style={{ background: '#D1FAE5', color: '#065F46', padding: '10px 16px', borderRadius: '12px', fontWeight: 800, marginBottom: '16px' }}>
                ✓ Attendance saved for {attendanceDate}!
              </div>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                    <th style={{ padding: '10px' }}>Roll</th>
                    <th style={{ padding: '10px' }}>Student Name</th>
                    <th style={{ padding: '10px' }}>Mark Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s: StudentData) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 800 }}>{s.rollNo}</td>
                      <td style={{ padding: '12px 10px', fontWeight: 800 }}>{s.name}</td>
                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {(['present', 'absent', 'late'] as const).map(st => (
                            <button
                              key={st}
                              onClick={() => handleAttendanceChange(s.id, st)}
                              style={{
                                padding: '6px 14px',
                                borderRadius: '12px',
                                border: 'none',
                                fontWeight: 800,
                                fontSize: '0.78rem',
                                cursor: 'pointer',
                                background: attendanceRecords[s.id] === st ? (st === 'present' ? '#10B981' : (st === 'absent' ? '#EF4444' : '#F59E0B')) : 'var(--bg-app)',
                                color: attendanceRecords[s.id] === st ? 'white' : 'var(--text-secondary)'
                              }}
                            >
                              {st.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ASSIGNMENT MANAGEMENT */}
      {activeSubTab === 'assignments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>Active Classroom Assignments</h3>
            <button 
              onClick={() => setShowCreateAssignment(true)}
              style={{ background: '#2563EB', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={18} /> Create Assignment
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {[
              { id: 'a1', title: 'Mathematics: Rational Numbers Worksheet', subject: 'Mathematics', className: 'Class 8-A', dueDate: 'Tomorrow', submitted: '38/45', avgScore: '86%' },
              { id: 'a2', title: 'Science: States of Matter & Molecular Motion', subject: 'Science', className: 'Class 8-A', dueDate: 'Friday', submitted: '42/45', avgScore: '91%' },
              { id: 'a3', title: 'Digital Skills: Excel & Data Formulas', subject: 'Digital Skills', className: 'Class 9-B', dueDate: 'Next Mon', submitted: '29/45', avgScore: '80%' }
            ].map(asg => (
              <div key={asg.id} className="card" style={{ padding: '20px', borderLeft: '4px solid #2563EB' }}>
                <div style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 800 }}>{asg.subject} • {asg.className}</div>
                <h4 style={{ margin: '6px 0 10px 0', fontSize: '1.05rem', fontWeight: 900 }}>{asg.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  <span>Due: <strong>{asg.dueDate}</strong></span>
                  <span>Submitted: <strong>{asg.submitted}</strong></span>
                </div>
                <div style={{ background: 'var(--bg-app)', padding: '10px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 800, color: '#10B981' }}>
                  Average Submission Score: {asg.avgScore}
                </div>
              </div>
            ))}
          </div>

          {/* Create Assignment Modal */}
          {showCreateAssignment && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <div className="card animate-slide-up" style={{ width: '100%', maxWidth: '500px', padding: '24px', position: 'relative' }}>
                <button onClick={() => setShowCreateAssignment(false)} style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>✖</button>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 900 }}>Create New Classroom Assignment</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 800 }}>Assignment Title</label>
                    <input type="text" placeholder="e.g. Chapter 4 Practice Questions" value={assignTitle} onChange={(e) => setAssignTitle(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1.5px solid var(--border-light)', marginTop: '4px' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 800 }}>Subject</label>
                      <select value={assignSubject} onChange={(e) => setAssignSubject(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1.5px solid var(--border-light)', marginTop: '4px' }}>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                        <option value="Digital Skills">Digital Skills</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 800 }}>Target Class</label>
                      <select value={assignClass} onChange={(e) => setAssignClass(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1.5px solid var(--border-light)', marginTop: '4px' }}>
                        <option value="Class 8">Class 8-A</option>
                        <option value="Class 9">Class 9-B</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setShowCreateAssignment(false); alert('Assignment Published to Student App!'); }}
                    style={{ marginTop: '12px', padding: '14px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 900, cursor: 'pointer' }}
                  >
                    Publish Assignment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: AI TEACHER ASSISTANT */}
      {activeSubTab === 'ai' && (
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
            <Bot size={28} color="#2563EB" />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900 }}>AI Teacher Assistant</h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Instant Lesson Planning, Quiz Generation & Student Analytics Support</div>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              "Which students are falling behind?",
              "Generate homework for Math",
              "Generate quick Science quiz",
              "Translate notification to Kannada"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendAi(chip)}
                style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', padding: '6px 12px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                ⚡ {chip}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', paddingRight: '4px' }}>
            {aiChat.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '14px 18px',
                  borderRadius: '18px',
                  background: msg.role === 'user' ? '#2563EB' : 'var(--bg-app)',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  lineHeight: 1.5,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Ask AI Teacher Assistant anything..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAi()}
              style={{ flex: 1, padding: '14px', borderRadius: '16px', border: '1.5px solid var(--border-light)', fontSize: '0.95rem' }}
            />
            <button
              onClick={() => handleSendAi()}
              style={{ background: '#2563EB', color: 'white', border: 'none', padding: '0 20px', borderRadius: '16px', fontWeight: 800, cursor: 'pointer' }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* TAB 6: REPORTS & EXPORT */}
      {(activeSubTab === 'reports' || activeSubTab === 'analytics' || activeSubTab === 'quizzes') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 900 }}>Classroom Reports & Analytics Export</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Generate official government school compliance reports for Class 8-A and Class 9-B.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {[
                { title: 'Class Academic Report', desc: 'Subject-wise marks and grades', type: 'Google Sheets / Excel' },
                { title: 'Monthly Attendance Register', desc: 'Official student presence logs', type: 'Google Sheets / Excel' },
                { title: 'Student Progress Digest', desc: 'Parent-teacher meeting summary', type: 'PDF' },
                { title: 'Digital Learning Adoption', desc: 'XP and app activity stats', type: 'Google Sheets / Excel' }
              ].map((rep, idx) => (
                <div key={idx} style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontWeight: 800, fontSize: '0.95rem' }}>{rep.title}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: '12px' }}>{rep.desc}</div>
                  <button 
                    onClick={() => exportStudentsToCSV(students, `Namma_Buddy_${rep.title.replace(/\s+/g, '_')}.csv`)}
                    style={{ width: '100%', padding: '10px', background: '#10B981', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(16,185,129,0.25)' }}
                  >
                    <Download size={15} /> Export ({rep.type})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
