import React from 'react';
import { QuestionPaper } from '../types';
import { usePapers } from '../context/PaperContext';
import { formatFileSize } from '../utils/pdfGenerator';
import { Eye, Download, Heart, FileText, Calendar, HardDrive } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuestionPaperCardProps {
  paper: QuestionPaper;
  onView?: (paper: QuestionPaper) => void;
  onDownload?: (paper: QuestionPaper) => void;
  showAdminActions?: boolean;
  onEdit?: (paper: QuestionPaper) => void;
  onDelete?: (paper: QuestionPaper) => void;
}

export const QuestionPaperCard: React.FC<QuestionPaperCardProps> = ({
  paper,
  onView,
  onDownload,
  showAdminActions,
  onEdit,
  onDelete,
}) => {
  const { openPdfViewer, downloadPaper, toggleFavorite, isFavorite } = usePapers();
  const favorited = isFavorite(paper.id);

  const handleView = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onView) {
      onView(paper);
    } else {
      openPdfViewer(paper);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDownload) {
      onDownload(paper);
    } else {
      downloadPaper(paper);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(paper.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-electric-violet/40 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Unboxed Metadata Header (Anti-Slop Zero-Pill Rule) */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
          <div className="flex items-center gap-1.5 font-medium truncate flex-wrap">
            <span className="text-electric-violet font-semibold truncate">
              {paper.category || 'General Examination'}
            </span>
            {paper.year && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="font-mono tabular-nums text-slate-600">{paper.year}</span>
              </>
            )}
            {paper.isDemo && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/90 px-1.5 py-0.5 rounded-md uppercase tracking-wider ml-1">
                DEMO SAMPLE
              </span>
            )}
            {paper.hasAnswerKey && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/90 px-1.5 py-0.5 rounded-md">
                Answer Key
              </span>
            )}
          </div>

          <button
            onClick={handleToggleFavorite}
            title={favorited ? 'Remove from favourites' : 'Save to favourites'}
            className="p-1.5 text-slate-400 hover:text-coral-pink rounded-lg hover:bg-rose-50/60 transition-colors cursor-pointer shrink-0"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorited ? 'fill-coral-pink text-coral-pink' : 'text-slate-400'
              }`}
            />
          </button>
        </div>

        {/* Paper Title */}
        <h3 className="font-bold text-deep-charcoal text-base leading-snug line-clamp-2 mb-2 group-hover:text-electric-violet transition-colors">
          <Link to={`/paper/${paper.id}`} className="hover:underline">
            {paper.title}
          </Link>
        </h3>

        {/* Description & Demo Disclaimer */}
        {paper.description && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-2 leading-relaxed">
            {paper.description}
          </p>
        )}

        {paper.isDemo && (
          <p className="text-[11px] text-amber-700/90 bg-amber-50/70 rounded-lg px-2.5 py-1 mb-3.5 border border-amber-100 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>Practice sample · Not an official examination paper</span>
          </p>
        )}
      </div>

      <div>
        {/* Document Stats line */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mb-4 font-mono tabular-nums">
          <div className="flex items-center gap-3">
            <span title="File size" className="flex items-center gap-1 text-slate-500">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              {formatFileSize(paper.fileSize)}
            </span>
            <span title="Total downloads" className="flex items-center gap-1 text-slate-500">
              <Download className="w-3.5 h-3.5 text-fresh-teal" />
              {(paper.downloadCount || 0).toLocaleString()}
            </span>
          </div>
          <span title="Total views" className="flex items-center gap-1 text-slate-500">
            <Eye className="w-3.5 h-3.5 text-sunshine-yellow" />
            {(paper.viewCount || 0).toLocaleString()}
          </span>
        </div>

        {/* Interactive Action Buttons */}
        {showAdminActions ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit && onEdit(paper)}
              className="flex-1 py-2 text-xs font-semibold text-deep-charcoal bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Edit Details
            </button>
            <button
              onClick={() => onDelete && onDelete(paper)}
              className="px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleView}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-deep-charcoal bg-soft-lavender hover:bg-electric-violet/15 text-electric-violet rounded-xl transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View PDF</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-electric-violet hover:bg-electric-violet-hover rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
