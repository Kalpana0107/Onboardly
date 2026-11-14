const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <a className="navbar-logo" href="#top" style={{ marginBottom: '12px', display: 'inline-flex' }}>
              <div className="logo-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>OB</div>
              <span className="logo-text" style={{ fontSize: '18px' }}>Onboard<span>ly</span></span>
            </a>
            <p className="footer-brand-desc">
              AI-powered resume screening system built with React, Node.js, and Python NLP. 
              Automate your hiring process and find the right candidates faster.
            </p>
            <div className="footer-social">
              <a href="https://github.com/Kalpana0107/Onboardly" target="_blank" rel="noreferrer"
                className="footer-social-link" title="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link" title="Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link" title="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <div className="footer-col-title">Product</div>
            <div className="footer-links">
              <a href="#features" className="footer-link">Features</a>
              <a href="#hiw" className="footer-link">How It Works</a>
              <a href="#tech" className="footer-link">Tech Stack</a>
              <a href="#api" className="footer-link">API Docs</a>
              <a href="#roadmap" className="footer-link">Roadmap</a>
            </div>
          </div>

          {/* Tech */}
          <div>
            <div className="footer-col-title">Stack</div>
            <div className="footer-links">
              <a href="https://react.dev" target="_blank" rel="noreferrer" className="footer-link">React.js</a>
              <a href="https://nodejs.org" target="_blank" rel="noreferrer" className="footer-link">Node.js</a>
              <a href="https://spacy.io" target="_blank" rel="noreferrer" className="footer-link">spaCy NLP</a>
              <a href="https://expressjs.com" target="_blank" rel="noreferrer" className="footer-link">Express.js</a>
              <a href="https://www.postgresql.org" target="_blank" rel="noreferrer" className="footer-link">PostgreSQL</a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <div className="footer-col-title">Resources</div>
            <div className="footer-links">
              <a href="https://github.com/Kalpana0107/Onboardly" target="_blank" rel="noreferrer" className="footer-link">GitHub Repo</a>
              <a href="https://github.com/Kalpana0107/Onboardly/blob/main/README.md" target="_blank" rel="noreferrer" className="footer-link">Documentation</a>
              <a href="https://github.com/Kalpana0107/Onboardly/issues" target="_blank" rel="noreferrer" className="footer-link">Report Issue</a>
              <a href="https://github.com/Kalpana0107/Onboardly/pulls" target="_blank" rel="noreferrer" className="footer-link">Contributing</a>
              <a href="#" className="footer-link">MIT License</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {year} <span>Onboardly</span>. Built with ❤️ using React, Node.js &amp; Python NLP.
          </div>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="https://github.com/Kalpana0107/Onboardly" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
