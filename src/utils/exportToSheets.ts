/**
 * Export Student & User Data to Google Sheets / Excel CSV format
 */

export interface StudentExportItem {
  id: string;
  name: string;
  rollNo: string;
  className: string;
  section?: string;
  schoolName?: string;
  attendance: number;
  score: number;
  level: number;
  xp: number;
  status: string;
  parentName?: string;
  parentPhone?: string;
  strengths?: string[];
  weaknesses?: string[];
  aiRecommendation?: string;
}

export const exportStudentsToCSV = (students: StudentExportItem[], fileName: string = 'Namma_Buddy_Student_Data.csv') => {
  // Define CSV headers matching Google Sheets format
  const headers = [
    'Student ID',
    'Full Name',
    'Roll Number',
    'Class & Section',
    'School Name',
    'Attendance %',
    'Average Score %',
    'Current Level',
    'Total XP',
    'Status',
    'Parent/Guardian Name',
    'Parent Contact Phone',
    'Key Strengths',
    'Areas for Improvement',
    'AI Teacher Recommendation'
  ];

  // Convert student items into CSV rows
  const rows = students.map(s => [
    `"${s.id || ''}"`,
    `"${(s.name || '').replace(/"/g, '""')}"`,
    `"${s.rollNo || ''}"`,
    `"${s.className || 'Class 8'}${s.section ? '-' + s.section : ''}"`,
    `"${(s.schoolName || 'GHPS Anekal').replace(/"/g, '""')}"`,
    `"${s.attendance || 0}%"`,
    `"${s.score || 0}%"`,
    `"Level ${s.level || 1}"`,
    `"${s.xp || 0}"`,
    `"${(s.status || 'active').toUpperCase()}"`,
    `"${(s.parentName || 'Parent').replace(/"/g, '""')}"`,
    `"${s.parentPhone || ''}"`,
    `"${(s.strengths ? s.strengths.join('; ') : '').replace(/"/g, '""')}"`,
    `"${(s.weaknesses ? s.weaknesses.join('; ') : '').replace(/"/g, '""')}"`,
    `"${(s.aiRecommendation || '').replace(/"/g, '""')}"`
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  // Create downloadable Blob
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' }); // UTF-8 BOM for Excel/Google Sheets
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
