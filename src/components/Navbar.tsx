import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleSignInButton } from './GoogleSignInButton';
import {
  FileText,
  Menu,
  X,
  Lock,
  User,
  Heart,
  Download,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, admin, logoutUser, logoutAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Browse Papers', path: '/browse' },
    { label: 'Categories', path: '/categories' },
    { label: 'About', path: '/about' },
  ];

  const handleUserLogout = async () => {
    setUserDropdownOpen(false);
    await logoutUser();
    navigate('/');
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-8">
          {/* Zone 1: Brand Wordmark & Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-deep-charcoal group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-violet to-coral-pink flex items-center justify-center text-white shadow-md shadow-electric-violet/20 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-deep-charcoal">
                Universal<span className="text-electric-violet font-black">Papers</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Question Paper Hub
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors whitespace-nowrap relative py-1 hover:text-electric-violet ${
                  isActive(link.path)
                    ? 'text-electric-violet font-bold'
                    : 'text-slate-600'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-violet rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Actions & User / Admin Profile */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* If Admin is logged in */}
            {admin ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/dashboard"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-deep-charcoal rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <LayoutDashboard className="w-4 h-4 text-sunshine-yellow" />
                  <span>Admin Panel</span>
                </Link>
                <button
                  onClick={handleAdminLogout}
                  title="Sign out Admin"
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : user ? (
              /* If Public User is logged in */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-2.5 pr-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <img
                    src={user.photoURL || '/src/assets/images/user_avatar_student_1794485735691.jpg'}
                    alt={user.displayName || 'User Profile'}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-electric-violet/20"
                  />
                  <span className="text-xs font-semibold text-deep-charcoal max-w-[120px] truncate">
                    {user.displayName || 'Student'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-deep-charcoal truncate">
                        {user.displayName}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/user/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-deep-charcoal hover:bg-soft-lavender hover:text-electric-violet transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-electric-violet" />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      to="/user/downloads"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-deep-charcoal hover:bg-soft-lavender hover:text-electric-violet transition-colors"
                    >
                      <Download className="w-4 h-4 text-fresh-teal" />
                      <span>My Downloads</span>
                    </Link>

                    <Link
                      to="/user/favourites"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-deep-charcoal hover:bg-soft-lavender hover:text-electric-violet transition-colors"
                    >
                      <Heart className="w-4 h-4 text-coral-pink" />
                      <span>Favourite Papers</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={handleUserLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* If Guest: Admin Login Link & Google Sign-In button */
              <div className="flex items-center gap-4">
                <Link
                  to="/admin/login"
                  className="text-xs font-semibold text-slate-500 hover:text-deep-charcoal flex items-center gap-1.5 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Admin Login</span>
                </Link>
                <GoogleSignInButton variant="compact" />
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            {!user && !admin && (
              <GoogleSignInButton variant="compact" />
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-deep-charcoal hover:bg-slate-100 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive(link.path)
                    ? 'bg-soft-lavender text-electric-violet'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
                  <img
                    src={user.photoURL || '/src/assets/images/user_avatar_student_1794485735691.jpg'}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-deep-charcoal truncate">{user.displayName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/user/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  <LayoutDashboard className="w-4 h-4 text-electric-violet" />
                  <span>User Dashboard</span>
                </Link>
                <Link
                  to="/user/downloads"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  <Download className="w-4 h-4 text-fresh-teal" />
                  <span>My Downloads</span>
                </Link>
                <Link
                  to="/user/favourites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  <Heart className="w-4 h-4 text-coral-pink" />
                  <span>Favourites</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleUserLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : admin ? (
              <div className="space-y-2">
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-deep-charcoal rounded-xl"
                >
                  <LayoutDashboard className="w-4 h-4 text-sunshine-yellow" />
                  <span>Admin Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAdminLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Admin</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-deep-charcoal bg-slate-100 rounded-xl"
                >
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
