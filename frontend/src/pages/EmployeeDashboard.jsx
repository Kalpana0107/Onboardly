import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import OnboardingChecklist from '../components/OnboardingChecklist';
import OnboardingChatbot from '../components/OnboardingChatbot';
import { useAuth } from '../context/AuthContext';

const EmployeeDashboard = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete Profile & Identity Verification', category: 'HR Admin', completed: true },
    { id: 2, title: 'Review Code of Conduct & IT Security Policy', category: 'Compliance', completed: false },
    { id: 3, title: 'Set up 2FA & Work Credentials', category: 'IT Support', completed: false },
    { id: 4, title: 'Join Department Slack/Teams Channels', category: 'Team Integration', completed: false },
    { id: 5, title: 'Schedule 1-on-1 Intro with Manager', category: 'Management', completed: false },
  ]);

  const handleToggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        {/* Employee Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 md:p-8">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            Employee Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Welcome aboard, {user?.name || 'Team Member'}! 👋
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Department: <span className="text-white font-medium">{user?.department || 'Engineering'}</span>
          </p>
        </div>

        {/* 2-Column Responsive Layout: Checklist + Gemini Chatbot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <OnboardingChecklist tasks={tasks} onToggleTask={handleToggleTask} />
          <OnboardingChatbot />
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;