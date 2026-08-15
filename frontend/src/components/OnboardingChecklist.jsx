import React from 'react';

const OnboardingChecklist = ({ tasks, onToggleTask }) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-6">
      {/* Header & Overall Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-white">Your Onboarding Tasks</h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {completedCount} of {tasks.length} Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Task Item List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            className={`p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              task.completed
                ? 'bg-slate-800/40 border-slate-800 text-slate-400'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-500/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}} // Handled by parent div click
                className="w-4 h-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-700"
              />
              <div>
                <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-slate-400">{task.category}</p>
              </div>
            </div>

            <span className={`text-xs px-2 py-0.5 rounded ${task.completed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
              {task.completed ? 'Done' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingChecklist;