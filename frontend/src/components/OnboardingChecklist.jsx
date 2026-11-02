import React, { useState, useEffect } from 'react';
import api from '../api/config';
import Spinner from './Common/Spinner';

const OnboardingChecklist = () => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChecklist();
  }, []);

  const fetchChecklist = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/api/checklist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data.tasks || []);
      setProgress(response.data.progress || 0);
    } catch (err) {
      console.error('Error fetching checklist:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load onboarding checklist.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.patch(`/api/checklist/${taskId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update local state with result
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId
            ? { ...t, completed: response.data.completed, completedAt: response.data.completedAt }
            : t
        )
      );
      setProgress(response.data.progress);
    } catch (err) {
      console.error('Error toggling task:', err);
      setError(err.response?.data?.error || err.message || 'Failed to update task.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner text="Loading your checklist..." />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-6">
      {error && (
        <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-xs flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 font-bold ml-2">✕</button>
        </div>
      )}

      {/* Header & Overall Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-bold text-white">Your Onboarding Tasks</h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {progress}% Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Task Item List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleToggleTask(task.id)}
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
                className="w-4 h-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-700 pointer-events-none"
              />
              <div>
                <p className={`text-xs font-medium ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                  {task.title}
                </p>
              </div>
            </div>

            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${task.completed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
              {task.completed ? 'Done' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingChecklist;