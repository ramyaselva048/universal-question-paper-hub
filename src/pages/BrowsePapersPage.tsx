import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePapers } from '../context/PaperContext';
import { QuestionPaperCard } from '../components/QuestionPaperCard';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { FilterOptions } from '../types';
import { paperService } from '../services/paperService';
import { FileQuestion, ChevronLeft, ChevronRight } from 'lucide-react';

export const BrowsePapersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, papers } = usePapers();

  // Read initial filter values from URL params
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    year: searchParams.get('year') || 'all',
    sortBy: (searchParams.get('sort') as FilterOptions['sortBy']) || 'newest',
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Sync state to URL search params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filterOptions.searchQuery) params.q = filterOptions.searchQuery;
    if (filterOptions.category !== 'all') params.category = filterOptions.category;
    if (filterOptions.year !== 'all') params.year = filterOptions.year;
    if (filterOptions.sortBy !== 'newest') params.sort = filterOptions.sortBy;
    setSearchParams(params, { replace: true });
    setCurrentPage(1);
  }, [filterOptions, setSearchParams]);

  // Compute available years
  const availableYears = useMemo(() => {
    return paperService.getAvailableYears();
  }, [papers]);

  // Filter papers using paperService
  const filteredPapers = useMemo(() => {
    return paperService.filterPapers(filterOptions);
  }, [filterOptions, papers]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPapers.length / itemsPerPage) || 1;
  const paginatedPapers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPapers.slice(start, start + itemsPerPage);
  }, [filteredPapers, currentPage, itemsPerPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Context */}
      <div>
        <h1 className="text-3xl font-black text-deep-charcoal tracking-tight">
          Browse Question Papers
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore past examination questions, model answers, and university archives.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <SearchFilterBar
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        categories={categories}
        availableYears={availableYears}
        totalResults={filteredPapers.length}
      />

      {/* Papers Grid or Empty State */}
      {paginatedPapers.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginatedPapers.map((paper) => (
              <QuestionPaperCard key={paper.id} paper={paper} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1 font-mono text-xs">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-8 h-8 rounded-xl font-bold transition-colors cursor-pointer ${
                        currentPage === pNum
                          ? 'bg-electric-violet text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-soft-lavender text-electric-violet flex items-center justify-center mx-auto">
            <FileQuestion className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-deep-charcoal">No question papers found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't find any papers matching your current search or filter combinations. Try clearing some filters or searching for broader terms.
          </p>
          <button
            onClick={() =>
              setFilterOptions({
                searchQuery: '',
                category: 'all',
                year: 'all',
                sortBy: 'newest',
              })
            }
            className="px-4 py-2 bg-electric-violet text-white text-xs font-bold rounded-xl hover:bg-electric-violet-hover transition-colors shadow-xs cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
