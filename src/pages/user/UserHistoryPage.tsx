import React from 'react';
import { Link } from 'react-router-dom';
import { usePapers } from '../../context/PaperContext';
import { QuestionPaperCard } from '../../components/QuestionPaperCard';
import { formatDate } from '../../utils/pdfGenerator';
import { History, ArrowRight, Eye, FileText } from 'lucide-react';

export const UserHistoryPage: React.FC = () => {
  const { views, papers, openPdfViewer } = usePapers();

  // Map view records to paper objects
  const viewedPapers = views
    .map((v) => {
      const p = papers.find((paper) => paper.id === v.paperId);
      return p ? { paper: p, viewedAt: v.viewedAt } : null;
    })
    .filter((item): item is { paper: typeof papers[0]; viewedAt: string } => Boolean(item));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-electric-violet">
            Session History
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-deep-charcoal mt-1">
            Recently Viewed Papers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Question papers you have recently inspected in the in-app PDF reader.
          </p>
        </div>

        <Link
          to="/browse"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-violet hover:underline"
        >
          <span>Browse All Papers</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {viewedPapers.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {viewedPapers.map(({ paper, viewedAt }) => (
              <div key={`${paper.id}-${viewedAt}`} className="flex flex-col">
                <span className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-sunshine-yellow" />
                  <span>Viewed {formatDate(viewedAt)}</span>
                </span>
                <QuestionPaperCard paper={paper} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-electric-violet/10 text-electric-violet flex items-center justify-center mx-auto">
            <History className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-deep-charcoal">No reading history yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click "View PDF" on any examination card to open the interactive reader. Your viewing history will be recorded here.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 px-4 py-2 bg-electric-violet text-white text-xs font-bold rounded-xl shadow-xs hover:bg-electric-violet-hover transition-colors"
          >
            <span>Start Reading</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};
