import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Settings,
  Shield,
  Key,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Lock,
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { admin, updateAdminSettings } = useAuth();

  const [username, setUsername] = useState(admin?.username || 'admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!currentPassword) {
      setFeedback({ type: 'error', message: 'Current password is required to authorize changes.' });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    if (newPassword && newPassword.length < 8) {
      setFeedback({ type: 'error', message: 'New password must be at least 8 characters long.' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = updateAdminSettings({
        currentPassword,
        newUsername: username.trim(),
        newPassword: newPassword || undefined,
      });

      setIsSubmitting(false);

      if (res.success) {
        setFeedback({
          type: 'success',
          message: 'Admin account credentials successfully updated.',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setFeedback({
          type: 'error',
          message: res.error || 'Failed to update credentials. Check your current password.',
        });
      }
    }, 400);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-sunshine-yellow font-mono">
          Security & Access
        </span>
        <h1 className="text-2xl font-black text-white mt-1">Admin Account Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage administrator username, password credentials, and security verification.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-3 ${
            feedback.type === 'success'
              ? 'bg-fresh-teal/15 border border-fresh-teal/30 text-fresh-teal'
              : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span className="font-medium">{feedback.message}</span>
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="bg-[#181C2E] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6"
      >
        {/* Username section */}
        <div className="space-y-4 pb-6 border-b border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <User className="w-4 h-4 text-electric-violet" />
            <span>Administrator Identity</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Admin Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-electric-violet"
            />
          </div>
        </div>

        {/* Password change section */}
        <div className="space-y-4 pb-6 border-b border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Key className="w-4 h-4 text-fresh-teal" />
            <span>Change Administrator Password</span>
          </h3>

          {/* New password */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              New Password <span className="text-slate-500 font-normal">(Leave blank to keep current)</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new admin password"
                className="w-full px-4 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-electric-violet font-mono"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 text-slate-500 hover:text-slate-300"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm new password */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                disabled={!newPassword}
                className="w-full px-4 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-electric-violet font-mono disabled:opacity-40"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 text-slate-500 hover:text-slate-300"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Verification section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Verify Current Password (Required to Save)</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Current Admin Password *
            </label>
            <div className="relative flex items-center">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password to confirm authorization"
                required
                className="w-full px-4 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-electric-violet font-mono"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 text-slate-500 hover:text-slate-300"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-electric-violet hover:bg-electric-violet-hover text-white text-xs font-bold rounded-xl shadow-lg shadow-electric-violet/25 transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Saving Settings...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
