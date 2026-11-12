import React from 'react';
import { Link } from 'react-router-dom';
import { usePapers } from '../../context/PaperContext';
import { formatFileSize, formatDate } from '../../utils/pdfGenerator';
import {
  BookOpen,
  Download,
  Layers,
  Eye,
  UploadCloud,
  FolderTree,
  ArrowRight,
  TrendingUp,
  FileText,
  Activity,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { papers, categories, categoryCounts, openPdfViewer } = usePapers();

  const totalDownloads = papers.reduce((acc, p) => acc + (p.downloadCount || 0), 0);
  const totalViews = papers.reduce((acc, p) => acc + (p.viewCount || 0), 0);
  const totalPapers = papers.length;
  const totalCategories = categories.length;

  const recentPapers = [...papers]
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 5);

  // Top categories by count
  const topCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-electric-violet/20 via-slate-800 to-transparent p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sunshine-yellow font-mono">
            System Operational
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Universal Question Paper Repository Overview
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage academic papers, monitor repository traffic, and configure platform taxonomy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/upload"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-electric-violet hover:bg-electric-violet-hover text-white text-xs font-bold rounded-xl shadow-lg shadow-electric-violet/25 transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New Paper</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Uploaded Papers */}
        <div className="bg-[#181C2E] border border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Papers
            </span>
            <div className="w-8 h-8 rounded-lg bg-electric-violet/20 text-electric-violet flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono tabular-nums">
            {totalPapers}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
            <span className="text-fresh-teal font-semibold font-mono">100% active</span> across database
          </p>
        </div>

        {/* Total Downloads */}
        <div className="bg-[#181C2E] border border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Downloads
            </span>
            <div className="w-8 h-8 rounded-lg bg-fresh-teal/20 text-fresh-teal flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono tabular-nums">
            {totalDownloads.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-fresh-teal" />
            <span className="text-fresh-teal font-semibold font-mono">+18%</span> this month
          </p>
        </div>

        {/* Total Categories */}
        <div className="bg-[#181C2E] border border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Categories
            </span>
            <div className="w-8 h-8 rounded-lg bg-coral-pink/20 text-coral-pink flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono tabular-nums">
            {totalCategories}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            Active examination taxonomies
          </p>
        </div>

        {/* Total Views */}
        <div className="bg-[#181C2E] border border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Online Views
            </span>
            <div className="w-8 h-8 rounded-lg bg-sunshine-yellow/20 text-sunshine-yellow flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono tabular-nums">
            {totalViews.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            In-browser PDF reader sessions
          </p>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Distribution Chart */}
        <div className="lg:col-span-7 bg-[#181C2E] border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Repository Distribution by Discipline</h3>
              <p className="text-xs text-slate-400">Paper count across primary educational categories</p>
            </div>
            <Link
              to="/admin/categories"
              className="text-xs font-bold text-electric-violet hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {topCategories.length > 0 ? (
            <div className="space-y-3 pt-2">
              {topCategories.map(([catName, count], idx) => {
                const percentage = Math.round((count / (totalPapers || 1)) * 100);
                const barColors = [
                  'bg-electric-violet',
                  'bg-fresh-teal',
                  'bg-coral-pink',
                  'bg-sunshine-yellow',
                  'bg-indigo-400',
                ];
                const color = barColors[idx % barColors.length];

                return (
                  <div key={catName} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium truncate max-w-[280px]">
                        {catName}
                      </span>
                      <span className="font-mono text-slate-400 tabular-nums">
                        {count} papers ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              <Layers className="w-6 h-6 mx-auto mb-2 text-slate-500" />
              <p>No question papers or categories uploaded yet.</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Distribution will appear as soon as papers are added.</p>
            </div>
          )}
        </div>

        {/* Quick Admin Actions & Status */}
        <div className="lg:col-span-5 bg-[#181C2E] border border-slate-800 rounded-3xl p-6 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-white">Quick Administration Actions</h3>
            <p className="text-xs text-slate-400">Frequently performed operational tasks</p>
          </div>

          <div className="space-y-3">
            <Link
              to="/admin/upload"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-electric-violet/50 hover:bg-slate-800/60 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-electric-violet/20 text-electric-violet flex items-center justify-center">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-electric-violet transition-colors">
                    Upload Question Paper
                  </h4>
                  <p className="text-[11px] text-slate-500">Drag & drop new PDF document</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/admin/papers"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-fresh-teal/50 hover:bg-slate-800/60 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-fresh-teal/20 text-fresh-teal flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-fresh-teal transition-colors">
                    Manage Existing Papers
                  </h4>
                  <p className="text-[11px] text-slate-500">Edit metadata, replace PDF, delete</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/admin/categories"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-coral-pink/50 hover:bg-slate-800/60 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-coral-pink/20 text-coral-pink flex items-center justify-center">
                  <FolderTree className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-coral-pink transition-colors">
                    Configure Categories
                  </h4>
                  <p className="text-[11px] text-slate-500">Add or rename study streams</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recently Uploaded Papers Table */}
      <div className="bg-[#181C2E] border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Recently Uploaded Papers</h3>
            <p className="text-xs text-slate-400">Latest additions to the global archive</p>
          </div>
          <Link
            to="/admin/papers"
            className="text-xs font-bold text-electric-violet hover:underline flex items-center gap-1"
          >
            <span>View All Papers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4 text-right">Downloads</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {recentPapers.length > 0 ? (
                recentPapers.map((paper) => (
                  <tr key={paper.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white max-w-[280px] truncate">
                      {paper.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {paper.category || 'General'}
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-slate-400">
                      {paper.year || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-slate-400">
                      {formatFileSize(paper.fileSize)}
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-right text-fresh-teal font-semibold">
                      {(paper.downloadCount || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openPdfViewer(paper)}
                        className="px-2.5 py-1 text-[11px] font-bold text-electric-violet bg-electric-violet/10 hover:bg-electric-violet/20 rounded-lg transition-colors cursor-pointer"
                      >
                        View PDF
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No question papers uploaded yet. Click &quot;Upload New Paper&quot; to add your first document.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
