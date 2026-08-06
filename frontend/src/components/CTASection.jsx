import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-inner">
          <div className="section-badge" style={{ margin: '0 auto 24px' }}>
            <div className="dot" />
            Open Source
          </div>
          <h2 className="cta-title">
            Ready to Transform
            <br />
            <span className="text-gradient">Your Hiring Process?</span>
          </h2>
          <p className="cta-subtitle">
            SmartHire is open source and free to use. Deploy it on your infrastructure, 
            contribute to the project, or simply start screening resumes smarter today.
          </p>
          <div className="cta-actions">
            <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-xl">
              🚀 Try It Now
            </button>
            <a
              href="https://github.com/Kalpana3007/SmartHire"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Star on GitHub
            </a>
          </div>
          <p className="cta-note">
            ⭐ Free & open source · React + Node.js + Python NLP · MIT License
          </p>
        </div>
      </div>
    </section>
  )
}

export default CTASection
