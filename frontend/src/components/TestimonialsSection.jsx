const testimonials = [
  {
    quote: 'Reduced our screening time from 2 hours to 10 minutes.',
    role: 'HR Manager, Tech Startup',
    avatar: 'HM',
    grad: 'linear-gradient(135deg, #00e5a0, #3b82f6)',
  },
  {
    quote: 'The match score helps us shortlist candidates without reading every resume.',
    role: 'Recruitment Lead, MNC',
    avatar: 'RL',
    grad: 'linear-gradient(135deg, #7c3aed, #a855f7)',
  },
  {
    quote: 'Simple to use, accurate results. Exactly what we needed.',
    role: 'Talent Acquisition, IT Firm',
    avatar: 'TA',
    grad: 'linear-gradient(135deg, #f59e0b, #f87171)',
  },
]

const TestimonialsSection = () => {
  return (
    <section style={{ padding: 'var(--section-padding)', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 56px' }}>
          <div className="section-badge purple">
            <div className="dot" />
            Testimonials
          </div>
          <h2 className="section-title">
            Trusted by <span className="text-gradient">Hiring Teams</span>
          </h2>
          <p className="section-subtitle">
            See how SmartHire is transforming the recruitment workflows of teams across industries.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          width: '100%',
        }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.role}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                transition: 'all 0.3s ease',
                cursor: 'default',
                animationDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-card)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7', flex: 1 }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: t.grad,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>— {t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default TestimonialsSection
