import React, { useState, useMemo } from 'react';
import { usePapers } from '../../context/PaperContext';
import { QuestionPaper, Category } from '../../types';
import { formatFileSize, formatDate } from '../../utils/pdfGenerator';
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Download,
  X,
  CheckCircle2,
  AlertTriangle,
  Upload,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';

export const AdminManagePapersPage: React.FC = () => {
  const { papers, categories, updatePaper, deletePaper, openPdfViewer, downloadPaper } = usePapers();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Edit Modal State
  const [editingPaper, setEditingPaper] = useState<QuestionPaper | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [replacementFile, setReplacementFile] = useState<File | null>(null);
  const [replacementDataUrl, setReplacementDataUrl] = useState<string | null>(null);

  // Delete Dialog State
  const [deletingPaper, setDeletingPaper] = useState<QuestionPaper | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Available years
  const availableYears = useMemo(() => {
    const set = new Set<string>();
    papers.forEach((p) => {
      if (p.year) set.add(String(p.year));
    });
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [papers]);

  // Filtered papers
  const filtered = useMemo(() => {
    return papers.filter((p) => {
      const matchSearch =
        !searchTerm.trim() ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase().trim()));

      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchYear = selectedYear === 'all' || String(p.year) === selectedYear;

      return matchSearch && matchCat && matchYear;
    });
  }, [papers, searchTerm, selectedCategory, selectedYear]);

  // Paginated
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Open Edit Modal
  const startEditing = (paper: QuestionPaper) => {
    setEditingPaper(paper);
    setEditTitle(paper.title);
    setEditCategory(paper.category || '');
    setEditYear(paper.year ? String(paper.year) : '');
    setEditDescription(paper.description || '');
    setReplacementFile(null);
    setReplacementDataUrl(null);
  };

  // Replacement File Handler
  const handleReplacementFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReplacementFile(file);
      const reader = new FileReader();
      reader.onload = () => setReplacementDataUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPaper) return;

    const updates: Partial<Omit<QuestionPaper, 'id' | 'uploadedAt'>> & {
      fileBlob?: Blob;
      fileDataUrl?: string;
    } = {
      title: editTitle.trim(),
      category: editCategory.trim() || undefined,
      year: editYear.trim() ? editYear.trim() : undefined,
      description: editDescription.trim() || undefined,
    };

    if (replacementFile) {
      updates.fileName = replacementFile.name;
      updates.fileSize = replacementFile.size;
      if (replacementDataUrl) updates.fileDataUrl = replacementDataUrl;
    }

    updatePaper(editingPaper.id, updates);
    setEditingPaper(null);
    setFeedbackMessage(`Paper "${editTitle}" successfully updated.`);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deletingPaper) return;
    deletePaper(deletingPaper.id);
    setFeedbackMessage(`Paper "${deletingPaper.title}" was deleted.`);
    setDeletingPaper(null);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-electric-violet font-mono">
          Inventory
        </span>
        <h1 className="text-2xl font-black text-white mt-1">Manage Question Papers</h1>
        <p className="text-xs text-slate-400 mt-1">
          Search, update title, replace PDF files, or delete existing question papers in the system.
        </p>
      </div>

      {/* Feedback banner */}
      {feedbackMessage && (
        <div className="p-3.5 bg-fresh-teal/15 border border-fresh-teal/30 rounded-xl text-xs text-fresh-teal flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
          <button onClick={() => setFeedbackMessage(null)} className="text-fresh-teal hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-[#181C2E] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search papers by title or category..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-electric-violet"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-hidden focus:border-electric-violet cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-300 focus:outline-hidden focus:border-electric-violet cursor-pointer"
          >
            <option value="all">All Years</option>
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Papers Table */}
      <div className="bg-[#181C2E] border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Title & Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Year</th>
                <th className="py-3.5 px-4">File Size</th>
                <th className="py-3.5 px-4 text-center">Downloads</th>
                <th className="py-3.5 px-4 text-center">Views</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {paginated.length > 0 ? (
                paginated.map((paper) => (
                  <tr key={paper.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 max-w-xs">
                      <p className="font-bold text-white leading-snug line-clamp-1" title={paper.title}>
                        {paper.title}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                        {paper.fileName}
                      </p>
                    </td>

                    <td className="py-4 px-4 text-slate-400">
                      {paper.category || 'General'}
                    </td>

                    <td className="py-4 px-4 font-mono tabular-nums text-slate-400">
                      {paper.year || '—'}
                    </td>

                    <td className="py-4 px-4 font-mono tabular-nums text-slate-400">
                      {formatFileSize(paper.fileSize)}
                    </td>

                    <td className="py-4 px-4 text-center font-mono tabular-nums text-fresh-teal font-semibold">
                      {(paper.downloadCount || 0).toLocaleString()}
                    </td>

                    <td className="py-4 px-4 text-center font-mono tabular-nums text-sunshine-yellow">
                      {(paper.viewCount || 0).toLocaleString()}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openPdfViewer(paper)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="View PDF"
                        >
                          <Eye className="w-4 h-4 text-sunshine-yellow" />
                        </button>
                        <button
                          onClick={() => downloadPaper(paper)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4 text-fresh-teal" />
                        </button>
                        <button
                          onClick={() => startEditing(paper)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Edit Paper"
                        >
                          <Edit2 className="w-4 h-4 text-electric-violet" />
                        </button>
                        <button
                          onClick={() => setDeletingPaper(paper)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Paper"
                        >
                          <Trash2 className="w-4 h-4 text-rose-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No matching question papers found in repository.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} papers
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg disabled:opacity-40 cursor-pointer"
              >
                Prev
              </button>
              <span className="font-mono text-white">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#181C2E] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-electric-violet" />
                <span>Edit Question Paper</span>
              </h3>
              <button
                onClick={() => setEditingPaper(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-electric-violet"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-electric-violet"
                  >
                    <option value="">No Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Year</label>
                  <input
                    type="text"
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-hidden focus:border-electric-violet"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-electric-violet"
                />
              </div>

              {/* Replace PDF */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Replace PDF File (Optional)
                </label>
                <div className="p-3 bg-slate-900 border border-dashed border-slate-700 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-400 truncate max-w-[200px]">
                    {replacementFile ? replacementFile.name : 'Keep current file: ' + editingPaper.fileName}
                  </span>
                  <label className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg cursor-pointer font-semibold">
                    <span>Browse</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleReplacementFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPaper(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-electric-violet hover:bg-electric-violet-hover text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#181C2E] border border-rose-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white mb-2">Delete Question Paper?</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Are you sure you want to permanently delete{' '}
              <strong className="text-white">"{deletingPaper.title}"</strong>? This will remove the document and its download records.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingPaper(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
