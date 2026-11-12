import React from 'react';
import { usePapers } from '../../context/PaperContext';
import { formatFileSize, formatDate } from '../../utils/pdfGenerator';
import {
  BarChart3,
  Download,
  Eye,
  TrendingUp,
  FileText,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const AdminStatsPage: React.FC = () => {
  const { papers, categories, categoryCounts, openPdfViewer } = usePapers();

  const totalDownloads = papers.reduce((sum, p) => sum + (p.downloadCount || 0), 0);
  const totalViews = papers.reduce((sum, p) => sum + (p.viewCount || 0), 0);
  const avgDownloadsPerPaper = papers.length ? Math.round(totalDownloads / papers.length) : 0;

  // Ranked papers by downloads
  const rankedPapers = [...papers]
    .sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
    .slice(0, 10);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-fresh-teal font-mono">
          Analytics
        </span>
        <h1 className="text-2xl font-black text-white mt-1">Download & Usage Statistics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Detailed metrics on student engagement, reading volume, and high-demand examination papers.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#181C2E] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
            <span>Cumulative Downloads</span>
            <Download className="w-4 h-4 text-fresh-teal" />
          </div>
          <div className="text-3xl font-black text-white font-mono tabular-nums">
            {totalDownloads.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Across {papers.length} archived question papers
          </p>
        </div>

        <div className="bg-[#181C2E] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
            <span>Online In-Reader Views</span>
            <Eye className="w-4 h-4 text-sunshine-yellow" />
          </div>
          <div className="text-3xl font-black text-white font-mono tabular-nums">
            {totalViews.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Browser PDF viewport sessions
          </p>
        </div>

        <div className="bg-[#181C2E] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
            <span>Average Downloads / Paper</span>
            <TrendingUp className="w-4 h-4 text-electric-violet" />
          </div>
          <div className="text-3xl font-black text-white font-mono tabular-nums">
            {avgDownloadsPerPaper.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            High student retention and usage
          </p>
        </div>
      </div>

      {/* Top 10 Most Downloaded Papers */}
      <div className="bg-[#181C2E] border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Top 10 Most Downloaded Question Papers</h3>
            <p className="text-xs text-slate-400">Ranked by verified candidate downloads</p>
          </div>
          <span className="text-xs text-fresh-teal font-mono font-bold">Live Counter</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Question Paper Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4 text-right">Downloads</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {rankedPapers.length > 0 ? (
                rankedPapers.map((paper, idx) => (
                  <tr key={paper.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-400">
                      #{idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white max-w-sm truncate">
                      {paper.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {paper.category || 'General'}
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-slate-400">
                      {paper.year || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold tabular-nums text-fresh-teal">
                      {(paper.downloadCount || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openPdfViewer(paper)}
                        className="px-2.5 py-1 bg-electric-violet/15 hover:bg-electric-violet/30 text-electric-violet rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No question papers in the repository yet. Download rankings will appear here as materials are uploaded and accessed.
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
