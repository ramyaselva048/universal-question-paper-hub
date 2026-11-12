import React from 'react';
import { Link } from 'react-router-dom';
import { usePapers } from '../context/PaperContext';
import { GraduationCap, ArrowRight, BookOpen, Layers } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, categoryCounts } = usePapers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-electric-violet">
          Academic Taxonomy
        </span>
        <h1 className="text-3xl font-black text-deep-charcoal tracking-tight mt-1">
          Explore Examination Categories
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Browse question papers organized across all educational levels, professional disciplines, and competitive examinations.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const count = categoryCounts[category.name] || 0;
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-electric-violet/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-soft-lavender group-hover:bg-electric-violet text-electric-violet group-hover:text-white transition-colors flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono tabular-nums font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      {count} {count === 1 ? 'Paper' : 'Papers'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-deep-charcoal group-hover:text-electric-violet transition-colors mb-2">
                    {category.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {category.description || 'Comprehensive examination archives and test questions.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to={`/browse?category=${encodeURIComponent(category.name)}`}
                    className="w-full inline-flex items-center justify-between text-xs font-bold text-electric-violet group-hover:text-electric-violet-hover"
                  >
                    <span>Explore Question Papers</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-soft-lavender text-electric-violet flex items-center justify-center mx-auto">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-deep-charcoal">No categories created yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            The examination taxonomy is completely fresh. When categories are created by the administrator, they will appear here.
          </p>
          <div className="pt-2">
            <Link
              to="/admin/categories"
              className="inline-flex items-center gap-2 px-4 py-2 bg-electric-violet text-white text-xs font-bold rounded-xl hover:bg-electric-violet-hover transition-colors shadow-xs"
            >
              <span>Add Category in Admin Suite</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
