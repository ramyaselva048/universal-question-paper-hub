import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PdfViewerModal } from '../components/PdfViewerModal';
import { FirebaseStatusModal } from '../components/FirebaseStatusModal';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFD] text-deep-charcoal selection:bg-electric-violet selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <PdfViewerModal />
      <FirebaseStatusModal />
    </div>
  );
};
