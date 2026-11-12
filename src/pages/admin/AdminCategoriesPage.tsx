import React, { useState } from 'react';
import { usePapers } from '../../context/PaperContext';
import { Category } from '../../types';
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Layers,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, categoryCounts, createCategory, updateCategory, deleteCategory } = usePapers();

  // New Category State
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Edit Category State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Feedback State
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    // Check duplicate
    if (categories.some((c) => c.name.toLowerCase() === newName.trim().toLowerCase())) {
      setFeedback({ type: 'error', message: `Category "${newName}" already exists.` });
      return;
    }

    createCategory(newName.trim(), newDescription.trim() || undefined);
    setNewName('');
    setNewDescription('');
    setIsAdding(false);
    setFeedback({ type: 'success', message: 'Category added successfully.' });
    setTimeout(() => setFeedback(null), 3000);
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description || '');
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) return;
    updateCategory(id, editName.trim(), editDesc.trim() || undefined);
    setEditingId(null);
    setFeedback({ type: 'success', message: 'Category updated successfully.' });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = (cat: Category) => {
    const count = categoryCounts[cat.name] || 0;
    const confirmMsg =
      count > 0
        ? `Category "${cat.name}" has ${count} associated paper(s). Are you sure you want to delete it?`
        : `Delete category "${cat.name}"?`;

    if (window.confirm(confirmMsg)) {
      deleteCategory(cat.id);
      setFeedback({ type: 'success', message: `Category "${cat.name}" deleted.` });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-coral-pink font-mono">
            Taxonomy
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Manage Categories</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure examination categories and track document counts per discipline.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-electric-violet hover:bg-electric-violet-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? 'Cancel' : 'Add New Category'}</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-fresh-teal/15 border border-fresh-teal/30 text-fresh-teal'
              : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Add New Category Form Drawer */}
      {isAdding && (
        <form
          onSubmit={handleCreate}
          className="bg-[#181C2E] border border-electric-violet/40 rounded-2xl p-5 space-y-4 animate-fadeIn"
        >
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-electric-violet" />
            <span>Create New Academic Category</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Polytechnic Diplomas"
                required
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-electric-violet"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Brief summary of included tests"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-electric-violet"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-electric-violet text-white text-xs font-bold rounded-xl shadow-xs hover:bg-electric-violet-hover"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => {
          const count = categoryCounts[category.name] || 0;
          const isCurrentEditing = editingId === category.id;

          return (
            <div
              key={category.id}
              className="bg-[#181C2E] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              {isCurrentEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-electric-violet"
                  />
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Category description"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-electric-violet"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(category.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-fresh-teal text-slate-900 font-bold text-xs rounded-lg"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 text-electric-violet flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white">{category.name}</h3>
                        {category.description && (
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <span className="font-mono tabular-nums text-xs font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800 shrink-0">
                      {count} {count === 1 ? 'Paper' : 'Papers'}
                    </span>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                    <button
                      onClick={() => startEdit(category)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-electric-violet" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
