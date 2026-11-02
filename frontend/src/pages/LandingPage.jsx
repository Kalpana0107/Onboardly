import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role === 'hr') {
      navigate('/hr/dashboard');
    } else {
      navigate('/employee/dashboard');
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-8">
          <span>🚀 SmartHire 2.0 Released</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          AI-Powered Recruitment & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Seamless Onboarding
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10">
          Automate resume skill extraction, score candidates against job descriptions, and provide new hires with an AI assistant and interactive onboarding checklists.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={handleCtaClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition-all text-base"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Upload Resume & Get Started'}
          </button>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-base"
          >
            How It Works
          </a>
        </div>
      </section>

      {/* Features Anchor Section */}
      <section id="features" className="py-16 bg-slate-800/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-white mb-12">
            Built for HR Teams and Hired Candidates
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 rounded-lg flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Automated Skill Extraction</h3>
              <p className="text-sm text-slate-400">
                Upload candidate PDFs and instantly parse key tech stacks and qualifications.
              </p>
            </div>
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 rounded-lg flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">JD Match Scoring</h3>
              <p className="text-sm text-slate-400">
                Compare job requirements against candidate profiles for objective match scores (0-100%).
              </p>
            </div>
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 rounded-lg flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Onboarding Hub</h3>
              <p className="text-sm text-slate-400">
                Empower new hires with interactive checklists, company policy RAG search, and Gemini AI assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-white mb-8">How SmartHire Works</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-between text-slate-300 text-sm">
          <div className="flex-1 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <strong className="text-white block mb-1">Step 1: Upload & Extract</strong>
            HR uploads candidate PDFs to auto-extract technical skills.
          </div>
          <div className="flex-1 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <strong className="text-white block mb-1">Step 2: Score & Rank</strong>
            Paste job descriptions to evaluate and rank candidate suitability.
          </div>
          <div className="flex-1 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <strong className="text-white block mb-1">Step 3: Provision & Onboard</strong>
            Create employee accounts for hired talent to begin AI-guided onboarding.
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA Banner */}
      <section className="bg-indigo-600/10 border-t border-indigo-500/20 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-white">Ready to streamline your recruitment process?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Join SmartHire today to experience AI-powered matching and candidate onboarding.
          </p>
          <div className="pt-2">
            <button
              onClick={handleCtaClick}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition-colors text-sm"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Sign Up or Log In'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;