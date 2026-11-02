import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import EmployeeManager from '../components/EmployeeManager';

// Existing HR components
import FileUpload from '../components/FileUpload';
import SkillBadges from '../components/SkillBadges';
import JDInputForm from '../components/JDInputForm';
import ScoreCard from '../components/ScoreCard';
import CandidateList from '../components/CandidateList';

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');

  // Shared state for skill extraction and match scoring results
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [matchResult, setMatchResult] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Fixed 200px Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Right Content Viewport */}
        <main className="flex-1 p-8 overflow-y-auto max-w-6xl">
          {/* Tab 1: Upload Resume & Skill Extraction */}
          {activeTab === 'upload' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Upload Resume</h1>
                <p className="text-sm text-slate-400">
                  Upload PDF candidate resumes to extract technical skills automatically.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
                  <FileUpload onSkillsExtracted={setExtractedSkills} />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-base font-semibold text-white mb-4">Extracted Skills</h3>
                  <SkillBadges skills={extractedSkills} />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Job Description & Score Calculation */}
          {activeTab === 'jd' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Job Description Matching</h1>
                <p className="text-sm text-slate-400">
                  Paste role requirements to compare against candidate skills and calculate match scores.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
                  <JDInputForm onMatchCalculated={setMatchResult} />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-base font-semibold text-white mb-4">Match Evaluation</h3>
                  <ScoreCard matchResult={matchResult} />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Ranked Candidates */}
          {activeTab === 'candidates' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Ranked Candidates</h1>
                <p className="text-sm text-slate-400">
                  View and manage evaluated candidate profiles ordered by job suitability.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
                <CandidateList />
              </div>
            </div>
          )}

          {/* Tab 4: Manage Employees (Placeholder for Issue #8) */}
          {/* Tab 4: Manage Employees */}
{activeTab === 'employees' && (
  <div className="space-y-6 animate-fadeIn">
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Manage Employees</h1>
      <p className="text-sm text-slate-400">
        Provision new employee accounts for hired candidates to give them onboarding portal access.
      </p>
    </div>

    <EmployeeManager />
  </div>
)}
        </main>
      </div>
    </div>
  );
};

export default HRDashboard;