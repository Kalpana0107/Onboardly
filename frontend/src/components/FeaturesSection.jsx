const features = [
  {
    icon: '⚡',
    iconColor: 'green',
    title: 'Instant Match Score',
    desc: 'Get a 0–100% compatibility score between any resume and job description in seconds.',
  },
  {
    icon: '🧠',
    iconColor: 'purple',
    title: 'Smart Skill Detection',
    desc: 'Automatically identifies technical and soft skills directly from resume text.',
  },
  {
    icon: '🏆',
    iconColor: 'gold',
    title: 'Ranked Candidates',
    desc: 'All uploaded candidates sorted from best to worst match automatically.',
  },
  {
    icon: '📁',
    iconColor: 'blue',
    title: 'Simple PDF Upload',
    desc: 'Drag and drop or click to upload. Supports all standard PDF resume formats.',
  },
  {
    icon: '🔍',
    iconColor: 'purple',
    title: 'Skill Gap Analysis',
    desc: 'See exactly which required skills a candidate has and which ones are missing.',
  },
  {
    icon: '📊',
    iconColor: 'green',
    title: 'Clean Dashboard',
    desc: 'View all candidates, scores and skills in one organised recruiter dashboard.',
  },
]

const FeaturesSection = () => {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <div className="dot" />
            Core Features
          </div>
          <h2 className="section-title">
            Everything You Need to{' '}
            <span className="text-gradient">Hire Smarter</span>
          </h2>
          <p className="section-subtitle">
            From automated resume screening to intelligent candidate ranking — SmartHire
            handles the heavy lifting so your team can focus on hiring decisions.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="feature-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`feature-icon-wrap ${f.iconColor}`}>
                {f.icon}
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
