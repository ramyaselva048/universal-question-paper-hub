import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePapers } from '../../context/PaperContext';
import { formatFileSize, generateMinimalExamPdfBlob } from '../../utils/pdfGenerator';
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowRight,
  HardDrive,
  Calendar,
  Layers,
} from 'lucide-react';

export const AdminUploadPage: React.FC = () => {
  const { categories, createPaper, openPdfViewer } = usePapers();
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [year, setYear] = useState<string>('');
  const [description, setDescription] = useState('');

  // File states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload UI state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorMessage('Invalid file format. Please upload a valid PDF document (.pdf).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 25MB limit. Please upload a smaller PDF.');
      return;
    }

    setSelectedFile(file);

    // Read as Data URL for storage/preview
    const reader = new FileReader();
    reader.onload = () => {
      setFileDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileDataUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setErrorMessage('Question Paper Title is required.');
      return;
    }

    if (!selectedFile) {
      setErrorMessage('Please select or drag-and-drop a PDF file to upload.');
      return;
    }

    const finalCategory =
      category === '__custom__' ? customCategory.trim() : category.trim();

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      try {
        const created = createPaper({
          title: title.trim(),
          category: finalCategory || undefined,
          year: year.trim() ? year.trim() : undefined,
          description: description.trim() || undefined,
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
          fileDataUrl: fileDataUrl || undefined,
        });

        setIsUploading(false);
        setSuccessMessage(`Question paper "${created.title}" successfully added to the repository!`);

        // Reset form
        setTitle('');
        setCategory('');
        setCustomCategory('');
        setYear('');
        setDescription('');
        setSelectedFile(null);
        setFileDataUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (err: unknown) {
        setIsUploading(false);
        const e = err as { message?: string };
        setErrorMessage(e.message || 'Failed to complete paper upload.');
      }
    }, 1000);
  };

  // Preview dummy object for previewing modal
  const handlePreviewCurrent = () => {
    if (!title && !selectedFile) return;
    openPdfViewer({
      id: 'preview-temp',
      title: title || selectedFile?.name || 'Uploaded Question Paper Preview',
      category: category === '__custom__' ? customCategory : category || 'General Examination',
      year: year || '2025',
      fileName: selectedFile?.name || 'document.pdf',
      fileSize: selectedFile?.size || 1048576,
      fileUrl: fileDataUrl || '',
      downloadCount: 0,
      viewCount: 1,
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-electric-violet font-mono">
          New Document
        </span>
        <h1 className="text-2xl font-black text-white mt-1">Upload Question Paper</h1>
        <p className="text-xs text-slate-400 mt-1">
          Add any type of question paper in PDF format (school, college, university, government, competitive, or entrance examinations).
        </p>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 bg-fresh-teal/15 border border-fresh-teal/30 rounded-2xl flex items-start justify-between gap-3 text-fresh-teal text-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{successMessage}</p>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/admin/papers')}
                  className="font-bold underline hover:text-white cursor-pointer"
                >
                  Go to Manage Papers &rarr;
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-fresh-teal hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-500/15 border border-rose-500/30 rounded-2xl flex items-start justify-between gap-3 text-rose-300 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-rose-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="bg-[#181C2E] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Field 1: Title (Required) */}
        <div>
          <label className="block text-xs font-bold text-slate-200 mb-2">
            Question Paper Title <span className="text-coral-pink">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Advanced Operating Systems End-Semester Final Examination"
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-electric-violet focus:ring-2 focus:ring-electric-violet/20"
          />
        </div>

        {/* Row: Category & Year (Both Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Field 2: Category (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">
              Category <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-hidden focus:border-electric-violet focus:ring-2 focus:ring-electric-violet/20"
            >
              <option value="">No Category / General</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
              <option value="__custom__">+ Enter Custom Category</option>
            </select>

            {category === '__custom__' && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Type new category name"
                className="mt-2 w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500"
              />
            )}
          </div>

          {/* Field 3: Year (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">
              Examination Year <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2024 or 2023-24"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono text-white placeholder:text-slate-500 focus:outline-hidden focus:border-electric-violet focus:ring-2 focus:ring-electric-violet/20"
            />
          </div>
        </div>

        {/* Field 4: Description (Optional) */}
        <div>
          <label className="block text-xs font-bold text-slate-200 mb-2">
            Description / Syllabus Details <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Briefly describe topics tested, marks distribution, or examination notes..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-electric-violet focus:ring-2 focus:ring-electric-violet/20 leading-relaxed"
          />
        </div>

        {/* Field 5: PDF File Upload (Required) */}
        <div>
          <label className="block text-xs font-bold text-slate-200 mb-2">
            PDF File <span className="text-coral-pink">*</span>
          </label>

          {!selectedFile ? (
            /* Drag and Drop Box */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-electric-violet bg-electric-violet/10'
                  : 'border-slate-700 hover:border-slate-500 bg-slate-900/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-electric-violet/20 text-electric-violet flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white mb-1">
                Drag and drop question paper PDF here
              </p>
              <p className="text-xs text-slate-400 mb-4">
                or click to browse files from your computer (Max 25MB)
              </p>
              <span className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl border border-slate-700 transition-colors">
                Browse Files
              </span>
            </div>
          ) : (
            /* File selected preview container */
            <div className="p-4 bg-slate-900 border border-slate-700 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-fresh-teal/20 text-fresh-teal flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {formatFileSize(selectedFile.size)} · Valid PDF Document
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviewCurrent}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-sunshine-yellow" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Remove selected file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Upload Progress Bar if submitting */}
        {isUploading && (
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>Uploading and indexing question paper...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-electric-violet rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/papers')}
            className="px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-electric-violet hover:bg-electric-violet-hover text-white text-xs font-bold rounded-xl shadow-lg shadow-electric-violet/25 transition-all cursor-pointer disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isUploading ? 'Uploading Paper...' : 'Upload & Publish Paper'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
