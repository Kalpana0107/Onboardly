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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Left Dark Sidebar */}
        <EmployeeSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Right Content Viewport */}
        <main className="flex-1 p-8 overflow-y-auto max-w-6xl space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-6">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              Employee Portal
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white">
              Welcome aboard, {user?.fullName || user?.name || 'Team Member'}! 👋
            </h1>
            {user?.department && (
              <p className="text-xs text-slate-400 mt-1">
                Department: <span className="text-slate-200 font-medium">{user.department}</span>
              </p>
            )}
          </div>

          {/* Tab Content Views */}
          {activeTab === 'chat' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">AI Onboarding Assistant</h2>
                <p className="text-xs text-slate-400">
                  Ask questions about your role, tools, systems, or checklist progress.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md h-[500px]">
                <OnboardingChatbot />
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Your Onboarding Checklist</h2>
                <p className="text-xs text-slate-400">
                  Complete tasks to finish your onboarding journey.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
                <OnboardingChecklist />
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Company Policy Q&A</h2>
                <p className="text-xs text-slate-400">
                  Search policy documents and retrieve structured answers verified by RAG.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
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