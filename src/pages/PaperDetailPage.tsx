import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePapers } from '../context/PaperContext';
import { formatFileSize, formatDate } from '../utils/pdfGenerator';
import { QuestionPaperCard } from '../components/QuestionPaperCard';
import {
  FileText,
  Download,
  Eye,
  Heart,
  ArrowLeft,
  Calendar,
  Layers,
  HardDrive,
  ShieldCheck,
  Share2,
} from 'lucide-react';

export const PaperDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { papers, openPdfViewer, downloadPaper, toggleFavorite, isFavorite } = usePapers();

  const paper = papers.find((p) => p.id === id);

  if (!paper) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-deep-charcoal">Question Paper Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested document could not be located in the current repository.
        </p>
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 px-4 py-2 bg-electric-violet text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse</span>
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(paper.id);

  // Related papers in same category
  const relatedPapers = papers
    .filter((p) => p.id !== paper.id && p.category === paper.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-deep-charcoal transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Papers</span>
        </button>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
        <div className="space-y-3">
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <span className="text-electric-violet font-bold">
              {paper.category || 'General Examination'}
            </span>
            {paper.year && (
              <>
                <span>·</span>
                <span className="font-mono tabular-nums text-slate-700">Year {paper.year}</span>
              </>
            )}
            {paper.isDemo && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/90 px-2 py-0.5 rounded-md uppercase tracking-wider">
                DEMO SAMPLE
              </span>
            )}
            {paper.hasAnswerKey && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/90 px-1.5 py-0.5 rounded-md">
                Complete Answer Key
              </span>
            )}
            <span>·</span>
            <span>Uploaded {formatDate(paper.uploadedAt)}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-deep-charcoal leading-snug">
            {paper.title}
          </h1>

          {paper.isDemo && (
            <div className="p-3 bg-amber-50 border border-amber-200/90 rounded-2xl text-xs text-amber-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Notice: Demo Practice Material</span>
              </div>
              <p className="text-amber-700 leading-relaxed">
                This document is a realistic sample created for preparation, curriculum revision, and demonstration purposes. It is not an official examination paper issued by an examination board or government commission.
              </p>
            </div>
          )}

          {paper.description && (
            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              {paper.description}
            </p>
          )}
        </div>

        {/* Technical Document Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 font-mono text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">
              File Format
            </span>
            <span className="font-bold text-slate-700">PDF Document</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">
              File Size
            </span>
            <span className="font-bold text-slate-700 tabular-nums">
              {formatFileSize(paper.fileSize)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">
              Total Downloads
            </span>
            <span className="font-bold text-fresh-teal tabular-nums">
              {(paper.downloadCount || 0).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">
              Views
            </span>
            <span className="font-bold text-sunshine-yellow tabular-nums">
              {(paper.viewCount || 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Paper Question Structure Overview if sections exist */}
        {paper.sections && paper.sections.length > 0 && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-sm font-bold text-deep-charcoal uppercase tracking-wider flex items-center justify-between">
              <span>Exam Structure & Questions Summary</span>
              <span className="text-xs text-electric-violet font-mono lowercase">
                {paper.sections.length} sections · {paper.hasAnswerKey ? 'solutions included' : 'questions only'}
              </span>
            </h3>

            <div className="space-y-3">
              {paper.sections.map((sec, sIdx) => (
                <div key={sIdx} className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{sec.title}</span>
                    <span className="font-mono text-slate-500">({sec.marks} Marks)</span>
                  </div>
                  <div className="space-y-2 text-slate-600 pl-2">
                    {sec.questions.slice(0, 3).map((q, qIdx) => (
                      <div key={qIdx} className="border-l-2 border-electric-violet/30 pl-2.5 py-0.5">
                        <p className="font-medium text-slate-800">
                          Q{q.questionNumber}. {q.text}
                        </p>
                        {q.answerKey && (
                          <p className="text-[11px] text-emerald-700 font-mono mt-0.5">
                            Answer Key: {q.answerKey}
                          </p>
                        )}
                      </div>
                    ))}
                    {sec.questions.length > 3 && (
                      <p className="text-[11px] text-slate-400 italic">
                        + {sec.questions.length - 3} more questions in PDF
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Primary Interactive CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => openPdfViewer(paper)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-soft-lavender hover:bg-electric-violet/15 text-electric-violet font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>View PDF Online</span>
          </button>

          <button
            onClick={() => downloadPaper(paper)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-electric-violet hover:bg-electric-violet-hover text-white font-bold text-sm rounded-xl shadow-md shadow-electric-violet/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => toggleFavorite(paper.id)}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              favorited
                ? 'bg-rose-50 border-rose-200 text-coral-pink'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-coral-pink text-coral-pink' : ''}`} />
            <span>{favorited ? 'Favourited' : 'Add to Favourites'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-3 text-slate-400 hover:text-deep-charcoal hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Share document link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Related Papers in Same Category */}
      {relatedPapers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-deep-charcoal">
            Related Papers in {paper.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedPapers.map((rel) => (
              <QuestionPaperCard key={rel.id} paper={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
