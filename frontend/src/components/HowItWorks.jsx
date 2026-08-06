const steps = [
  {
    icon: '📄',
    num: '01',
    title: 'Upload Resume',
    desc: 'Drag and drop a PDF resume or click to browse files.',
  },
  {
    icon: '📋',
    num: '02',
    title: 'Paste Job Description',
    desc: 'Enter the role requirements and skills you are looking for.',
  },
  {
    icon: '🎯',
    num: '03',
    title: 'Get Instant Results',
    desc: 'See match score, extracted skills, and candidate ranking instantly.',
  },
]

const HowItWorks = () => {
  return (
    <section className="hiw-section" id="hiw">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 64px' }}>
          <div className="section-badge purple">
            <div className="dot" />
            How It Works
          </div>
          <h2 className="section-title">
            How <span className="text-gradient">SmartHire</span> Works
          </h2>
          <p className="section-subtitle">
            Three simple steps to find the best candidates for your role — 
            no manual screening required.
          </p>
        </div>

        <div className="hiw-grid hiw-grid-3" style={{ position: 'relative' }}>
          <div className="hiw-connector" />
          {steps.map((step) => (
            <div className="hiw-step" key={step.num}>
              <div className="hiw-step-num">
                {step.icon}
                <span>{step.num}</span>
              </div>
              <div className="hiw-step-title">{step.title}</div>
              <div className="hiw-step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
