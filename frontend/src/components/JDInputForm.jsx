import React, { useState } from 'react';
import api from '../api/config';

export default function JDInputForm({ candidates, onScoresUpdated }) {
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
      // Calculate match score for all uploaded candidates
      const updatedCandidates = await Promise.all(
        candidates.map(async (candidate) => {
          const res = await api.post('/match', {
            candidateId: candidate._id || candidate.id,
            jobDescription: jobDescription,
          });
          return res.data.candidate || { ...candidate, matchScore: res.data.matchScore };
        })
      );

      // Pass updated candidate scores back to update the Ranked Candidates panel
      if (onScoresUpdated) {
        onScoresUpdated(updatedCandidates);
      }
    } catch (err) {
      console.error("Match calculation error:", err);
      setError(err.response?.data?.error || 'Failed to calculate match score.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      <h2 className="text-xl font-bold text-white mb-4">📋 Job Description</h2>
      
      <textarea
        className="w-full h-48 bg-slate-950 text-white p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 mb-3"
        placeholder="Paste the full job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      {error && <p className="text-red-400 text-sm mb-3">⚠️ {error}</p>}

      <button
        onClick={handleCalculateMatch}
        disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition disabled:opacity-50"
      >
        {loading ? 'Calculating Scores...' : 'Calculate Match Score'}
      </button>
    </div>
  );
}