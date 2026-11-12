import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Eye, EyeOff, Shield, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, admin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in as admin, redirect to dashboard
  if (admin) {
    navigate('/admin/dashboard', { replace: true });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username.trim()) {
      setErrorMsg('Please enter your administrator username.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your administrator password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsLoading(false);
      if (res.success) {
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
        navigate(from, { replace: true });
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please verify credentials.');
      }
    }, 400);
  };

  const fillDemoCredentials = () => {
    setUsername('admin');
    setPassword('AdminPassword@2025');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0F121E] text-slate-100">
      <div className="max-w-md w-full bg-[#181C2E] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Top vibrant border stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-electric-violet via-coral-pink to-sunshine-yellow" />

        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-electric-violet/20 text-electric-violet border border-electric-violet/30 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Administrator Portal
          </h1>
          <p className="text-xs text-slate-400">
            Sign in with administrative credentials to manage question papers and system settings.
          </p>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Admin Username
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 absolute left-3.5 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-electric-violet focus:ring-2 focus:ring-electric-violet/20 transition-all"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3.5 text-slate-500 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-electric-violet focus:ring-2 focus:ring-electric-violet/20 transition-all"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-slate-500 hover:text-slate-300 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-electric-violet hover:bg-electric-violet-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-electric-violet/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as Administrator</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Credentials Helper Box */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center space-y-3">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-300">Default Demo Credentials:</span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-[11px] font-bold text-electric-violet hover:underline cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <p className="font-mono text-slate-400 text-[11px]">
              Username: <span className="text-white font-semibold">admin</span>
            </p>
            <p className="font-mono text-slate-400 text-[11px]">
              Password: <span className="text-white font-semibold">AdminPassword@2025</span>
            </p>
          </div>

          <p className="text-[11px] text-slate-500">
            Public users must sign in via{' '}
            <Link to="/" className="text-electric-violet hover:underline font-semibold">
              Google Sign-In on the Homepage
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
