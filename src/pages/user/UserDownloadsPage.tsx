import React from 'react';
import { Link } from 'react-router-dom';
import { usePapers } from '../../context/PaperContext';
import { formatFileSize, formatDate } from '../../utils/pdfGenerator';
import { Download, Eye, FileText, ArrowRight, HardDrive, Calendar } from 'lucide-react';

export const UserDownloadsPage: React.FC = () => {
  const { downloads, papers, openPdfViewer, downloadPaper } = usePapers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-fresh-teal">
            Study Archive
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-deep-charcoal mt-1">
            My Downloads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Records of question papers you have downloaded to your device for offline study.
          </p>
        </div>

        <Link
          to="/browse"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-violet hover:underline"
        >
          <span>Find more papers</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {downloads.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100">
            {downloads.map((item) => {
              const fullPaper = papers.find((p) => p.id === item.paperId);

              return (
                <div
                  key={item.id}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-fresh-teal/10 text-fresh-teal flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-deep-charcoal hover:text-electric-violet transition-colors">
                        {fullPaper ? (
                          <Link to={`/paper/${fullPaper.id}`}>{item.paperTitle}</Link>
                        ) : (
                          item.paperTitle
                        )}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                        <span className="text-electric-violet font-semibold">
                          {item.category || 'General'}
                        </span>
                        {item.year && (
                          <>
                            <span>·</span>
                            <span className="font-mono tabular-nums">Year {item.year}</span>
                          </>
                        )}
                        <span>·</span>
                        <span className="font-mono tabular-nums">{formatFileSize(item.fileSize)}</span>
                        <span>·</span>
                        <span>Downloaded on {formatDate(item.downloadedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {fullPaper && (
                      <button
                        onClick={() => openPdfViewer(fullPaper)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    )}
                    {fullPaper && (
                      <button
                        onClick={() => downloadPaper(fullPaper)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-electric-violet hover:bg-electric-violet-hover rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Again</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-fresh-teal/10 text-fresh-teal flex items-center justify-center mx-auto">
            <Download className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-deep-charcoal">No downloads yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            When you download question papers for offline revision, they will appear here for easy re-downloading.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 px-4 py-2 bg-electric-violet text-white text-xs font-bold rounded-xl shadow-xs hover:bg-electric-violet-hover transition-colors"
          >
            <span>Explore Question Papers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};
