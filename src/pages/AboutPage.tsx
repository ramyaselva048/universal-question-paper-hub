import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Shield,
  GraduationCap,
  Sparkles,
  Server,
  Lock,
  Database,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-electric-violet">
          About The Platform
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-deep-charcoal tracking-tight">
          Universal Question Paper Hub
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          An open, verified digital archive created to democratize access to previous examination papers, model tests, and academic evaluation archives worldwide.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-electric-violet/10 text-electric-violet flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-deep-charcoal">Universal Access</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Eliminating geographic and financial boundaries so learners everywhere can review real past examinations across secondary, higher, and vocational curricula.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-coral-pink/10 text-coral-pink flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-deep-charcoal">Verified Academic Integrity</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every question paper is uploaded and categorized by designated institutional administrators to guarantee correct labeling, years, and authentic question structures.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-fresh-teal/10 text-fresh-teal flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-deep-charcoal">Standard PDF In-Browser Viewing</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Read directly on phones, tablets, or computers with our high-fidelity reader featuring zoom, page navigation, and zero-delay downloads.
          </p>
        </div>
      </div>

      {/* Architecture & Future Roadmap */}
      <div className="bg-soft-lavender/50 rounded-3xl p-8 border border-electric-violet/15 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-electric-violet text-white flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-deep-charcoal">
              Next-Gen Architecture & Supabase Readiness
            </h2>
            <p className="text-xs text-slate-500">
              Clean separation of services layer from presentation components
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Universal Question Paper Hub is structured with a modular service boundary. The current implementation utilizes client-side simulated persistence and Firebase Authentication for public Google Sign-In. The data access contracts in <code className="bg-white px-1.5 py-0.5 rounded text-electric-violet font-mono text-xs">src/services/paperService.ts</code> are designed for seamless drop-in transition to a hosted PostgreSQL backend and Supabase Storage bucket.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-xs text-slate-700">
            <strong className="block text-deep-charcoal font-semibold mb-1">
              • Public Google Sign-In
            </strong>
            Integrated via Firebase Authentication with official Google popups and session continuity.
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-xs text-slate-700">
            <strong className="block text-deep-charcoal font-semibold mb-1">
              • Isolated Administrator Control
            </strong>
            Strict username/password verification and protected routes separate from public learners.
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 px-6 py-3 bg-electric-violet text-white font-bold text-xs rounded-xl shadow-md shadow-electric-violet/20 hover:bg-electric-violet-hover transition-colors"
        >
          <span>Start Exploring Examination Papers</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
