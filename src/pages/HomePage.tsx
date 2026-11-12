import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePapers } from '../context/PaperContext';
import { useAuth } from '../context/AuthContext';
import { QuestionPaperCard } from '../components/QuestionPaperCard';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import {
  Search,
  ArrowRight,
  BookOpen,
  Download,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  Cpu,
  Landmark,
  Briefcase,
  Compass,
  FileCheck2,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { papers, categories, categoryCounts } = usePapers();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/browse?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/browse');
    }
  };

  // Compute live statistics
  const totalDownloads = papers.reduce((sum, p) => sum + (p.downloadCount || 0), 0);
  const totalPapers = papers.length;
  const totalCategories = categories.length;

  // Recently uploaded papers (top 4)
  const recentPapers = [...papers]
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 4);

  // Most downloaded papers (top 4)
  const popularPapers = [...papers]
    .sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
    .slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-soft-lavender/60 via-white to-transparent pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200/60">
        {/* Subtle decorative background blur blobs with brand colors */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-electric-violet/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-coral-pink/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet editorial text kicker (Anti-Slop No-Pill rule) */}
              <div className="flex items-center gap-2 text-xs font-bold text-electric-violet tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-sunshine-yellow" />
                <span>The Premier Academic Examination Archive</span>
              </div>

              {/* Exact Requested Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-deep-charcoal tracking-tight leading-[1.08] text-balance">
                Every Question Paper.{' '}
                <span className="bg-gradient-to-r from-electric-violet via-coral-pink to-sunshine-yellow bg-clip-text text-transparent">
                  One Destination.
                </span>
              </h1>

              {/* Exact Requested Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Discover, explore and download question papers from every corner of education. School finals, university semesters, competitive entrances, and professional certifications.
              </p>

              {/* Large Search Bar */}
              <form onSubmit={handleHeroSearchSubmit} className="pt-2">
                <div className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-electric-violet/8 border border-slate-200/90 flex flex-col sm:flex-row items-stretch gap-2">
                  <div className="relative flex-1 flex items-center">
                    <Search className="w-5 h-5 absolute left-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                      placeholder="Search exam papers (e.g. Data Structures, GATE CS, UPSC, Grade 12 Math)..."
                      className="w-full pl-11 pr-4 py-3 text-sm text-deep-charcoal placeholder:text-slate-400 bg-transparent focus:outline-hidden"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-electric-violet hover:bg-electric-violet-hover text-white text-sm font-bold rounded-xl shadow-md shadow-electric-violet/25 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>Search</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <Link
                      to="/browse"
                      className="hidden sm:inline-flex items-center justify-center px-4 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
                    >
                      Browse Papers
                    </Link>
                  </div>
                </div>
              </form>

              {/* Google Sign-in prompt for guest visitors */}
              {!user && (
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-500">
                  <span>Sign in with Google to bookmark favourites and track your download history:</span>
                  <GoogleSignInButton variant="compact" />
                </div>
              )}
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/src/assets/images/hero_education_students_1794485735086.jpg"
                  alt="Students studying question papers in modern academic library"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-sunshine-yellow">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified Authentic Exam Papers</span>
                  </div>
                  <p className="text-sm font-bold mt-1">
                    Free PDF access for students and educators worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/90 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {/* Stat 1: Total Question Papers */}
          <div className="flex items-center gap-4 sm:justify-center">
            <div className="w-13 h-13 rounded-2xl bg-electric-violet/10 text-electric-violet flex items-center justify-center shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-deep-charcoal font-mono tabular-nums">
                {totalPapers > 0 ? `${totalPapers.toLocaleString()}+` : '0'}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Question Papers
              </p>
            </div>
          </div>

          {/* Stat 2: Total Downloads */}
          <div className="flex items-center gap-4 sm:justify-center pt-6 sm:pt-0">
            <div className="w-13 h-13 rounded-2xl bg-fresh-teal/10 text-fresh-teal flex items-center justify-center shrink-0">
              <Download className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-deep-charcoal font-mono tabular-nums">
                {totalDownloads > 0 ? `${totalDownloads.toLocaleString()}+` : '0'}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Downloads
              </p>
            </div>
          </div>

          {/* Stat 3: Total Categories */}
          <div className="flex items-center gap-4 sm:justify-center pt-6 sm:pt-0">
            <div className="w-13 h-13 rounded-2xl bg-coral-pink/10 text-coral-pink flex items-center justify-center shrink-0">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-deep-charcoal font-mono tabular-nums">
                {totalCategories}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Academic Disciplines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-electric-violet">
              Curated Fields
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-deep-charcoal">
              Popular Examination Categories
            </h2>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-violet hover:text-electric-violet-hover"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.slice(0, 8).map((cat) => {
              const count = categoryCounts[cat.name] || 0;
              return (
                <Link
                  key={cat.id}
                  to={`/browse?category=${encodeURIComponent(cat.name)}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-electric-violet/50 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-soft-lavender group-hover:bg-electric-violet text-electric-violet group-hover:text-white transition-colors flex items-center justify-center mb-3">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-deep-charcoal group-hover:text-electric-violet transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {cat.description || 'Archive papers across this discipline'}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-400">
                    <span className="font-mono tabular-nums text-slate-600 font-semibold">
                      {count} {count === 1 ? 'paper' : 'papers'}
                    </span>
                    <span className="text-electric-violet font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Explore &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center max-w-lg mx-auto">
            <div className="w-10 h-10 rounded-xl bg-soft-lavender text-electric-violet flex items-center justify-center mx-auto mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-deep-charcoal">No categories added yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              Examination categories added by the administrator will be displayed here.
            </p>
          </div>
        )}
      </section>

      {/* RECENTLY UPLOADED PAPERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-fresh-teal">
              Fresh Additions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-deep-charcoal">
              Recently Uploaded Papers
            </h2>
          </div>
          <Link
            to="/browse?sort=newest"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-violet hover:text-electric-violet-hover"
          >
            <span>See All Recent</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentPapers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentPapers.map((paper) => (
              <QuestionPaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center max-w-lg mx-auto">
            <div className="w-10 h-10 rounded-xl bg-soft-lavender text-fresh-teal flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-deep-charcoal">No question papers uploaded yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              The repository starts fresh. Uploaded question papers will appear here immediately.
            </p>
          </div>
        )}
      </section>

      {/* MOST DOWNLOADED PAPERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-coral-pink">
              Student Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-deep-charcoal">
              Most Downloaded Question Papers
            </h2>
          </div>
          <Link
            to="/browse?sort=most_downloaded"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-violet hover:text-electric-violet-hover"
          >
            <span>Explore Rankings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {popularPapers.length > 0 && totalDownloads > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularPapers.map((paper) => (
              <QuestionPaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center max-w-lg mx-auto">
            <div className="w-10 h-10 rounded-xl bg-soft-lavender text-coral-pink flex items-center justify-center mx-auto mb-3">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-deep-charcoal">No download records yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              As users download question papers, the most popular papers will be ranked here.
            </p>
          </div>
        )}
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-soft-lavender/40 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-electric-violet">
              Streamlined Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-deep-charcoal mt-1">
              How Universal Question Paper Hub Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Three seamless steps to locate, study, and prepare using verified exam questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-black text-electric-violet/20 font-mono mb-2">01</div>
              <h3 className="text-base font-bold text-deep-charcoal mb-2">
                Search or Filter by Category
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Use instant search to look up examinations by title, year, or academic discipline. Filter through school, university, and competitive entrance papers.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-black text-coral-pink/30 font-mono mb-2">02</div>
              <h3 className="text-base font-bold text-deep-charcoal mb-2">
                In-App PDF Viewer
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Inspect authentic question papers immediately in your browser. Use interactive zoom, page navigation, and full-screen modes before downloading.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-black text-fresh-teal/30 font-mono mb-2">03</div>
              <h3 className="text-base font-bold text-deep-charcoal mb-2">
                One-Click Download & Save
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Download verified PDF files directly to your device. Sign in with Google to bookmark favourites and keep a personal log of accessed materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE PLATFORM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/src/assets/images/library_archive_paper_1794485735893.jpg"
                alt="Organized examination papers and study notes on wooden desk"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-electric-violet">
              Our Academic Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-deep-charcoal">
              Empowering Every Student with Unrestricted Exam Access
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Universal Question Paper Hub was founded to eradicate the friction students face when preparing for high-stakes examinations. Whether you are revising for secondary board exams, engineering semesters, or nationwide civil service tests, our repository provides structured, searchable access to question papers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-electric-violet/10 text-electric-violet flex items-center justify-center shrink-0 mt-0.5">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-deep-charcoal">All Exam Types Welcomed</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    School, college, university, entrance, model, and government tests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-fresh-teal/10 text-fresh-teal flex items-center justify-center shrink-0 mt-0.5">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-deep-charcoal">Fast Direct Downloads</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Instant PDF rendering with zero wait times and zero paywalls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
