import React from 'react';
import { FilterOptions, Category } from '../types';
import { Search, X, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';

interface SearchFilterBarProps {
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  categories: Category[];
  availableYears: string[];
  totalResults: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filterOptions,
  setFilterOptions,
  categories,
  availableYears,
  totalResults,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions((prev) => ({ ...prev, year: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions((prev) => ({
      ...prev,
      sortBy: e.target.value as FilterOptions['sortBy'],
    }));
  };

  const clearAllFilters = () => {
    setFilterOptions({
      searchQuery: '',
      category: 'all',
      year: 'all',
      sortBy: 'newest',
    });
  };

  const isFiltered =
    Boolean(filterOptions.searchQuery) ||
    filterOptions.category !== 'all' ||
    filterOptions.year !== 'all' ||
    filterOptions.sortBy !== 'newest';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-4">
      {/* Search Bar Input Row */}
      <div className="relative flex items-center">
        <Search className="w-5 h-5 absolute left-3.5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={filterOptions.searchQuery}
          onChange={handleSearchChange}
          placeholder="Search question papers by title, subject, or keywords..."
          className="w-full pl-11 pr-10 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric-violet/20 focus:border-electric-violet transition-all text-deep-charcoal placeholder:text-slate-400"
        />
        {filterOptions.searchQuery && (
          <button
            onClick={() => setFilterOptions((prev) => ({ ...prev, searchQuery: '' }))}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            title="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters and Sorting Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Filter */}
          <div className="relative min-w-[160px] flex-1 sm:flex-none">
            <select
              value={filterOptions.category}
              onChange={handleCategoryChange}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-electric-violet/20 text-slate-700 cursor-pointer appearance-none pr-8 transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              ▾
            </span>
          </div>

          {/* Year Filter */}
          <div className="relative min-w-[110px] flex-1 sm:flex-none">
            <select
              value={filterOptions.year}
              onChange={handleYearChange}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-electric-violet/20 text-slate-700 cursor-pointer appearance-none pr-7 transition-colors font-mono"
            >
              <option value="all">All Years</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              ▾
            </span>
          </div>

          {/* Clear Filters Button if any active */}
          {isFiltered && (
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Sort and Result Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            Showing <strong className="text-deep-charcoal font-bold">{totalResults}</strong> papers
          </span>

          <div className="relative min-w-[150px]">
            <select
              value={filterOptions.sortBy}
              onChange={handleSortChange}
              className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-electric-violet/20 text-slate-700 cursor-pointer appearance-none pr-7 transition-colors"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="most_downloaded">Sort: Most Downloaded</option>
              <option value="most_viewed">Sort: Most Viewed</option>
              <option value="title_asc">Sort: Title (A-Z)</option>
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              ▾
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
