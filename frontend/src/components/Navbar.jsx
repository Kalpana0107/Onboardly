import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role === 'hr') {
      navigate('/hr/dashboard');
    } else {
      navigate('/employee/dashboard');
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-md">
                S
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Smart<span className="text-indigo-400">Hire</span>
              </span>
            </Link>
          </div>

          {/* Clean Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              How It Works
            </a>
            <a
              href="https://github.com/Kalpana0107/Onboardly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
            >
              GitHub
              <svg
                className="w-4 h-4 opacity-70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          {/* Auth Call-to-Action Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDashboardRedirect}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;