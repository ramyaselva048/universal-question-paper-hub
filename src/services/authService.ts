import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './firebase';
import { PublicUser, AdminUser } from '../types';

const ADMIN_STORAGE_KEY = 'uqph_admin_session';
const ADMIN_CREDENTIALS_KEY = 'uqph_admin_credentials_v1';
const USER_STORAGE_KEY = 'uqph_user_session';

// Simple hashing simulation for demo credentials to avoid plaintext in localStorage
function hashPassword(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + str.length;
}

// Initial Admin credentials
const DEFAULT_ADMIN = {
  username: 'admin',
  passwordHash: hashPassword('AdminPassword@2025'),
};

function getStoredAdminCredentials() {
  try {
    const raw = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return DEFAULT_ADMIN;
}

export const authService = {
  // -------------------------------------------------------------
  // ADMIN AUTHENTICATION
  // -------------------------------------------------------------

  loginAdmin(username: string, password: string): { success: boolean; error?: string; admin?: AdminUser } {
    const credentials = getStoredAdminCredentials();
    const cleanUsername = username.trim().toLowerCase();
    
    if (cleanUsername !== credentials.username.toLowerCase()) {
      return { success: false, error: 'Invalid admin username. Please check your credentials.' };
    }

    if (hashPassword(password) !== credentials.passwordHash) {
      return { success: false, error: 'Incorrect admin password. Please try again.' };
    }

    const admin: AdminUser = {
      username: credentials.username,
      role: 'admin',
      lastLogin: new Date().toISOString(),
    };

    sessionStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
    return { success: true, admin };
  },

  getCurrentAdmin(): AdminUser | null {
    try {
      const raw = sessionStorage.getItem(ADMIN_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return null;
  },

  logoutAdmin(): void {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
  },

  updateAdminSettings(params: {
    currentPassword: string;
    newUsername?: string;
    newPassword?: string;
  }): { success: boolean; error?: string } {
    const credentials = getStoredAdminCredentials();

    if (hashPassword(params.currentPassword) !== credentials.passwordHash) {
      return { success: false, error: 'Current password verification failed. Please check your current password.' };
    }

    const updated = {
      username: params.newUsername?.trim() ? params.newUsername.trim() : credentials.username,
      passwordHash: params.newPassword ? hashPassword(params.newPassword) : credentials.passwordHash,
    };

    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(updated));

    // Update active session if username changed
    const currentSession = this.getCurrentAdmin();
    if (currentSession) {
      currentSession.username = updated.username;
      sessionStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(currentSession));
    }

    return { success: true };
  },

  // -------------------------------------------------------------
  // PUBLIC USER GOOGLE AUTHENTICATION
  // -------------------------------------------------------------

  async signInWithGoogle(): Promise<{ success: boolean; user?: PublicUser; error?: string; isDemo?: boolean }> {
    // If real Firebase Auth is configured and available
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const fbUser: FirebaseUser = result.user;
        const publicUser: PublicUser = {
          uid: fbUser.uid,
          displayName: fbUser.displayName || 'Google User',
          email: fbUser.email,
          photoURL: fbUser.photoURL || '/src/assets/images/user_avatar_student_1794485735691.jpg',
          providerId: 'google.com',
          joinedAt: new Date().toISOString(),
        };

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(publicUser));
        return { success: true, user: publicUser };
      } catch (err: unknown) {
        const firebaseError = err as { code?: string; message?: string };
        if (firebaseError.code === 'auth/popup-closed-by-user') {
          return { success: false, error: 'Sign-in window was closed before completing. Please try again.' };
        }
        if (firebaseError.code === 'auth/cancelled-popup-request') {
          return { success: false, error: 'Another sign-in attempt was in progress. Please retry.' };
        }
        return {
          success: false,
          error: firebaseError.message || 'Firebase Google Sign-In could not be completed.',
        };
      }
    }

    // Interactive Demo Google Auth mode (when Firebase environment credentials are not yet supplied)
    return {
      success: false,
      error: 'FIREBASE_NOT_CONFIGURED',
      isDemo: true,
    };
  },

  signInWithDemoGoogleAccount(accountInfo?: { name: string; email: string; avatarUrl?: string }): PublicUser {
    const defaultAccount: PublicUser = {
      uid: 'google-uid-' + Math.random().toString(36).substring(2, 9),
      displayName: accountInfo?.name || 'Monisha S',
      email: accountInfo?.email || 'monishas0707@gmail.com',
      photoURL: accountInfo?.avatarUrl || '/src/assets/images/user_avatar_student_1794485735691.jpg',
      providerId: 'google.com',
      joinedAt: new Date().toISOString(),
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultAccount));
    return defaultAccount;
  },

  getCurrentUser(): PublicUser | null {
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return null;
  },

  async logoutUser(): Promise<void> {
    if (isFirebaseConfigured && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.warn('Firebase signout note:', err);
      }
    }
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  subscribeToAuthChanges(callback: (user: PublicUser | null) => void): () => void {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          const publicUser: PublicUser = {
            uid: fbUser.uid,
            displayName: fbUser.displayName || 'Google User',
            email: fbUser.email,
            photoURL: fbUser.photoURL || '/src/assets/images/user_avatar_student_1794485735691.jpg',
            providerId: 'google.com',
          };
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(publicUser));
          callback(publicUser);
        } else {
          // If Firebase says logged out, check if demo session exists
          const stored = this.getCurrentUser();
          callback(stored);
        }
      });
      return unsubscribe;
    }

    // Default local subscriber
    callback(this.getCurrentUser());
    return () => {};
  },
};
