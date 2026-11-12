import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePapers } from '../../context/PaperContext';
import { QuestionPaperCard } from '../../components/QuestionPaperCard';
import { formatFileSize, formatDate } from '../../utils/pdfGenerator';
import {
  Search,
  Download,
  Heart,
  Eye,
  History,
  ArrowRight,
  BookOpen,
  Sparkles,
  FileText,
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { papers, categories, favoriteIds, downloads, views, openPdfViewer, downloadPaper } = usePapers();
  const navigate = useNavigate();
  const [dashboardSearch, setDashboardSearch] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dashboardSearch.trim()) {
      navigate(`/browse?q=${encodeURIComponent(dashboardSearch.trim())}`);
    }
  };

  // Get favorite papers objects
  const favoritePapers = papers.filter((p) => favoriteIds.includes(p.id));

  // Get recently accessed papers
  const recentViewedPapers = views
    .map((v) => papers.find((p) => p.id === v.paperId))
    .filter((p): p is typeof papers[0] => Boolean(p))
    .slice(0, 4);

  // Filtered display papers based on selected category tab
  const displayedPapers = papers.filter((p) => {
    if (selectedCategoryTab === 'all') return true;
    return p.category === selectedCategoryTab;
  });

  return (
    <div className="space-y-10">
      {/* Quick Search Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-electric-violet">
            Instant Study Search
          </span>
          <h2 className="text-2xl font-black text-deep-charcoal">
            Find question papers for your upcoming exams
          </h2>
          <form onSubmit={handleSearchSubmit} className="pt-1">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-3.5 text-slate-400" />
              <input
                type="text"
                value={dashboardSearch}
                onChange={(e) => setDashboardSearch(e.target.value)}
                placeholder="Search by topic, examination name, or year..."
                className="w-full pl-11 pr-28 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-deep-charcoal focus:outline-hidden focus:bg-white focus:border-electric-violet focus:ring-2 focus:ring-electric-violet/20"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-1.5 bg-electric-violet hover:bg-electric-violet-hover text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          to="/user/downloads"
          className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-fresh-teal/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              My Downloads
            </span>
            <div className="w-8 h-8 rounded-lg bg-fresh-teal/10 text-fresh-teal flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-deep-charcoal font-mono tabular-nums">
            {downloads.length}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-fresh-teal transition-colors">
            <span>View full download history &rarr;</span>
          </p>
        </Link>

        <Link
          to="/user/favourites"
          className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-coral-pink/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Saved Favourites
            </span>
            <div className="w-8 h-8 rounded-lg bg-coral-pink/10 text-coral-pink flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-deep-charcoal font-mono tabular-nums">
            {favoriteIds.length}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-coral-pink transition-colors">
            <span>Access bookmarked papers &rarr;</span>
          </p>
        </Link>

        <Link
          to="/user/history"
          className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-electric-violet/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recently Viewed
            </span>
            <div className="w-8 h-8 rounded-lg bg-electric-violet/10 text-electric-violet flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-deep-charcoal font-mono tabular-nums">
            {views.length}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-electric-violet transition-colors">
            <span>Resume your reading session &rarr;</span>
          </p>
        </Link>
      </div>

      {/* Bookmarked Favourites Quick Strip */}
      {favoritePapers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-deep-charcoal">Your Favourite Papers</h3>
              <p className="text-xs text-slate-500">Quick access to papers you saved for revision</p>
            </div>
            <Link
              to="/user/favourites"
              className="text-xs font-bold text-electric-violet hover:underline flex items-center gap-1"
            >
              <span>View All ({favoritePapers.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {favoritePapers.slice(0, 4).map((paper) => (
              <QuestionPaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed Papers */}
      {recentViewedPapers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-deep-charcoal">Recently Viewed Papers</h3>
              <p className="text-xs text-slate-500">Pick up where you left off</p>
            </div>
            <Link
              to="/user/history"
              className="text-xs font-bold text-electric-violet hover:underline flex items-center gap-1"
            >
              <span>History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentViewedPapers.map((paper) => (
              <QuestionPaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      )}

      {/* Available Question Papers Repository */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-deep-charcoal flex items-center gap-2">
              <span>Question Papers Repository</span>
              <span className="text-xs font-mono font-bold text-electric-violet bg-soft-lavender px-2 py-0.5 rounded-lg border border-electric-violet/20">
                {displayedPapers.length} Available
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Browse authentic demo question papers with answer keys, view online, or download PDF
            </p>
          </div>
          <Link
            to="/browse"
            className="text-xs font-bold text-electric-violet hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Open Advanced Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategoryTab('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategoryTab === 'all'
                ? 'bg-electric-violet text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Categories ({papers.length})
          </button>
          {categories.map((cat) => {
            const count = papers.filter((p) => p.category === cat.name).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryTab(cat.name)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategoryTab === cat.name
                    ? 'bg-electric-violet text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Question Paper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayedPapers.map((paper) => (
            <QuestionPaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </div>
    </div>
  );
};
