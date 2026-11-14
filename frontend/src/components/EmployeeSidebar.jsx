import React from 'react';

const EmployeeSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'chat', label: 'AI Chat', icon: '💬' },
    { id: 'checklist', label: 'Checklist', icon: '📋' },
    { id: 'qa', label: 'Company Q&A', icon: '❓' },
  ];

  return (
    <aside className="w-[200px] bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 h-[calc(100vh-4rem)] flex flex-col justify-between shrink-0 sticky top-16 transition-colors duration-200 shadow-xs">
      <div className="p-4">
        <div className="px-2 py-3 mb-4 border-b border-slate-200/80 dark:border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Employee Portal
          </h2>
        </div>

        <nav className="space-y-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="font-medium">Onboarding Mode</span>
        </div>
      </div>
    </aside>
  );
};

export default EmployeeSidebar;
