import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, PublicUser } from '../types';
import { authService } from '../services/authService';
import { isFirebaseConfigured } from '../services/firebase';

interface AuthContextType {
  admin: AdminUser | null;
  user: PublicUser | null;
  isLoading: boolean;
  isFirebaseReady: boolean;
  loginAdmin: (user: string, pass: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  updateAdminSettings: (params: { currentPassword: string; newUsername?: string; newPassword?: string }) => { success: boolean; error?: string };
  signInWithGoogle: () => Promise<{ success: boolean; user?: PublicUser; error?: string; isDemo?: boolean }>;
  signInWithDemoGoogleAccount: (info?: { name: string; email: string; avatarUrl?: string }) => void;
  logoutUser: () => Promise<void>;
  showFirebaseHelper: boolean;
  setShowFirebaseHelper: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => authService.getCurrentAdmin());
  const [user, setUser] = useState<PublicUser | null>(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showFirebaseHelper, setShowFirebaseHelper] = useState<boolean>(false);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = authService.subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const loginAdmin = (username: string, pass: string) => {
    const res = authService.loginAdmin(username, pass);
    if (res.success && res.admin) {
      setAdmin(res.admin);
    }
    return res;
  };

  const logoutAdmin = () => {
    authService.logoutAdmin();
    setAdmin(null);
  };

  const updateAdminSettings = (params: { currentPassword: string; newUsername?: string; newPassword?: string }) => {
    const res = authService.updateAdminSettings(params);
    if (res.success) {
      setAdmin(authService.getCurrentAdmin());
    }
    return res;
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const res = await authService.signInWithGoogle();
    setIsLoading(false);
    if (res.success && res.user) {
      setUser(res.user);
    } else if (res.isDemo) {
      setShowFirebaseHelper(true);
    }
    return res;
  };

  const signInWithDemoGoogleAccount = (info?: { name: string; email: string; avatarUrl?: string }) => {
    const usr = authService.signInWithDemoGoogleAccount(info);
    setUser(usr);
    setShowFirebaseHelper(false);
  };

  const logoutUser = async () => {
    await authService.logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        user,
        isLoading,
        isFirebaseReady: isFirebaseConfigured,
        loginAdmin,
        logoutAdmin,
        updateAdminSettings,
        signInWithGoogle,
        signInWithDemoGoogleAccount,
        logoutUser,
        showFirebaseHelper,
        setShowFirebaseHelper,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
