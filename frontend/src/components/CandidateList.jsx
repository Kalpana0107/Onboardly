import React, { useState, useEffect, useMemo } from 'react';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiBaseUrl}/api/candidates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch candidate profiles.');
      }

      // Ensure candidates list is sorted descending by score by default
      const sorted = (Array.isArray(data) ? data : data.candidates || []).sort(
        (a, b) => (b.matchScore || 0) - (a.matchScore || 0)
      );

      setCandidates(sorted);
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setError(err.message || 'Could not load candidates.');
    } finally {
      setLoading(false);
    }
  };

  // Dynamically extract all unique skills across all candidates for the filter checkboxes
  const availableSkills = useMemo(() => {
    const skillSet = new Set();
    candidates.forEach((cand) => {
      if (Array.isArray(cand.skills)) {
        cand.skills.forEach((skill) => skillSet.add(skill.trim()));
      }
    });
    return Array.from(skillSet).sort();
  }, [candidates]);

  // Toggle skill selection in multi-select checkbox filter
  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Filter candidates based on name/resume search query and selected skill checkboxes
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      // 1. Text Search Filter (Matches Name or Email)
      const matchesSearch =
        searchQuery === '' ||
        candidate.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email?.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Multi-Select Skill Checkbox Filter (Candidate must match ALL selected skills)
      const candidateSkills = Array.isArray(candidate.skills)
        ? candidate.skills.map((s) => s.toLowerCase())
        : [];

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every((skill) => candidateSkills.includes(skill.toLowerCase()));

      return matchesSearch && matchesSkills;
    });
  }, [candidates, searchQuery, selectedSkills]);

  return (
    <div className="space-y-6">
      {/* Search Bar & Clear Filters Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {(searchQuery || selectedSkills.length > 0) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSkills([]);
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors self-end md:self-auto"
          >
            Clear Filters ({filteredCandidates.length} results)
          </button>
        )}
      </div>

      {/* Dynamic Skill Filter Badges/Checkboxes */}
      {availableSkills.length > 0 && (
        <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Filter by Extracted Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((skill) => {
              const isChecked = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                    isChecked
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span>{skill}</span>
                  {isChecked && <span className="text-indigo-200">✕</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Loading & Error Indicators */}
      {loading && (
        <div className="text-center py-12 text-slate-400 text-sm">
          Loading candidate rankings...
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-4 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={fetchCandidates}
            className="underline text-xs hover:text-red-300"
          >
            Retry
          </button>
        </div>
      )}

      {/* Candidates List Display */}
      {!loading && !error && (
        <div className="space-y-3">
          {filteredCandidates.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/30 rounded-lg border border-dashed border-slate-700 text-slate-400 text-sm">
              No candidates found matching your search or skill criteria.
            </div>
          ) : (
            filteredCandidates.map((candidate, index) => (
              <div
                key={candidate._id || index}
                className="bg-slate-800/90 border border-slate-700/80 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-500/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-slate-700 text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {candidate.name || 'Unnamed Candidate'}
                    </h3>
                    <p className="text-xs text-slate-400">{candidate.email || 'No email provided'}</p>

                    {/* Skill Badges */}
                    {candidate.skills && candidate.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {candidate.skills.map((s, i) => (
                          <span
                            key={i}
                            className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-[11px]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Score & Resume Link */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-700">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Match Score</span>
                    <span className="text-lg font-bold text-indigo-400">
                      {candidate.matchScore ?? 0}%
                    </span>
                  </div>

                  {candidate.resumeUrl && (
                    <a
                      href={candidate.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-medium transition-colors"
                    >
                      View Resume
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateList;