import React from 'react';

const getScoreDetails = (score) => {
  if (score >= 70) {
    return {
      label: 'Strong Match',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
      borderColor: 'border-emerald-200/80 dark:border-emerald-500/20',
      ringColor: '#10B981',
    };
  }
  if (score >= 40) {
    return {
      label: 'Moderate Match',
      textColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-500/10',
      borderColor: 'border-amber-200/80 dark:border-amber-500/20',
      ringColor: '#F59E0B',
    };
  }
  return {
    label: 'Low Match',
    textColor: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-500/10',
    borderColor: 'border-rose-200/80 dark:border-rose-500/20',
    ringColor: '#EF4444',
  };
};

function ScoreCard({ score, matchedSkills, matchResult }) {
  const effectiveScore = score ?? matchResult?.score ?? matchResult?.matchScore;
  const effectiveSkills = matchedSkills ?? matchResult?.matchedSkills ?? matchResult?.skills ?? [];

  if (effectiveScore === null || effectiveScore === undefined) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 flex items-center justify-center text-2xl mb-3">
          📊
        </div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">No Match Score Calculated</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
          Paste a job description on the left and click calculate to evaluate suitability.
        </p>
      </div>
    );
  }

  const { label, textColor, bgColor, borderColor, ringColor } = getScoreDetails(effectiveScore);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center p-6 bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl">
        <div 
          className="w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center mb-3 shadow-xs"
          style={{ borderColor: ringColor }}
        >
          <span className={`text-2xl font-black ${textColor}`}>
            {effectiveScore}%
          </span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${bgColor} ${borderColor} ${textColor}`}>
          {label}
        </span>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Matched Skills ({effectiveSkills.length})
        </h4>
        {effectiveSkills.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic">No direct skill overlaps identified.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {effectiveSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-500/20 text-xs font-medium rounded-full shadow-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScoreCard;
