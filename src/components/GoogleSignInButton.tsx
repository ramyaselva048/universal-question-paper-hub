import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface GoogleSignInButtonProps {
  className?: string;
  variant?: 'primary' | 'outline' | 'compact';
  onSuccess?: () => void;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  className = '',
  variant = 'primary',
  onSuccess,
}) => {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await signInWithGoogle();
      if (res.success && res.user) {
        if (onSuccess) onSuccess();
        navigate('/user/dashboard');
      } else if (res.error && res.error !== 'FIREBASE_NOT_CONFIGURED') {
        setErrorMsg(res.error);
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      setErrorMsg(e.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const baseStyle =
    'inline-flex items-center justify-center gap-3 font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.98] whitespace-nowrap';

  let variantStyle = 'bg-white text-deep-charcoal border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 px-4 py-2.5 rounded-xl text-sm font-semibold';

  if (variant === 'compact') {
    variantStyle = 'bg-white text-deep-charcoal border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-50';
  } else if (variant === 'outline') {
    variantStyle = 'bg-white/90 backdrop-blur-xs text-deep-charcoal border border-slate-300 shadow-sm hover:bg-white hover:border-electric-violet px-5 py-3 rounded-xl text-sm font-semibold';
  }

  return (
    <div className="inline-flex flex-col items-center">
      <button
        type="button"
        onClick={handleSignIn}
        disabled={loading}
        className={`${baseStyle} ${variantStyle} ${className} disabled:opacity-70 disabled:cursor-not-allowed`}
        title="Sign in with your Google Account"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-electric-violet border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.28-2.1 3.66-5.2 3.66-9.12z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.41 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.24C.45 8.15 0 9.97 0 12s.45 3.85 1.24 5.43l4.04-3.14z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.59 1.24 6.57l4.04 3.14c.95-2.83 3.6-4.96 6.72-4.96z"
            />
          </svg>
        )}
        <span>{loading ? 'Connecting to Google...' : 'Sign in with Google'}</span>
      </button>

      {errorMsg && (
        <span className="text-xs text-rose-600 mt-1.5 font-medium">{errorMsg}</span>
      )}
    </div>
  );
};
