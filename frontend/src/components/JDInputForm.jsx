// JDInputForm.jsx — Text area for the recruiter to paste a job description.
// Sends JD text + candidateId to the backend for scoring.

import React, { useState } from 'react';
import api from '../api/config';

function JDInputForm({ candidateId, onScoreReceived }) {
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Guard: check candidateId before doing anything
    if (!candidateId) {
      setError('Please upload a resume first before calculating match score.');
      return;
    }
    if (!jdText.trim()) {
      setError('Please paste a job description.');
      return;
    }
    
    setLoading(true);
    setError('');

    // Step 3 log
    console.log('Step 3 - matching with candidateId:', candidateId, 'JD length:', jdText.length);
    
    try {
      const res = await api.post('/api/match', {
        candidateId,
        jobDescription: jdText,
      });

      // Pass the score up to the parent page
      onScoreReceived(res.data.score, res.data.matchedSkills);
    } catch (err) {
      // Show the actual error from backend
      const msg = err.response?.data?.error || 
                  'Scoring failed. Try extracting skills first.';
      setError(msg);
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

      {error && (
        <p style={{color: '#ef4444', fontSize: '13px', 
                   marginTop: '8px'}}>
          ⚠ {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !jdText.trim() || !candidateId}
        style={{
          background: '#00D4AA',
          color: '#000000',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          opacity: (!candidateId || !jdText.trim()) ? 0.5 : 1
        }}
      >
        {loading ? 'Calculating...' : 'Calculate Match Score'}
      </button>
    </div>
  );
}

export default JDInputForm;
