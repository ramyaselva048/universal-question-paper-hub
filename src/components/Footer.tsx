import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-charcoal text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-electric-violet to-coral-pink flex items-center justify-center text-white shadow-md">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">
                Universal<span className="text-coral-pink">Papers</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier open digital repository for authentic question papers, model tests, and examination archives across all fields of education.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-3.5 h-3.5 text-fresh-teal" />
              <span>Verified Academic Documents</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/browse" className="hover:text-white transition-colors">
                  Browse All Papers
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">
                  Academic Categories
                </Link>
              </li>
              <li>
                <Link to="/browse?sort=most_downloaded" className="hover:text-white transition-colors">
                  Most Downloaded
                </Link>
              </li>
              <li>
                <Link to="/browse?sort=newest" className="hover:text-white transition-colors">
                  Recently Uploaded
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Disciplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-white transition-colors">
                  Search Archive
                </Link>
              </li>
              <li>
                <Link to="/admin/upload" className="hover:text-white transition-colors">
                  Upload Paper (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Access */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Portals
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Public learners can sign in securely with Google to maintain study records and download archives.
            </p>
            <div className="space-y-2">
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <span>Administrator Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Universal Question Paper Hub. Designed for learners and educators.</p>
          <div className="flex items-center gap-6">
            <span>Free & Open Access Repository</span>
            <span>·</span>
            <Link to="/about" className="hover:text-slate-400 transition-colors">
              Terms & Fair Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
