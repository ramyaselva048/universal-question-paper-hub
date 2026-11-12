import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { X, Key, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export const FirebaseStatusModal: React.FC = () => {
  const { showFirebaseHelper, setShowFirebaseHelper, signInWithDemoGoogleAccount } = useAuth();
  const [userName, setUserName] = useState('Monisha S');
  const [userEmail, setUserEmail] = useState('monishas0707@gmail.com');
  const navigate = useNavigate();

  if (!showFirebaseHelper) return null;

  const handleDemoSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithDemoGoogleAccount({
      name: userName,
      email: userEmail,
      avatarUrl: '/src/assets/images/user_avatar_student_1794485735691.jpg',
    });
    setShowFirebaseHelper(false);
    navigate('/user/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-charcoal/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Decorative subtle header line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-electric-violet via-coral-pink to-sunshine-yellow" />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-electric-violet/10 flex items-center justify-center text-electric-violet">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-deep-charcoal">Firebase Google Sign-In</h3>
              <p className="text-xs text-slate-500">Google Authentication Integration Ready</p>
            </div>
          </div>
          <button
            onClick={() => setShowFirebaseHelper(false)}
            className="text-slate-400 hover:text-deep-charcoal p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-sm text-slate-600 space-y-3 mb-5">
          <p>
            This application uses <strong>Firebase Authentication</strong> exclusively for public Google Sign-In.
          </p>
          <div className="p-3 bg-soft-lavender rounded-xl border border-electric-violet/15 text-xs text-deep-charcoal leading-relaxed">
            <div className="font-semibold text-electric-violet mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" /> Firebase Environment Setup
            </div>
            To connect your live Firebase project, set <code className="bg-white px-1.5 py-0.5 rounded text-electric-violet font-mono text-[11px]">VITE_FIREBASE_API_KEY</code> and related variables in your environment.
          </div>
          <p className="text-xs text-slate-500">
            For instant frontend demonstration, sign in using the simulated Google account below to test the full User Dashboard, PDF viewing, and downloading:
          </p>
        </div>

        <form onSubmit={handleDemoSignIn} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-deep-charcoal mb-1">
              Google Account Display Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-electric-violet/30 focus:border-electric-violet"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-deep-charcoal mb-1">
              Google Account Email
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-electric-violet/30 focus:border-electric-violet"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-electric-violet text-white font-medium text-sm rounded-xl hover:bg-electric-violet-hover transition-colors shadow-sm cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Continue with Google Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowFirebaseHelper(false)}
              className="px-4 py-2.5 text-sm text-slate-600 hover:text-deep-charcoal hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
