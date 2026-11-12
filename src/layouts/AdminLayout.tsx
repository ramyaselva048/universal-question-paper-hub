import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PdfViewerModal } from '../components/PdfViewerModal';
import {
  LayoutDashboard,
  UploadCloud,
  Files,
  FolderTree,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  Shield,
  ExternalLink,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Upload Question Paper', path: '/admin/upload', icon: UploadCloud },
    { label: 'Manage Question Papers', path: '/admin/papers', icon: Files },
    { label: 'Manage Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Download Statistics', path: '/admin/stats', icon: BarChart3 },
    { label: 'Account Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modern Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#181C2E] border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Admin Header Wordmark */}
          <div className="h-18 px-6 flex items-center justify-between border-b border-slate-800/80">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-electric-violet flex items-center justify-center text-white shadow-md">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-white">
                  UQPH <span className="text-sunshine-yellow">Control</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Administrator Suite</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin Session Badge */}
          <div className="px-6 py-4 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sunshine-yellow">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {admin?.username || 'Administrator'}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-fresh-teal font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-fresh-teal inline-block" />
                  <span>Authenticated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-electric-violet text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Controls */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Public Website</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0F121E]">
        {/* Top Header */}
        <header className="h-18 px-4 sm:px-8 border-b border-slate-800/80 bg-[#141829]/70 backdrop-blur-md flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs text-slate-400">Admin Control Console</span>
              <h1 className="text-sm font-bold text-white">Universal Question Paper Management</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/upload"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-electric-violet hover:bg-electric-violet-hover rounded-xl shadow-xs transition-colors"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Paper</span>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <PdfViewerModal />
    </div>
  );
};
