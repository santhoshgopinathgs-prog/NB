import { jsPDF } from 'jspdf';

const getLogoDataUrl = (): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = '/logo.jpg';
    img.onload = () => {
      try {
        const size = Math.max(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Circular clip to remove any square black background corners around logo
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, (size / 2) - 4, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          // Draw image centered inside the circle
          ctx.drawImage(img, 0, 0, size, size);

          // Return clean transparent PNG data URL
          resolve(canvas.toDataURL('image/png'));
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

  // Clean School Name
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

  // Load and render BIGGER circular logo without black background (90px x 90px)
  try {
    const logoUrl = await getLogoDataUrl();
    if (logoUrl) {
      doc.addImage(logoUrl, 'PNG', width / 2 - 45, 36, 90, 90);
    }
  } catch (e) {
    console.warn('Could not render logo in certificate:', e);
  }

  // Certificate Title
  doc.setTextColor(15, 23, 42); // #0F172A
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.text('Certificate of Excellence', width / 2, 155, { align: 'center' });

  // Subtitle
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('This proudly recognizes that', width / 2, 185, { align: 'center' });

  // Student Name
  doc.setFontSize(30);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235); // Primary Blue #2563EB
  doc.text(cleanName.toUpperCase(), width / 2, 232, { align: 'center' });

  // Underline for Student Name
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1.5);
  doc.line(width / 2 - 220, 242, width / 2 + 220, 242);

  // Achievement details
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  
  doc.text(`from ${cleanSchool} (Class ${classLevel})`, width / 2, 280, { align: 'center' });
  doc.text(`has successfully mastered all practice modules and demonstrated`, width / 2, 305, { align: 'center' });
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // Accent Green #10B981
  doc.text(`outstanding proficiency in ${subject}.`, width / 2, 330, { align: 'center' });

  // Official Seal Badge
  const sealY = 398;
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
  doc.line(dateX - 70, 468, dateX + 70, 468);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text('Date Achieved', dateX, 485, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(date, dateX, 458, { align: 'center' });

  // Signature Line (Right side)
  const sigX = (width / 4) * 3 - 20;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.line(sigX - 70, 468, sigX + 70, 468);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text('Authorized Authority', sigX, 485, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(37, 99, 235);
  doc.text('Namma Buddy', sigX, 458, { align: 'center' });

  // Save PDF file
  const fileName = `${cleanName.replace(/\s+/g, '_')}_${subject}_Certificate.pdf`;
  doc.save(fileName);
};
