import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PdfViewerModal } from '../components/PdfViewerModal';
import {
  LayoutDashboard,
  Search,
  Download,
  Heart,
  History,
  LogOut,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const UserLayout: React.FC = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const navTabs = [
    { label: 'Overview', path: '/user/dashboard', icon: LayoutDashboard },
    { label: 'My Downloads', path: '/user/downloads', icon: Download },
    { label: 'Favourites', path: '/user/favourites', icon: Heart },
    { label: 'Recently Viewed', path: '/user/history', icon: History },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFD] text-deep-charcoal">
      <Navbar />

      {/* User Dashboard Hero Strip */}
      <div className="bg-gradient-to-r from-soft-lavender via-white to-soft-lavender border-b border-slate-200/80 pt-8 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL || '/src/assets/images/user_avatar_student_1794485735691.jpg'}
              alt={user?.displayName || 'User'}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-md shadow-electric-violet/10"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-deep-charcoal">
                  Welcome back, {user?.displayName || 'Student'}!
                </h1>
                <span className="text-xs font-semibold text-electric-violet bg-soft-lavender px-2 py-0.5 rounded-md border border-electric-violet/20 hidden sm:inline">
                  Google Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {user?.email} · Ready to continue your exam preparation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-electric-violet hover:bg-electric-violet-hover rounded-xl shadow-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Browse All Papers</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.path === '/user/dashboard'}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-electric-violet text-white shadow-xs'
                      : 'text-slate-600 hover:text-deep-charcoal hover:bg-white/80'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Main Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <Footer />
      <PdfViewerModal />
    </div>
  );
};
