// SkillBadges.jsx — Shows extracted skills as colored pills.
// Receives the skills array from the parent after upload + extraction.

import React from 'react';
import api from '../api/config';

function SkillBadges({ candidateId, onSkillsExtracted }) {
  const [skills, setSkills] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const triggerExtraction = async () => {
    if (!candidateId) {
      console.error('No candidateId — upload a resume first');
      return;
    }
    setLoading(true);

    console.log('Step 2 - extracting skills for candidateId:', candidateId);

    try {
      // POST /api/extract/:id
      // Tells the backend to run Python NLP on this resume.
      const res = await api.post(`/api/extract/${candidateId}`);

      setSkills(res.data.skills);
      onSkillsExtracted(res.data);
    } catch (err) {
      console.error('Extraction failed:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skill-section">
      <button
        onClick={triggerExtraction}
        disabled={loading}
      >
        {loading
          ? 'Extracting Skills...'
          : 'Extract Skills from Resume'}
      </button>

      <div className="skill-badges">
        {/* Render one badge for each extracted skill */}
        {skills.map((skill, index) => (
          <span key={index} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillBadges;