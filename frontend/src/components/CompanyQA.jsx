// frontend/src/components/CompanyQA.jsx
import React, { useState } from 'react';
import Spinner from './Common/Spinner';
import { API_BASE_URL } from '../api/config';

export default function CompanyQA() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

        try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/rag/query`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ question: query }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to fetch response from company knowledge base.');
      }

      const data = await res.json();
      // Expected data shape: { answer: "...", sources: ["Employee_Handbook.pdf", ...] }
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Company Policy & Q&A Search</h2>
      
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a policy question (e.g., What is our remote work or leave policy?)"
          className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs md:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs md:text-sm font-semibold transition-all shadow-sm"
        >
          {loading ? <Spinner text="Searching..." /> : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-500/50 rounded-xl text-red-700 dark:text-red-300 text-xs">
          {error}
        </div>
      )}

      {response && (
        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 space-y-4">
          <p className="text-slate-800 dark:text-slate-200 text-xs md:text-sm leading-relaxed">{response.answer}</p>
          
          {response.sources && response.sources.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200/80 dark:border-slate-700/50">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sources:</span>
              {response.sources.map((src, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-700/50 text-xs rounded-lg font-medium">
                  📄 {src}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}