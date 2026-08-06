import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy — track which section is in view
  useEffect(() => {
    const sectionIds = ['home', 'features', 'hiw']
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'How It Works', href: '#hiw', id: 'hiw' },
  ]

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="top">
        <div className="navbar-inner">
          {/* Logo */}
          <a className="navbar-logo" href="#home">
            <div className="logo-icon">SH</div>
            <span className="logo-text">Smart<span>Hire</span></span>
          </a>

          {/* Desktop Links */}
          <div className="navbar-links">
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                className={activeSection === l.id ? 'active' : ''}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            <a
              href="https://github.com/Kalpana0107/SmartHire"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary btn-sm"
            >
              Try Demo →
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle navigation menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
        {navLinks.map(l => (
          <a
            key={l.label}
            href={l.href}
            className={activeSection === l.id ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <div className="mobile-menu-actions">
          <a
            href="https://github.com/Kalpana0107/SmartHire"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            ⭐ Star on GitHub
          </a>
          <button
            className="btn btn-primary"
            onClick={() => { setMenuOpen(false); navigate('/dashboard'); }}
          >
            Try Demo →
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
