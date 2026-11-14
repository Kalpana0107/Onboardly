// SkillBadges.jsx — Shows extracted skills as colored pills.
// Receives the skills array from parent or triggers extraction via candidateId.

import React, { useState } from 'react';
import api from '../api/config';
import Spinner from './Common/Spinner';

function SkillBadges({ skills: propSkills, candidateId, onSkillsExtracted }) {
  const [internalSkills, setInternalSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const displaySkills = (Array.isArray(propSkills) && propSkills.length > 0)
    ? propSkills
    : internalSkills;

  const triggerExtraction = async () => {
    if (!candidateId) return;
    setLoading(true);

    try {
      const res = await api.post(`/api/extract/${candidateId}`);
      const extracted = res.data.skills || res.data.result?.skills || [];
      setInternalSkills(extracted);
      if (onSkillsExtracted) {
        onSkillsExtracted(extracted);
      }
    } catch (err) {
      console.error('Extraction failed:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {candidateId && !displaySkills.length && (
        <button
          onClick={triggerExtraction}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl text-xs shadow-sm transition disabled:opacity-50"
        >
          {loading ? <Spinner text="Extracting Skills..." /> : 'Extract Skills from Resume'}
        </button>
      )}

      {displaySkills.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 flex items-center justify-center text-2xl mb-3">
            ✨
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">No Skills Extracted Yet</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
            Upload a resume on the left to automatically extract candidate competencies.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {displaySkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-semibold rounded-full shadow-xs transition-all hover:scale-105"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillBadges;
