import React, { useState } from 'react';
import { usePapers } from '../context/PaperContext';
import { formatFileSize } from '../utils/pdfGenerator';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Printer,
  ShieldCheck,
  HardDrive,
} from 'lucide-react';

export const PdfViewerModal: React.FC = () => {
  const { activeViewingPaper, closePdfViewer, downloadPaper } = usePapers();
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const totalPages = 3;

  if (!activeViewingPaper) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 70));
  const handleResetZoom = () => setZoomLevel(100);

  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-deep-charcoal/80 backdrop-blur-xs animate-fadeIn">
      <div
        className={`bg-[#2E3440] text-slate-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700 transition-all ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-5xl h-[92vh]'
        }`}
      >
        {/* Demo Sample Notice Strip */}
        {activeViewingPaper.isDemo && (
          <div className="bg-amber-500/20 text-amber-200 border-b border-amber-500/30 px-4 py-1.5 text-xs font-medium flex items-center justify-between shrink-0">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <strong>DEMO SAMPLE DOCUMENT:</strong> This question paper is a verified simulation for academic practice. It is not an official examination paper.
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-500/30 text-amber-100 px-2 py-0.5 rounded">
              Practice Material
            </span>
          </div>
        )}

        {/* Top Control Bar */}
        <div className="bg-[#242933] px-4 py-3 border-b border-slate-700/80 flex items-center justify-between gap-4 shrink-0">
          {/* Title & Metadata */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-electric-violet/20 text-electric-violet flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-white truncate" title={activeViewingPaper.title}>
                {activeViewingPaper.title}
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>{activeViewingPaper.category || 'General Examination'}</span>
                {activeViewingPaper.year && (
                  <>
                    <span>·</span>
                    <span>Year {activeViewingPaper.year}</span>
                  </>
                )}
                <span>·</span>
                <span>{formatFileSize(activeViewingPaper.fileSize)}</span>
              </div>
            </div>
          </div>

          {/* Controls: Zoom, Page Nav, Download, Close */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Page navigation */}
            <div className="hidden sm:flex items-center gap-1 bg-[#1E222A] px-2 py-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-1 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                title="Previous page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono tabular-nums px-1 text-slate-300">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-1 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                title="Next page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Zoom controls */}
            <div className="hidden md:flex items-center gap-1 bg-[#1E222A] px-2 py-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 70}
                className="p-1 hover:text-white disabled:opacity-40"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="font-mono tabular-nums px-1.5 hover:text-white text-slate-300"
                title="Reset zoom"
              >
                {zoomLevel}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 160}
                className="p-1 hover:text-white disabled:opacity-40"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors hidden sm:block"
              title="Print document"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title={isFullscreen ? 'Exit full screen' : 'Full screen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Download CTA */}
            <button
              onClick={() => downloadPaper(activeViewingPaper)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-electric-violet hover:bg-electric-violet-hover text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            {/* Close */}
            <button
              onClick={closePdfViewer}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors ml-1 cursor-pointer"
              title="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Document Canvas Viewport */}
        <div className="flex-1 overflow-auto bg-[#1E222A] p-4 sm:p-8 flex justify-center items-start">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-150 ease-out"
          >
            {/* Realistic Exam Paper Sheet (A4 Proportion) */}
            <div className="w-[680px] min-h-[960px] bg-white text-slate-900 p-10 sm:p-14 shadow-2xl rounded-sm border border-slate-300 relative select-text">
              {/* Official Academic / Demo Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] select-none">
                <span className="text-7xl font-black rotate-[-35deg] tracking-widest text-slate-900">
                  {activeViewingPaper.isDemo ? 'DEMO SAMPLE' : 'ARCHIVE COPY'}
                </span>
              </div>

              {/* Page 1 Header & Section A */}
              {currentPage === 1 && (
                <div>
                  {activeViewingPaper.isDemo && (
                    <div className="bg-amber-50 border border-amber-200/90 text-amber-800 text-[10.5px] font-bold py-1 px-2.5 rounded text-center mb-4 uppercase tracking-wider">
                      *** DEMO SAMPLE QUESTION PAPER · FOR PRACTICE ONLY · NOT AN OFFICIAL EXAM PAPER ***
                    </div>
                  )}

                  <div className="text-center pb-5 border-b-2 border-slate-900 mb-5 space-y-1">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                      {activeViewingPaper.isDemo
                        ? 'Simulated Academic Practice Series · Universal Question Paper Hub'
                        : 'Official Repository Archive · Universal Question Paper Hub'}
                    </p>
                    <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                      {activeViewingPaper.title}
                    </h1>
                    <div className="flex items-center justify-center gap-3 text-xs font-semibold text-slate-700 pt-1 flex-wrap">
                      <span>Category: {activeViewingPaper.category || 'General Examination'}</span>
                      <span>|</span>
                      <span>Year: {activeViewingPaper.year || '2024'}</span>
                      <span>|</span>
                      <span>Max Marks: {activeViewingPaper.maxMarks || 100}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-mono">
                      Time Allowed: {activeViewingPaper.timeAllowed || '3 Hours'} · Code: UQPH-{activeViewingPaper.id.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase()}
                    </div>
                  </div>

                  {/* General Instructions */}
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-md mb-6 text-xs text-slate-700 space-y-1">
                    <p className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">
                      General Instructions to Candidates:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-slate-600 text-[11px] leading-relaxed">
                      {(activeViewingPaper.generalInstructions || [
                        'This question paper is a verified DEMO SAMPLE for academic practice and preparation.',
                        'Write your Roll Number / Registration ID clearly in the allocated spaces.',
                        'Section A is compulsory. Answer any optional questions as instructed in subsequent sections.',
                        'A complete verified Answer Key is available on Page 3 for self-assessment.',
                      ]).map((inst, i) => (
                        <li key={i}>{inst.replace(/^[0-9]+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Section A Content */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-300 pb-1">
                      <h3 className="font-bold text-xs tracking-wide text-slate-900 uppercase">
                        {activeViewingPaper.sections?.[0]?.title || 'SECTION A — OBJECTIVE & CORE PRINCIPLES'}
                      </h3>
                      <span className="text-xs font-bold text-slate-600 font-mono">
                        ({activeViewingPaper.sections?.[0]?.marks || 20} Marks)
                      </span>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-800 leading-relaxed">
                      {(activeViewingPaper.sections?.[0]?.questions || [
                        { questionNumber: '1', text: 'Define the fundamental axioms governing this domain.', marks: 4 },
                        { questionNumber: '2', text: 'Compare and contrast the primary theoretical frameworks.', marks: 4 },
                        { questionNumber: '3', text: 'Explain the significance of boundary conditions.', marks: 6 },
                        { questionNumber: '4', text: 'State the primary conservation laws applicable under steady-state.', marks: 6 },
                      ]).map((q, idx) => (
                        <div key={idx} className="flex gap-2.5">
                          <span className="font-bold font-mono text-slate-900">Q{q.questionNumber}.</span>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 mb-1">{q.text}</p>
                            {q.options && q.options.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-700 pl-1 mt-1 font-mono">
                                {q.options.map((opt, oIdx) => (
                                  <span key={oIdx}>{opt}</span>
                                ))}
                              </div>
                            )}
                            {q.marks && (
                              <div className="text-[10px] text-slate-500 font-mono mt-0.5">[{q.marks} Marks]</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Page 2: Analytical & Problem Solving Sections */}
              {currentPage === 2 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-3 border-b border-slate-200 mb-5">
                    <span className="truncate max-w-[400px]">{activeViewingPaper.title}</span>
                    <span>Page 2 of 3</span>
                  </div>

                  <div className="space-y-6">
                    {/* Render Section B & Section C */}
                    {activeViewingPaper.sections && activeViewingPaper.sections.length > 1 ? (
                      activeViewingPaper.sections.slice(1, 3).map((sec, secIdx) => (
                        <div key={secIdx} className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-300 pb-1">
                            <h3 className="font-bold text-xs tracking-wide text-slate-900 uppercase">
                              {sec.title}
                            </h3>
                            <span className="text-xs font-bold text-slate-600 font-mono">
                              ({sec.marks} Marks)
                            </span>
                          </div>

                          <div className="space-y-4 text-xs text-slate-800 leading-relaxed">
                            {sec.questions.map((q, qIdx) => (
                              <div key={qIdx} className="flex gap-2.5">
                                <span className="font-bold font-mono text-slate-900">Q{q.questionNumber}.</span>
                                <div className="flex-1">
                                  <p className="font-medium text-slate-900 mb-1">{q.text}</p>
                                  {q.options && q.options.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-700 pl-1 mt-1 font-mono">
                                      {q.options.map((opt, oIdx) => (
                                        <span key={oIdx}>{opt}</span>
                                      ))}
                                    </div>
                                  )}
                                  {q.marks && (
                                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">[{q.marks} Marks]</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-5 text-xs text-slate-800 leading-relaxed">
                        <div className="flex items-center justify-between border-b border-slate-300 pb-1.5">
                          <h3 className="font-bold text-sm tracking-wide text-slate-900">
                            SECTION B — ANALYTICAL & METHODOLOGICAL PROBLEMS
                          </h3>
                          <span className="text-xs font-bold text-slate-600 font-mono">(40 Marks)</span>
                        </div>
                        <p className="text-slate-700">Q5. Derive governing mathematical formulas and evaluate equilibrium metrics. [15 Marks]</p>
                        <p className="text-slate-700">Q6. Compare empirical data methodologies against classical analytic solutions. [15 Marks]</p>
                        <p className="text-slate-700">Q7. Formulate optimization models under constrained resource parameters. [10 Marks]</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Page 3: Official Answer Key & Step-by-Step Solutions */}
              {currentPage === 3 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-3 border-b border-slate-200 mb-5">
                    <span className="truncate max-w-[400px]">{activeViewingPaper.title}</span>
                    <span>Page 3 of 3 (Answer Key)</span>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-300 pb-1">
                      <h3 className="font-bold text-xs tracking-wide text-slate-900 uppercase">
                        SECTION D — OFFICIAL ANSWER KEY & STEP-BY-STEP SOLUTIONS
                      </h3>
                      <span className="text-[11px] font-bold text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Verified Solutions
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Below are the authentic answers, formulas, and marking breakdown for every question in this sample paper:
                    </p>

                    <div className="space-y-3.5 text-xs text-slate-800 max-h-[640px] overflow-y-auto pr-2">
                      {(
                        activeViewingPaper.sections
                          ?.flatMap((s) => s.questions.filter((q) => q.answerKey || q.explanation))
                          .slice(0, 8) || []
                      ).map((q, aIdx) => (
                        <div key={aIdx} className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span className="font-mono">Question {q.questionNumber} Key:</span>
                            <span className="text-emerald-700 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                              {q.answerKey}
                            </span>
                          </div>
                          {q.explanation && (
                            <p className="text-[11.5px] text-slate-600 leading-relaxed pt-1">
                              <strong>Step-by-Step Method:</strong> {q.explanation}
                            </p>
                          )}
                        </div>
                      ))}

                      {(!activeViewingPaper.sections || activeViewingPaper.sections.length === 0) && (
                        <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-2 text-xs">
                          <p className="font-bold text-slate-900">General Answer Key Rubric:</p>
                          <p className="text-slate-600">Q1 to Q4: Core conceptual derivation and empirical justification.</p>
                          <p className="text-slate-600">Q5 to Q7: Asymptotic convergence, boundary parameter checks, and equilibrium analysis.</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-200">
                      *** END OF QUESTION PAPER & ANSWER KEY ***
                    </div>
                  </div>
                </div>
              )}

              {/* Sheet Footer */}
              <div className="absolute bottom-6 left-10 right-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200 pt-3">
                <span className="flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-fresh-teal" />
                  Universal Question Paper Hub Verified Archive
                </span>
                <span className="font-mono tabular-nums">Page {currentPage} of {totalPages}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status / Navigation bar on mobile */}
        <div className="bg-[#242933] px-4 py-2.5 border-t border-slate-700 text-xs flex sm:hidden items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-2.5 py-1 bg-slate-700 rounded text-slate-200 disabled:opacity-40"
            >
              Prev
            </button>
            <span className="font-mono text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 bg-slate-700 rounded text-slate-200 disabled:opacity-40"
            >
              Next
            </button>
          </div>
          <button
            onClick={() => downloadPaper(activeViewingPaper)}
            className="px-3 py-1 bg-electric-violet text-white font-semibold rounded"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
