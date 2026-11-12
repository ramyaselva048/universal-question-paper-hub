import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PaperProvider } from './context/PaperContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { UserLayout } from './layouts/UserLayout';

// Auth Guards
import { ProtectedAdminRoute } from './auth/ProtectedAdminRoute';
import { ProtectedUserRoute } from './auth/ProtectedUserRoute';

// Public Pages
import { HomePage } from './pages/HomePage';
import { BrowsePapersPage } from './pages/BrowsePapersPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { PaperDetailPage } from './pages/PaperDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUploadPage } from './pages/admin/AdminUploadPage';
import { AdminManagePapersPage } from './pages/admin/AdminManagePapersPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminStatsPage } from './pages/admin/AdminStatsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// User Pages
import { UserDashboardPage } from './pages/user/UserDashboardPage';
import { UserDownloadsPage } from './pages/user/UserDownloadsPage';
import { UserFavouritesPage } from './pages/user/UserFavouritesPage';
import { UserHistoryPage } from './pages/user/UserHistoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PaperProvider>
          <Routes>
            {/* 1. Public Multi-Page Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePapersPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/paper/:id" element={<PaperDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* 2. Isolated Admin Login */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* 3. Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="upload" element={<AdminUploadPage />} />
              <Route path="papers" element={<AdminManagePapersPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="stats" element={<AdminStatsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* 4. Protected Public User Routes (Firebase Google Sign-In) */}
            <Route
              path="/user"
              element={
                <ProtectedUserRoute>
                  <UserLayout />
                </ProtectedUserRoute>
              }
            >
              <Route index element={<Navigate to="/user/dashboard" replace />} />
              <Route path="dashboard" element={<UserDashboardPage />} />
              <Route path="downloads" element={<UserDownloadsPage />} />
              <Route path="favourites" element={<UserFavouritesPage />} />
              <Route path="history" element={<UserHistoryPage />} />
            </Route>
          </Routes>
        </PaperProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
