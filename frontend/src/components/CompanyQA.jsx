// frontend/src/components/CompanyQA.jsx
import React, { useState } from 'react';
import Spinner from './Common/Spinner';

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

    const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://smarthire-backend-ysya.onrender.com/api').replace(/\/$/, '');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiBaseUrl}/rag/query`, {
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
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-white space-y-6">
      <h2 className="text-xl font-bold text-indigo-400">Company Policy & Q&A Search</h2>
      
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a policy question (e.g., What is our remote work or leave policy?)"
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg text-sm font-semibold transition-all"
        >
          {loading ? <Spinner text="Searching..." /> : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-900/40 border border-red-500/50 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {response && (
        <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/60 space-y-4">
          <p className="text-slate-200 text-sm leading-relaxed">{response.answer}</p>
          
          {response.sources && response.sources.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-700/50">
              <span className="text-xs text-slate-400 font-medium">Sources:</span>
              {response.sources.map((src, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-700/50 text-xs rounded-md">
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