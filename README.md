# Universal Question Paper Hub

A complete, production-grade academic repository platform built with React, Vite, and Tailwind CSS. The platform enables administrators to upload and manage examination question papers in PDF format, while public students and educators can sign in using Firebase Google Sign-In, search, preview PDFs in an authentic reader, and download them.

---

## 🎨 Brand Design & Color Palette

- **Electric Violet**: `#6C3BFF` (Primary Brand & Accent)
- **Coral Pink**: `#FF5A76` (Highlights & Bookmarks)
- **Sunshine Yellow**: `#FFB627` (Metrics & Accents)
- **Fresh Teal**: `#14B8A6` (Success & Verified Badges)
- **Soft Lavender**: `#F5F3FF` (Surface Backgrounds)
- **Deep Charcoal**: `#20243A` (Headings & Dark Layouts)
- **Pure White**: `#FFFFFF` (Card Surfaces)

---

## 🚀 Key Features

### 1. Public Examination Portal
- **Hero & Search Engine**: Instant search by subject, examination title, year, or keywords.
- **Academic Taxonomy**: Browse by category (Engineering, Competitive Exams, Medical, University, Secondary Boards, etc.).
- **Live Statistics**: Real-time counter of total papers, total downloads, and categories.
- **In-App PDF Viewer**: High-fidelity reader with zoom (70%–160%), page navigation, printing, fullscreen, and direct download.

### 2. Public User Authentication (Firebase Google Sign-In)
- Official Google Sign-In button with SVG Google branding.
- Redirects directly to the **User Dashboard**.
- Displays user's Google display name and profile avatar.
- User features:
  - Personal **Download History**
  - **Saved Favourites** for rapid revision
  - **Recently Viewed Papers** timeline
  - Instant paper search & category browsing
- **Strict Separation**: Public users have zero access to upload, edit, or administrative settings.

### 3. Administrator Control Suite
- **Completely Separate Admin Login**:
  - Username & password authentication (no Google Sign-In on Admin portal).
  - Protected routes and session management.
- **Upload Question Paper**:
  - Drag-and-drop PDF upload with file validation and size check.
  - Required title and PDF file; optional category, year, and description.
  - Supports all types: School, College, University, Government, Competitive, Entrance, Model, Internal.
  - Live upload progress indicator and success alerts.
- **Manage Question Papers**:
  - Live search and multi-criteria filters.
  - Inline title, category, year, and description editing.
  - PDF file replacement.
  - Permanent delete with confirmation modal.
- **Category Management**:
  - Add, rename, and delete categories with live paper count tracking.
- **Analytics & Download Statistics**:
  - Top 10 most downloaded papers ranking and visual distribution.
- **Account Settings**:
  - Update Admin Username and change Admin Password with current password verification.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Motion.
- **Routing**: React Router DOM v7.
- **Authentication**: Firebase Authentication for public Google Sign-In.
- **Architecture**: Decoupled service layer ready for future **Supabase** (PostgreSQL & Storage) integration.

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Configure Environment Variables (Optional for custom Firebase project)
cp .env.example .env

# 3. Start the Development Server
npm run dev
```

### Default Credentials
- **Admin Portal**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
  - Username: `admin`
  - Password: `AdminPassword@2025`
- **Public Google Sign-In**: Click "Sign in with Google" on the top navigation bar or homepage hero section.
