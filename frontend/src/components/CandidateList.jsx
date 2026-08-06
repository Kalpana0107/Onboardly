// CandidateList.jsx — Fetches and displays ranked candidates.
// Calls GET /api/candidates on component mount.

import React, { useState, useEffect } from 'react';
import api from '../api/config';

// Helper: return CSS color based on score value
const getScoreColor = (score) => {
  if (score >= 70) return '#10B981';
  if (score >= 40) return '#F59E0B';
  return '#EF4444';
};

function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Runs once when the component mounts
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await api.get('/api/candidates');
      setCandidates(res.data.candidates);
    } catch (err) {
      setError('Could not load candidates. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: '#ffffff' }}>Loading candidates...</p>;
  }

  if (error) {
    return <p style={{ color: '#94a3b8' }}>{error}</p>;
  }

  if (candidates.length === 0) {
    return <p style={{ color: '#ffffff' }}>No candidates yet. Upload a resume!</p>;
  }

  return (
    <div>
      {candidates.map((c, index) => (
        <div key={c.id} style={{
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#94a3b8', fontWeight: 'bold' }}>#{index + 1}</span>

            <div>
              <h4 style={{ color: '#ffffff', fontWeight: '600', margin: 0 }}>{c.name || 'Unknown'}</h4>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0' }}>{c.filename}</p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {c.skills.slice(0, 5).map((sk, i) => (
                  <span key={i} style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: '#94a3b8'
                  }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            background: getScoreColor(c.match_score),
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            {c.match_score}%
          </div>
        </div>
      ))}
    </div>
  );
}

export default CandidateList;