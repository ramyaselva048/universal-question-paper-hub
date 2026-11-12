import { QuestionPaper, ExamSection } from '../types';

/**
 * Utility for formatting and creating authentic question paper PDF representations.
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
 * Escapes characters for PDF literal strings enclosed in parentheses
 */
function escapePdf(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[\r\n\t]/g, ' ')
    // Replace non-ASCII characters with standard ASCII equivalents for Type 1 standard fonts
    .replace(/[—–]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/·/g, '*')
    .replace(/[²]/g, '^2')
    .replace(/[³]/g, '^3')
    .replace(/[√]/g, 'sqrt')
    .replace(/[π]/g, 'pi')
    .replace(/[θ]/g, 'theta')
    .replace(/[μ]/g, 'u')
    .replace(/[ε]/g, 'e')
    .replace(/[λ]/g, 'lambda')
    .replace(/[Σ]/g, 'SUM')
    .replace(/[∫]/g, 'INT')
    .replace(/[≠]/g, '!=')
    .replace(/[≤]/g, '<=')
    .replace(/[≥]/g, '>=')
    .replace(/[±]/g, '+/-')
    .replace(/[°]/g, ' deg');
}

/**
 * Wraps long text lines to fit within a given character width
 */
function wrapText(text: string, maxCharsPerLine: number = 76): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
    } else if ((currentLine + ' ' + word).length <= maxCharsPerLine) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines.length > 0 ? lines : [''];
}

/**
 * Generates an authentic, valid PDF 1.4 multi-page document with real questions and answer keys.
 * Clearly watermarked and labeled as DEMO SAMPLE PAPER - NOT AN OFFICIAL EXAMINATION PAPER.
 */
