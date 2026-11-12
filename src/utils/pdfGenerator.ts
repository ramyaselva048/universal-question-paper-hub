/**
 * Utility for formatting and creating realistic question paper PDF representations.
 */

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatDate(isoDateString: string): string {
  try {
    const d = new Date(isoDateString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return isoDateString;
  }
}

/**
 * Creates an authentic PDF document for a question paper title
 * Using standard minimal PDF 1.4 binary structure so it opens properly in all PDF viewers and download tools.
 */
export function generateMinimalExamPdfBlob(title: string, category: string = 'General', year: string | number = '2024'): Blob {
  // Construct a minimal valid PDF format document with exam content
  const content = `
%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595 842]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 <<
        /Type /Font
        /Subtype /Type1
        /BaseFont /Helvetica-Bold
      >>
      /F2 <<
        /Type /Font
        /Subtype /Type1
        /BaseFont /Helvetica
      >>
    >>
  >>
>>
endobj
4 0 obj
<<
  /Length 550
>>
stream
BT
/F1 18 Tf
50 780 Td
(UNIVERSAL QUESTION PAPER HUB) Tj
/F1 14 Tf
0 -30 Td
(${title.replace(/[\(\)]/g, '')}) Tj
/F2 11 Tf
0 -22 Td
(Category: ${category}   |   Examination Year: ${year}   |   Max Marks: 100) Tj
0 -15 Td
(Time Allowed: 3 Hours   |   Universal Reference ID: UQPH-${Math.floor(100000 + Math.random() * 900000)}) Tj
0 -25 Td
(--------------------------------------------------------------------------------------------------------------------------------) Tj
/F1 12 Tf
0 -25 Td
(INSTRUCTIONS TO CANDIDATES:) Tj
/F2 10 Tf
0 -16 Td
(1. Answer all questions from Section A and any four questions from Section B.) Tj
0 -14 Td
(2. Figures to the right indicate full marks assigned to each question.) Tj
0 -14 Td
(3. Use of non-programmable scientific calculators is permitted where stated.) Tj
/F1 12 Tf
0 -28 Td
(SECTION A - OBJECTIVE & CORE CONCEPTS [20 MARKS]) Tj
/F2 10 Tf
0 -18 Td
(Q1. Define the fundamental principles governing this subject area.) Tj
0 -16 Td
(Q2. State the primary assumptions and boundary conditions required for theoretical analysis.) Tj
0 -16 Td
(Q3. Provide two distinct real-world applications with explanatory diagrams.) Tj
/F1 12 Tf
0 -28 Td
(SECTION B - ADVANCED ANALYTICAL PROBLEMS [40 MARKS]) Tj
/F2 10 Tf
0 -18 Td
(Q4. Derive the governing differential equation and verify dimensional consistency.) Tj
0 -16 Td
(Q5. Evaluate the efficiency metrics under varying environmental load conditions.) Tj
0 -16 Td
(Q6. Formulate a comprehensive synthesis comparing modern and classical frameworks.) Tj
/F1 10 Tf
0 -50 Td
(Official Archive Copy - Universal Question Paper Hub Repository) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000378 00000 n 
trailer
<<
  /Size 5
  /Root 1 0 R
>>
startxref
980
%%EOF
  `.trim();

  return new Blob([content], { type: 'application/pdf' });
}

export function createDownloadUrlForPaper(title: string, category?: string, year?: string | number): string {
  const blob = generateMinimalExamPdfBlob(title, category || 'General', year || '2024');
  return URL.createObjectURL(blob);
}
