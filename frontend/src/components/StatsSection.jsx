const stats = [
  { num: '< 3 sec', label: 'Average screening time per resume', color: 'green' },
  { num: '500+', label: 'Skills detected automatically', color: 'purple' },
  { num: '100%', label: 'PDF format support', color: 'blue' },
]

const StatsSection = () => {
  return (
    <section className="stats-section" id="stats">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 64px' }}>
          <div className="section-badge">
            <div className="dot" />
            By the Numbers
          </div>
          <h2 className="section-title">
            Built for <span className="text-gradient">Speed & Accuracy</span>
          </h2>
          <p className="section-subtitle">
            SmartHire delivers fast, reliable resume screening so you can hire with confidence.
          </p>
        </div>

        <div className="stats-grid stats-grid-3" style={{ width: '100%' }}>
          {stats.map(s => (
            <div className="stat-card" key={s.num}>
              <div className={`stat-num ${s.color}`}>{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
