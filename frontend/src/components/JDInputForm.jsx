import React, { useState } from 'react';
import api from '../api/config';
import Spinner from './Common/Spinner';

export default function JDInputForm({ onMatchCalculated }) {
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculateMatch = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Fetch active candidates list
      const candRes = await api.get('/api/candidates');
      const candidates = candRes.data.candidates || [];

      if (candidates.length === 0) {
        throw new Error('No candidates found. Please upload resumes first.');
      }

      // 2. Extract job description skills (using comma/space/newline separation)
      const jobSkills = jobDescription
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (jobSkills.length === 0) {
        throw new Error('Could not identify any skills in the job description.');
      }

      // Calculate score for the candidates
      const results = await Promise.all(
        candidates.map(async (candidate) => {
          const res = await api.post('/api/match', {
            candidateId: candidate.id,
            jobSkills: jobSkills,
          });
          return res.data;
        })
      );

      // Notify parent of the primary candidate result
      if (onMatchCalculated && results.length > 0) {
        onMatchCalculated(results[0]);
      }
    } catch (err) {
      console.error("Match calculation error:", err);
      setError(err.response?.data?.error || err.message || 'Failed to calculate match score.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
      <h2 className="text-base font-semibold text-white">📋 Job Description</h2>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-xs flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-red-400 font-bold ml-2">✕</button>
        </div>
      )}
      
      <textarea
        className="w-full h-48 bg-slate-950 text-white text-xs p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
        placeholder="Paste role requirements here. Separate key skills/technologies by commas or new lines (e.g. React, Node.js, Python)..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        onClick={handleCalculateMatch}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-xs shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? <Spinner text="Calculating Scores..." /> : 'Calculate Match Score'}
      </button>
    </div>
  );
}