export function generateQuestionPaperPdfBlob(paper: Partial<QuestionPaper>): Blob {
  const title = paper.title || 'Universal Examination Question Paper';
  const category = paper.category || 'General';
  const year = paper.year || '2024';
  const timeAllowed = paper.timeAllowed || '3 Hours';
  const maxMarks = paper.maxMarks || 100;
  const paperCode = `UQPH-${(paper.id || 'DEMO').replace(/[^a-zA-Z0-9]/g, '').slice(-8).toUpperCase()}`;

  // Content for Page 1: Header, Demo Disclaimers, Instructions, Section A
  const page1Lines: Array<{ font: 'F1' | 'F2'; size: number; text: string; dy: number }> = [
    { font: 'F1', size: 15, text: 'UNIVERSAL QUESTION PAPER HUB', dy: 0 },
    { font: 'F1', size: 9, text: '*** DEMO SAMPLE QUESTION PAPER - FOR PRACTICE & STUDY PURPOSES ONLY ***', dy: -18 },
    { font: 'F2', size: 8, text: 'NOTICE: THIS IS A SIMULATED DEMO DOCUMENT. NOT AN OFFICIAL EXAMINATION PAPER.', dy: -13 },
    { font: 'F1', size: 12, text: title.toUpperCase(), dy: -22 },
    { font: 'F2', size: 9, text: `Discipline: ${category}   |   Examination Year: ${year}   |   Max Marks: ${maxMarks}`, dy: -16 },
    { font: 'F2', size: 8.5, text: `Time Allowed: ${timeAllowed}   |   Paper Code: ${paperCode}`, dy: -13 },
    { font: 'F2', size: 8, text: '----------------------------------------------------------------------------------------------------------------------------', dy: -12 },
    { font: 'F1', size: 9.5, text: 'GENERAL INSTRUCTIONS TO CANDIDATES:', dy: -16 },
  ];

  const instructions = paper.generalInstructions && paper.generalInstructions.length > 0
    ? paper.generalInstructions
    : [
        '1. This question paper is a verified DEMO SAMPLE for academic practice and preparation.',
        '2. Candidate must verify all sections and report any printing discrepancy immediately.',
        '3. Answer all questions from Section A. Attempt optional questions as instructed in Section B and C.',
        '4. Detailed Answer Keys and explanatory solutions are appended at the end of this paper.',
      ];

  instructions.forEach((inst, idx) => {
    const wrapped = wrapText(inst.startsWith(`${idx + 1}.`) ? inst : `${idx + 1}. ${inst}`, 80);
    wrapped.forEach((wLine, lineIdx) => {
      page1Lines.push({
        font: 'F2',
        size: 8.5,
        text: wLine,
        dy: lineIdx === 0 ? -12 : -10,
      });
    });
  });

  page1Lines.push({ font: 'F2', size: 8, text: '----------------------------------------------------------------------------------------------------------------------------', dy: -14 });

  // First Section
  const sec1 = paper.sections && paper.sections.length > 0 ? paper.sections[0] : null;
  if (sec1) {
    page1Lines.push({ font: 'F1', size: 10, text: sec1.title, dy: -16 });
    sec1.questions.forEach((q) => {
      const qPrefix = `Q${q.questionNumber}. `;
      const wrappedQ = wrapText(qPrefix + q.text, 78);
      wrappedQ.forEach((wLine, wIdx) => {
        page1Lines.push({
          font: 'F2',
          size: 8.5,
          text: wLine,
          dy: wIdx === 0 ? -13 : -10,
        });
      });
      if (q.options && q.options.length > 0) {
        q.options.forEach((opt) => {
          page1Lines.push({ font: 'F2', size: 8, text: `   ${opt}`, dy: -10 });
        });
      }
    });
  }

  // Content for Page 2: Sections B & C (Analytical & Numerical Questions)
  const page2Lines: Array<{ font: 'F1' | 'F2'; size: number; text: string; dy: number }> = [
    { font: 'F1', size: 9, text: `${title} - Page 2`, dy: 0 },
    { font: 'F2', size: 7.5, text: '*** DEMO PRACTICE PAPER - NOT AN OFFICIAL EXAMINATION PAPER ***', dy: -12 },
    { font: 'F2', size: 8, text: '----------------------------------------------------------------------------------------------------------------------------', dy: -10 },
  ];

  const otherSections = paper.sections && paper.sections.length > 1 ? paper.sections.slice(1) : [];
  if (otherSections.length > 0) {
    otherSections.forEach((sec) => {
      page2Lines.push({ font: 'F1', size: 10, text: sec.title, dy: -16 });
      sec.questions.forEach((q) => {
        const qPrefix = `Q${q.questionNumber}. `;
        const wrappedQ = wrapText(qPrefix + q.text + (q.marks ? ` [${q.marks} Marks]` : ''), 78);
        wrappedQ.forEach((wLine, wIdx) => {
          page2Lines.push({
            font: 'F2',
            size: 8.5,
            text: wLine,
            dy: wIdx === 0 ? -13 : -10,
          });
        });
        if (q.options && q.options.length > 0) {
          q.options.forEach((opt) => {
            page2Lines.push({ font: 'F2', size: 8, text: `   ${opt}`, dy: -10 });
          });
        }
      });
    });
  } else {
    page2Lines.push({ font: 'F1', size: 10, text: 'SECTION B — ADVANCED ANALYTICAL PROBLEMS', dy: -16 });
    page2Lines.push({ font: 'F2', size: 8.5, text: 'Q5. Formulate the governing theoretical framework and derive boundary stability equations. [10 Marks]', dy: -14 });
    page2Lines.push({ font: 'F2', size: 8.5, text: 'Q6. Perform asymptotic evaluation comparing classical closed forms against empirical metrics. [10 Marks]', dy: -14 });
  }

  // Content for Page 3: Official Answer Key & Step-by-Step Solutions
  const page3Lines: Array<{ font: 'F1' | 'F2'; size: number; text: string; dy: number }> = [
    { font: 'F1', size: 11, text: 'SECTION D — COMPLETE ANSWER KEY & MARKING SCHEME', dy: 0 },
    { font: 'F2', size: 8, text: 'OFFICIAL DEMO SOLUTIONS PROVIDED FOR SELF-ASSESSMENT & REVISION', dy: -13 },
    { font: 'F2', size: 8, text: '----------------------------------------------------------------------------------------------------------------------------', dy: -10 },
  ];

  // Collect all questions with answer keys
  const allQuestionsWithAnswers = paper.sections
    ? paper.sections.flatMap((s) => s.questions.filter((q) => q.answerKey || q.explanation))
    : [];

  if (allQuestionsWithAnswers.length > 0) {
    allQuestionsWithAnswers.forEach((q) => {
      page3Lines.push({
        font: 'F1',
        size: 8.5,
        text: `Answer Q${q.questionNumber}: ${q.answerKey || 'Verified'}`,
        dy: -14,
      });
      if (q.explanation) {
        const wrappedExp = wrapText(`Explanation/Method: ${q.explanation}`, 78);
        wrappedExp.forEach((wLine, expIdx) => {
          page3Lines.push({
            font: 'F2',
            size: 8,
            text: `  ${wLine}`,
            dy: expIdx === 0 ? -11 : -9.5,
          });
        });
      }
    });
  } else {
    page3Lines.push({ font: 'F1', size: 9, text: 'Answer Key Summary Table:', dy: -14 });
    page3Lines.push({ font: 'F2', size: 8.5, text: 'Q1: Option (B) | Q2: Option (A) | Q3: Option (B) | Q4: Option (A)', dy: -12 });
    page3Lines.push({ font: 'F2', size: 8.5, text: 'Q5: Derivation satisfies boundary conservation laws with zero divergence.', dy: -12 });
  }

  page3Lines.push({ font: 'F2', size: 8, text: '----------------------------------------------------------------------------------------------------------------------------', dy: -16 });
  page3Lines.push({ font: 'F1', size: 8.5, text: '*** END OF DEMO SAMPLE QUESTION PAPER & ANSWER KEY ***', dy: -14 });
  page3Lines.push({ font: 'F2', size: 7.5, text: 'Universal Question Paper Hub - Verified Academic Practice Archive - https://universal-qph.edu', dy: -12 });

  // Generate stream contents for the 3 pages
  const createPageStream = (lines: Array<{ font: 'F1' | 'F2'; size: number; text: string; dy: number }>): string => {
    let streamText = 'BT\n';
    let isFirst = true;

    for (const line of lines) {
      const escaped = escapePdf(line.text);
      if (isFirst) {
        streamText += `/${line.font} ${line.size} Tf\n50 780 Td\n(${escaped}) Tj\n`;
        isFirst = false;
      } else {
        streamText += `/${line.font} ${line.size} Tf\n0 ${line.dy} Td\n(${escaped}) Tj\n`;
      }
    }
    streamText += 'ET';
    return streamText;
  };

  const stream1 = createPageStream(page1Lines);
  const stream2 = createPageStream(page2Lines);
  const stream3 = createPageStream(page3Lines);

  // Build the complete PDF 1.4 file
  const objects: string[] = [];

  // Object 1: Catalog
  objects.push('1 0 obj\n<<\n  /Type /Catalog\n  /Pages 2 0 R\n>>\nendobj');

  // Object 2: Pages
  objects.push('2 0 obj\n<<\n  /Type /Pages\n  /Kids [3 0 R 5 0 R 7 0 R]\n  /Count 3\n>>\nendobj');

  // Object 3: Page 1
  objects.push(
    '3 0 obj\n<<\n  /Type /Page\n  /Parent 2 0 R\n  /MediaBox [0 0 595 842]\n  /Contents 4 0 R\n  /Resources <<\n    /Font <<\n      /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\n      /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\n    >>\n  >>\n>>\nendobj'
  );

  // Object 4: Stream 1
  objects.push(`4 0 obj\n<<\n  /Length ${stream1.length}\n>>\nstream\n${stream1}\nendstream\nendobj`);

  // Object 5: Page 2
  objects.push(
    '5 0 obj\n<<\n  /Type /Page\n  /Parent 2 0 R\n  /MediaBox [0 0 595 842]\n  /Contents 6 0 R\n  /Resources <<\n    /Font <<\n      /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\n      /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\n    >>\n  >>\n>>\nendobj'
  );

  // Object 6: Stream 2
  objects.push(`6 0 obj\n<<\n  /Length ${stream2.length}\n>>\nstream\n${stream2}\nendstream\nendobj`);

  // Object 7: Page 3
  objects.push(
    '7 0 obj\n<<\n  /Type /Page\n  /Parent 2 0 R\n  /MediaBox [0 0 595 842]\n  /Contents 8 0 R\n  /Resources <<\n    /Font <<\n      /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\n      /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\n    >>\n  >>\n>>\nendobj'
  );

  // Object 8: Stream 3
  objects.push(`8 0 obj\n<<\n  /Length ${stream3.length}\n>>\nstream\n${stream3}\nendstream\nendobj`);

  // Assemble with exact byte offsets for xref
  const header = '%PDF-1.4\n';
  let body = '';
  const offsets: number[] = [];

  for (const obj of objects) {
    offsets.push(header.length + body.length);
    body += obj + '\n';
  }

  const startXref = header.length + body.length;

  let xref = 'xref\n0 9\n0000000000 65535 f \n';
  for (const offset of offsets) {
    xref += String(offset).padStart(10, '0') + ' 00000 n \n';
  }

  const trailer = `trailer\n<<\n  /Size 9\n  /Root 1 0 R\n>>\nstartxref\n${startXref}\n%%EOF\n`;

  const completePdf = header + body + xref + trailer;
  return new Blob([completePdf], { type: 'application/pdf' });
}

/**
 * Standard minimal PDF generator for compatibility
 */
export function generateMinimalExamPdfBlob(
  title: string,
  category: string = 'General',
  year: string | number = '2024'
): Blob {
  return generateQuestionPaperPdfBlob({ title, category, year });
}

export function createDownloadUrlForPaper(paper: Partial<QuestionPaper>): string {
  const blob = generateQuestionPaperPdfBlob(paper);
  return URL.createObjectURL(blob);
}
