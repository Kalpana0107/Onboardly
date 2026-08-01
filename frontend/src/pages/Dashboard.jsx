import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import SkillBadges from '../components/SkillBadges';
import JDInputForm from '../components/JDInputForm';
import ScoreCard from '../components/ScoreCard';
import CandidateList from '../components/CandidateList';

function Dashboard() {
  const navigate = useNavigate();
  const [activeCandidateId, setActiveCandidateId] = useState(null);
  const [score, setScore] = useState(null);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [refreshList, setRefreshList] = useState(0);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* TOP BAR */}
      <div style={{
        background: '#12121f',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h1 style={{ 
          color: '#00D4AA', 
          fontSize: '20px', 
          fontWeight: '700' 
        }}>
          SmartHire — Resume Screener
        </h1>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* 3 PANEL LAYOUT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '24px',
        padding: '24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }} className="dashboard-grid">

        {/* PANEL 1 — Upload */}
        <div style={{
          background: '#12121f',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h2 style={{ 
            color: '#00D4AA', 
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            📄 Upload Resume
          </h2>
          <FileUpload
            onUploadSuccess={(data) => {
    console.log("Dashboard got:", data);
    console.log("Candidate ID:", data.candidateId);

    setActiveCandidateId(data.candidateId);
}}
          />
          {activeCandidateId && (
            <div style={{ marginTop: '20px' }}>
              <SkillBadges
                candidateId={activeCandidateId}
                onSkillsExtracted={() => {}}
              />
            </div>
          )}
        </div>

        {/* PANEL 2 — Job Description */}
        <div style={{
          background: '#12121f',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h2 style={{ 
            color: '#00D4AA', 
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            📋 Job Description
          </h2>
          <JDInputForm
            candidateId={activeCandidateId}
            onScoreReceived={(s, ms) => {
              setScore(s);
              setMatchedSkills(ms);
              setRefreshList(r => r + 1);
            }}
          />
          {score !== null && (
            <div style={{ marginTop: '20px' }}>
              <ScoreCard 
                score={score} 
                matchedSkills={matchedSkills} 
              />
            </div>
          )}
        </div>

        {/* PANEL 3 — Results */}
        <div style={{
          background: '#12121f',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h2 style={{ 
            color: '#00D4AA', 
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            🏆 Ranked Candidates
          </h2>
          <CandidateList key={refreshList} />
        </div>

      </div>

      {/* MOBILE RESPONSIVE */}
      <style>{`
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
