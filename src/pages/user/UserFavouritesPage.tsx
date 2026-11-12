import React from 'react';
import { Link } from 'react-router-dom';
import { usePapers } from '../../context/PaperContext';
import { QuestionPaperCard } from '../../components/QuestionPaperCard';
import { Heart, ArrowRight } from 'lucide-react';

export const UserFavouritesPage: React.FC = () => {
  const { papers, favoriteIds } = usePapers();

  const favoritePapers = papers.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-coral-pink">
            Bookmarks
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-deep-charcoal mt-1">
            Favourite Papers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Question papers you have marked for priority revision and practice.
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

      {favoritePapers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {favoritePapers.map((paper) => (
            <QuestionPaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-coral-pink/10 text-coral-pink flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-deep-charcoal">No favourites saved yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click the heart icon on any question paper card to bookmark it here for fast revision.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 px-4 py-2 bg-electric-violet text-white text-xs font-bold rounded-xl shadow-xs hover:bg-electric-violet-hover transition-colors"
          >
            <span>Browse Question Papers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};
