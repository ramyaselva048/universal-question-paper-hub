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
              {/* Official Academic Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                <span className="text-8xl font-black rotate-[-35deg] tracking-widest text-slate-900">
                  ARCHIVE COPY
                </span>
              </div>

              {/* Page 1 Header */}
              {currentPage === 1 && (
                <div>
                  <div className="text-center pb-6 border-b-2 border-slate-900 mb-6 space-y-1">
                    <p className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
                      Official Repository Archive · Universal Question Paper Hub
                    </p>
                    <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                      {activeViewingPaper.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                      <span>Discipline: {activeViewingPaper.category || 'General Examination'}</span>
                      <span>|</span>
                      <span>Year: {activeViewingPaper.year || 'Current'}</span>
                      <span>|</span>
                      <span>Maximum Marks: 100</span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-mono">
                      Time Allowed: 3 Hours · Paper Code: UQPH-{activeViewingPaper.id.slice(-6).toUpperCase()}
                    </div>
                  </div>

                  {/* General Instructions */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-md mb-8 text-xs text-slate-700 space-y-1.5">
                    <p className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">
                      General Instructions to Candidates:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-slate-600 text-[11.5px] leading-relaxed">
                      <li>Check that this question paper contains all 3 printed sections and no pages are missing.</li>
                      <li>Write your Roll Number / Registration ID clearly in the allocated spaces.</li>
                      <li>Section A is compulsory. Answer any FOUR questions from Section B and any TWO from Section C.</li>
                      <li>Calculators or approved statistical tables are permitted where specified.</li>
                    </ol>
                  </div>

                  {/* Section A */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-300 pb-1.5">
                      <h3 className="font-bold text-sm tracking-wide text-slate-900">
                        SECTION A — OBJECTIVE & CORE PRINCIPLES
                      </h3>
                      <span className="text-xs font-bold text-slate-600 font-mono">(20 Marks)</span>
                    </div>

                    <div className="space-y-4 text-xs text-slate-800 leading-relaxed">
                      <div className="flex gap-3">
                        <span className="font-bold font-mono">1.</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 mb-1">
                            Define the fundamental axioms governing this domain and demonstrate their relevance to real-world computational or physical systems.
                          </p>
                          <div className="text-[11px] text-slate-500 font-mono">[4 Marks]</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="font-bold font-mono">2.</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 mb-1">
                            Compare and contrast the primary theoretical frameworks discussed in standard curricula. Cite two distinguishing empirical characteristics.
                          </p>
                          <div className="text-[11px] text-slate-500 font-mono">[4 Marks]</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="font-bold font-mono">3.</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 mb-1">
                            Explain the significance of boundary conditions and error tolerances in the formulation of mathematical models.
                          </p>
                          <div className="text-[11px] text-slate-500 font-mono">[6 Marks]</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="font-bold font-mono">4.</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 mb-1">
                            State the primary conservation laws or invariance properties applicable under steady-state operating regimes.
                          </p>
                          <div className="text-[11px] text-slate-500 font-mono">[6 Marks]</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Page 2 */}
              {currentPage === 2 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-4 border-b border-slate-200 mb-6">
                    <span>{activeViewingPaper.title}</span>
                    <span>Page 2 of 3</span>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-300 pb-1.5">
                      <h3 className="font-bold text-sm tracking-wide text-slate-900">
                        SECTION B — ANALYTICAL & METHODOLOGICAL PROBLEMS
                      </h3>
                      <span className="text-xs font-bold text-slate-600 font-mono">(40 Marks)</span>
                    </div>

                    <div className="space-y-5 text-xs text-slate-800 leading-relaxed">
                      <div className="flex gap-3">
                        <span className="font-bold font-mono">5.</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 mb-1.5">
                            Derive the characteristic equation for the system described below. Validate dimensional consistency and evaluate asymptotic stability:
                          </p>
                          <div className="bg-slate-100 p-3 rounded font-mono text-xs my-2 text-slate-800 border border-slate-200">
                            F(x, t) = &#x2202;&#178;&#968;/&#x2202;t&#178; - c&#178; &#x2207;&#178;&#968; + &#955; &#968;&#179; = 0
                          </div>
                          <p className="text-slate-600">
                            (a) Determine the equilibrium points. (b) Linearize around the primary trajectory and plot the phase portrait.
                          </p>
                          <div className="text-[11px] text-slate-500 font-mono mt-1">[10 Marks]</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="font-bold font-mono">6.</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 mb-1.5">
                            A production facility operates under constrained resource parameters with variable throughput. Formulate the primal optimization problem:
                          </p>
                          <p className="text-slate-600">
                            Apply the simplex method or Kuhn-Tucker conditions to compute optimal dual variables and conduct sensitivity analysis.
                          </p>
                          <div className="text-[11px] text-slate-500 font-mono mt-1">[10 Marks]</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="font-bold font-mono">7.</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 mb-1.5">
                            Critically evaluate modern empirical methodologies in contrast to classical closed-form analytic solutions.
                          </p>
                          <div className="text-[11px] text-slate-500 font-mono mt-1">[10 Marks]</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Page 3 */}
              {currentPage === 3 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pb-4 border-b border-slate-200 mb-6">
                    <span>{activeViewingPaper.title}</span>
                    <span>Page 3 of 3</span>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-300 pb-1.5">
                      <h3 className="font-bold text-sm tracking-wide text-slate-900">
                        SECTION C — ADVANCED CASE STUDY & ESSAY
                      </h3>
                      <span className="text-xs font-bold text-slate-600 font-mono">(40 Marks)</span>
                    </div>

                    <div className="space-y-5 text-xs text-slate-800 leading-relaxed">
                      <div className="flex gap-3">
                        <span className="font-bold font-mono">8.</span>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 mb-1.5">
                            CASE STUDY: Real-World Scenario & Scalability Assessment
                          </p>
                          <p className="text-slate-700 mb-2 leading-relaxed">
                            Consider a modern enterprise deploying distributed architectures to process high-concurrency workloads. During peak traffic cycles, bottleneck latencies escalate exponentially while synchronization costs degrade throughput by 42%.
                          </p>
                          <p className="text-slate-600 mb-1">
                            (a) Architect an end-to-end mitigation strategy with architectural diagrams.
                          </p>
                          <p className="text-slate-600 mb-1">
                            (b) Calculate anticipated failover redundancy metrics and mean time between failures (MTBF).
                          </p>
                          <div className="text-[11px] text-slate-500 font-mono mt-1">[20 Marks]</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="font-bold font-mono">9.</span>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 mb-1.5">
                            Future Horizons and Emerging Paradigms:
                          </p>
                          <p className="text-slate-600">
                            Discuss the integration of artificial intelligence and machine intelligence frameworks within this discipline. Address both technical hurdles and ethical governance considerations.
                          </p>
                          <div className="text-[11px] text-slate-500 font-mono mt-1">[20 Marks]</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-10 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                      *** END OF QUESTION PAPER ***
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
