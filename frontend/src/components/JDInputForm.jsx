// JDInputForm.jsx — Text area for the recruiter to paste a job description.
// Sends JD text + candidateId to the backend for scoring.

import React, { useState } from 'react';
import api from '../api/config';

function JDInputForm({ candidateId, onScoreReceived }) {
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Don't send empty text
    if (!jdText.trim()) return;

    setLoading(true);

    try {
      const res = await api.post(`/api/match/${candidateId}`, {
  jobDescription: jdText,
});

      // Pass the score up to the parent page
     onScoreReceived(res.data.matchScore, res.data.matchedSkills);
    } catch (err) {
      console.error('Scoring failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <textarea
        rows={10}
        placeholder="Paste the full job description here..."
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
        style={{
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#ffffff',
          borderRadius: '8px',
          padding: '12px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !jdText.trim()}
        style={{
          background: '#00D4AA',
          color: '#000000',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Calculating...' : 'Calculate Match Score'}
      </button>
    </div>
  );
}

export default JDInputForm;
