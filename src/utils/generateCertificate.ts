import { jsPDF } from 'jspdf';

const getLogoDataUrl = (): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = '/logo.jpg';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg'));
        } else {
          resolve(null);
        }
      } catch (e) {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
  });
};

export const downloadCertificate = async (
  userName: string,
  schoolName: string,
  classLevel: number,
  subject: string,
  date: string = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Clean School Name (fix AU bug)
  const cleanSchool = (schoolName && schoolName.trim().length >= 3 && schoolName.trim().toUpperCase() !== 'AU')
    ? schoolName.trim()
    : 'GHPS Anekal, Karnataka';

  const cleanName = (userName && userName.trim().length > 0) ? userName.trim() : 'Learner';

  // Background Fill (#F8FAFC)
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, width, height, 'F');

  // Outer Border (Primary Blue #2563EB)
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(8);
  doc.rect(20, 20, width - 40, height - 40, 'D');

  // Inner Border (Secondary Green #10B981)
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(2);
  doc.rect(28, 28, width - 56, height - 56, 'D');

  // Corner Accents (Gold #F59E0B)
  doc.setFillColor(245, 158, 11);
  doc.rect(28, 28, 16, 16, 'F');
  doc.rect(width - 44, 28, 16, 16, 'F');
  doc.rect(28, height - 44, 16, 16, 'F');
  doc.rect(width - 44, height - 44, 16, 16, 'F');

  // Load and add Namma Buddy Logo at Top Center
  try {
    const logoUrl = await getLogoDataUrl();
    if (logoUrl) {
      doc.addImage(logoUrl, 'JPEG', width / 2 - 28, 40, 56, 56);
    }
  } catch (e) {
    console.warn('Could not render logo in certificate:', e);
  }

  // Certificate Title
  doc.setTextColor(15, 23, 42); // #0F172A
  doc.setFontSize(38);
  doc.setFont('helvetica', 'bold');
  doc.text('Certificate of Excellence', width / 2, 130, { align: 'center' });

  // Subtitle
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('This proudly recognizes that', width / 2, 165, { align: 'center' });

  // Student Name
  doc.setFontSize(30);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235); // Primary Blue #2563EB
  doc.text(cleanName.toUpperCase(), width / 2, 215, { align: 'center' });

  // Underline for Student Name
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1.5);
  doc.line(width / 2 - 220, 225, width / 2 + 220, 225);

  // Achievement details
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  
  doc.text(`from ${cleanSchool} (Class ${classLevel})`, width / 2, 265, { align: 'center' });
  doc.text(`has successfully mastered all practice modules and demonstrated`, width / 2, 292, { align: 'center' });
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // Accent Green #10B981
  doc.text(`outstanding proficiency in ${subject}.`, width / 2, 318, { align: 'center' });

  // Official Seal Badge (Fixes the && bug!)
  const sealY = 390;
  // Outer Gold Circle
  doc.setFillColor(245, 158, 11); // #F59E0B
  doc.circle(width / 2, sealY, 32, 'F');
  // Inner Green Circle
  doc.setFillColor(16, 185, 129); // #10B981
  doc.circle(width / 2, sealY, 26, 'F');
  // Seal Text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('VERIFIED', width / 2, sealY - 2, { align: 'center' });
  doc.setFontSize(7.5);
  doc.text('OFFICIAL', width / 2, sealY + 9, { align: 'center' });

  // Date Line (Left side)
  const dateX = width / 4 + 20;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.line(dateX - 70, 465, dateX + 70, 465);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text('Date Achieved', dateX, 482, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(date, dateX, 456, { align: 'center' });

  // Signature Line (Right side)
  const sigX = (width / 4) * 3 - 20;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.line(sigX - 70, 465, sigX + 70, 465);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text('Authorized Authority', sigX, 482, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(37, 99, 235);
  doc.text('Namma Buddy', sigX, 456, { align: 'center' });

  // Save PDF file
  const fileName = `${cleanName.replace(/\s+/g, '_')}_${subject}_Certificate.pdf`;
  doc.save(fileName);
};
