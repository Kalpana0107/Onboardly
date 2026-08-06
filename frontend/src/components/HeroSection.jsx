import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero" id="home">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid" />
      </div>

      {/* Content */}
      <div className="hero-content">
        {/* Eyebrow badge */}
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-dot" />
          AI-Powered Recruitment Intelligence
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          Screen Resumes
          <br />
          <span className="highlight">10× Faster</span>
          <br />
          with NLP & AI
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          SmartHire automates the initial screening process — extracting skills, 
          ranking candidates, and delivering structured insights so your team can 
          focus on what matters: finding the right people.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-xl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload Resume
          </button>
          <a href="https://github.com/Kalpana3007/SmartHire" target="_blank" rel="noreferrer"
            className="btn btn-ghost btn-xl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Stats Bar */}
        <div className="hero-stats-bar">
          <div className="hero-stat">
            <div className="hero-stat-number">
              10<span className="unit">×</span>
            </div>
            <div className="hero-stat-label">Faster Screening</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">
              98<span className="unit">%</span>
            </div>
            <div className="hero-stat-label">Accuracy Rate</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">
              500<span className="unit">+</span>
            </div>
            <div className="hero-stat-label">Skills Detected</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">
              PDF<span className="unit"> ✓</span>
            </div>
            <div className="hero-stat-label">Format Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
