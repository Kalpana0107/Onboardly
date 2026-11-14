import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import EmployeeSidebar from '../components/EmployeeSidebar';
import OnboardingChecklist from '../components/OnboardingChecklist';
import OnboardingChatbot from '../components/OnboardingChatbot';
import CompanyQA from '../components/CompanyQA';
import { useAuth } from '../context/AuthContext';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  
  // State for active tab view: 'chat' | 'checklist' | 'qa'
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      <Navbar />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <EmployeeSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Right Content Viewport */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-50 via-blue-50/60 to-white dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900 border border-indigo-100/90 dark:border-indigo-500/20 rounded-2xl p-6 shadow-sm dark:shadow-none transition-all">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200/80 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400 text-xs font-semibold mb-3">
              Employee Portal
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
              Welcome aboard, {user?.fullName || user?.name || 'Team Member'}! 👋
            </h1>
            {user?.department && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Department: <span className="text-slate-900 dark:text-slate-200 font-medium">{user.department}</span>
              </p>
            )}
          </div>

          {/* Tab Content Views */}
          {activeTab === 'chat' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">AI Onboarding Assistant</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Ask questions about your role, tools, systems, or checklist progress.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none transition-all h-[560px]">
                <OnboardingChatbot />
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Your Onboarding Checklist</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Complete tasks to finish your onboarding journey.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none transition-all">
                <OnboardingChecklist />
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Company Policy Q&A</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Search policy documents and retrieve structured answers verified by RAG.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none transition-all">
                <CompanyQA />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;