import React from 'react';

const EmployeeSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'chat', label: 'AI Chat', icon: '💬' },
    { id: 'checklist', label: 'Checklist', icon: '📋' },
    { id: 'qa', label: 'Company Q&A', icon: '❓' },
  ];

  return (
    <aside className="w-[200px] bg-slate-900 border-r border-slate-800 h-[calc(100vh-4rem)] flex flex-col justify-between shrink-0 sticky top-16">
      <div className="p-4">
        <div className="px-2 py-3 mb-4 border-b border-slate-800">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Employee Portal
          </h2>
        </div>

        <nav className="space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>Onboarding Mode</span>
        </div>
      </div>
    </aside>
  );
};

export default EmployeeSidebar;
