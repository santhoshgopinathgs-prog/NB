import { jsPDF } from 'jspdf';

export const downloadCertificate = (
  userName: string,
  schoolName: string,
  classLevel: number,
  subject: string,
  date: string = new Date().toLocaleDateString()
) => {
  // Create a new PDF document (landscape orientation)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(248, 250, 252); // Very light blue/gray
  doc.rect(0, 0, width, height, 'F');

  // Add decorative border
  doc.setDrawColor(59, 130, 246); // Accent blue
  doc.setLineWidth(10);
  doc.rect(20, 20, width - 40, height - 40, 'D');

  doc.setDrawColor(16, 185, 129); // Accent green
  doc.setLineWidth(2);
  doc.rect(28, 28, width - 56, height - 56, 'D');

  // Title
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(48);
  doc.setFont('helvetica', 'bold');
  doc.text('Certificate of Excellence', width / 2, 120, { align: 'center' });

  // Subtitle
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('This proudly recognizes that', width / 2, 170, { align: 'center' });

  // Student Name
  doc.setFontSize(36);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(59, 130, 246);
  doc.text(userName.toUpperCase(), width / 2, 230, { align: 'center' });

  // Line under name
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.line(width / 2 - 200, 240, width / 2 + 200, 240);

  // Achievement description
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  
  const text1 = `from ${schoolName} (Class ${classLevel})`;
  const text2 = `has successfully mastered all practice modules and demonstrated`;
  const text3 = `outstanding proficiency in ${subject}.`;

  doc.text(text1, width / 2, 280, { align: 'center' });
  doc.text(text2, width / 2, 310, { align: 'center' });
  doc.text(text3, width / 2, 335, { align: 'center' });

  // Seal / Badge
  doc.setFillColor(16, 185, 129); // Green badge
  doc.circle(width / 2, 420, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('★', width / 2, 428, { align: 'center' });

  // Signatures / Date
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  // Date
  doc.text('Date Achieved', width / 4, 440, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text(date, width / 4, 460, { align: 'center' });
  doc.setDrawColor(203, 213, 225);
  doc.line(width / 4 - 50, 445, width / 4 + 50, 445);

  // Authority
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Authorized by', (width / 4) * 3, 440, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Namma Buddy', (width / 4) * 3, 460, { align: 'center' });
  doc.line((width / 4) * 3 - 50, 445, (width / 4) * 3 + 50, 445);

  // Save the PDF
  doc.save(`${userName.replace(/\s+/g, '_')}_${subject}_Certificate.pdf`);
};
