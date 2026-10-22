import { useEffect, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from 'lucide-react';
import { CASE_STUDY_PRESENTATION } from '../data/caseStudyPresentation';
import './ProjectCaseStudy.css';

function Reveal({ children, className = '' }) {
  const reduced = useReducedMotion();
  return <Motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.06 }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>{children}</Motion.div>;
}

function ComplianceCover({ presentation }) {
  const [phase, setPhase] = useState(1);
  return <div className="cs-compliance-cover">
    <div className="cs-cover-caption"><span>Regulation → remediation</span><span>Workflow illustration</span></div>
    <div className="cs-document-scene" aria-hidden="true">
      <div className="cs-source-paper"><span>Regulatory requirements</span><strong>Understand<br />the obligation.</strong><i /><i /><i /><i /><small>Structured regulatory input</small></div>
      <div className="cs-control-stamp"><span>Control<br />gap</span><ArrowRight size={26} /></div>
      <div className="cs-action-paper"><div><span>Azure DevOps</span><span>Work item</span></div><strong>Make the<br />next step clear.</strong><p>Requirement linked<br />Control gap assessed<br />Remediation planned</p><span className="cs-paper-rule" /><small>Traceable by design ↗</small></div>
    </div>
    <div className="cs-phase-selector" role="group" aria-label="Explore the compliance workflow">
      {presentation.phases.map((item, i) => <button key={item.title} aria-pressed={phase === i}
        onClick={() => setPhase(i)}><span>{String(i + 1).padStart(2, '0')}</span>{item.title}</button>)}
    </div>
    <p className="cs-phase-explanation" aria-live="polite">{presentation.phases[phase].text}</p>
  </div>;
}

function RiskCover() {
  const [selected, setSelected] = useState({ likelihood: 4, impact: 4 });
  const score = selected.likelihood * selected.impact;
  return <div className="cs-risk-cover">
    <div className="cs-cover-caption"><span>HomeSphere Robotics</span><span>Illustrative scoring model</span></div>
    <div className="cs-risk-layout"><div className="cs-risk-context"><span>Likelihood × impact</span><strong>See where<br />risk sits.</strong><p>Select a cell to explore the scoring model.</p><div className="cs-risk-readout" aria-live="polite"><b>{score}<small> / 25</small></b><span>Likelihood {selected.likelihood}<br />Impact {selected.impact}</span></div></div>
      <div className="cs-matrix-wrap"><span className="cs-matrix-y">Likelihood ↑</span><div className="cs-risk-matrix" role="group" aria-label="Illustrative risk scoring matrix">
        {[5, 4, 3, 2, 1].flatMap(likelihood => [1, 2, 3, 4, 5].map(impact => {
          const cellScore = likelihood * impact;
          const tier = cellScore >= 16 ? 'high' : cellScore >= 9 ? 'medium' : 'low';
          const active = selected.likelihood === likelihood && selected.impact === impact;
          return <button key={`${likelihood}-${impact}`} className={`cs-risk-cell cs-risk-${tier}`}
            aria-label={`Likelihood ${likelihood}, impact ${impact}, score ${cellScore}`} aria-pressed={active}
            onClick={() => setSelected({ likelihood, impact })}>{active ? <span aria-hidden="true">×</span> : cellScore}</button>;
        }))}
      </div><span className="cs-matrix-x">Impact →</span></div>
    </div>
  </div>;
}

function EvidenceCover({ presentation }) {
  return <div className="cs-evidence-cover"><div className="cs-cover-caption"><span>SecureShare / simulated incident</span><span>Investigation illustration</span></div>
    <div className="cs-evidence-heading"><span>Incident response</span><strong>Connect<br />the evidence.</strong></div>
    <div className="cs-evidence-trail">{presentation.evidence.map((item, i) => <div className="cs-evidence-item" key={item.code}><span className="cs-evidence-index">{String(i + 1).padStart(2, '0')}</span><code>{item.code}</code><strong>{item.title}</strong><small>{item.detail}</small></div>)}</div>
    <p className="cs-evidence-note">Selected techniques mapped to MITRE ATT&CK</p>
  </div>;
}

function MonitoringCover() {
  return <div className="cs-monitor-cover"><div className="cs-cover-caption"><span>Windows event logs / PowerShell</span><span>Detection illustration</span></div>
    <div className="cs-monitor-heading"><div><span>Event ID 4625</span><strong>A pattern.<br />Then an alert.</strong></div><span className="cs-monitor-threshold">5+ failed logons<br />within 60 seconds</span></div>
    <div className="cs-event-track" aria-label="Illustration of five failed logons leading to a brute-force alert">{[1, 2, 3, 4, 5].map(number => <div className="cs-event" key={number}><span aria-hidden="true" /><code>4625</code><small>Failed logon</small></div>)}<div className="cs-event cs-event-alert"><span aria-hidden="true">!</span><strong>Alert</strong><small>Threshold reached</small></div></div>
    <div className="cs-monitor-footer"><span>Collect</span><span>Correlate</span><span>Notify</span></div>
  </div>;
}

function FindingsCover({ presentation }) {
  return <div className="cs-findings-cover"><div className="cs-cover-caption"><span>Sandbox web application</span><span>Assessment illustration</span></div>
    <div className="cs-findings-layout"><div><span>Black-box assessment</span><strong>Test the<br />assumptions.</strong><p>Reconnaissance.<br />Evidence.<br />Remediation.</p></div><div className="cs-findings-paper"><span>Assessment / findings register</span>{presentation.findings.map((finding, i) => <div key={finding}><code>F–0{i + 1}</code><strong>{finding}</strong><ArrowUpRight size={16} /></div>)}<small>Controlled environment · documented findings</small></div></div>
  </div>;
}

function RecordsCover() {
  return <div className="cs-records-cover"><div className="cs-cover-caption"><span>Student data / Flask + MySQL</span><span>System illustration</span></div>
    <strong className="cs-records-title">The right records.<br />The right access.</strong>
    <div className="cs-records-flow"><div><span>Access</span><strong>Staff sign-in</strong><small>Session + role checks</small></div><ArrowRight size={25} /><div><span>Application</span><strong>Flask</strong><small>Validation + business logic</small></div><ArrowRight size={25} /><div><span>Storage</span><strong>MySQL</strong><small>Structured, indexed records</small></div></div>
  </div>;
}

function ProjectCover({ project, presentation }) {
  if (presentation.cover === 'screenshot') {
    return <div className="cs-product-cover"><div className="cs-cover-caption"><span>TradeForge / practice workspace</span><span>Actual application screenshot</span></div><div className="cs-browser-frame"><div className="cs-browser-toolbar" aria-hidden="true"><span /><span /><span /><code>TradeForge · Practice</code></div><img src="/screenshots/practice.png" alt="TradeForge practice workspace, with historical chart replay, market overlays, and an order panel" fetchPriority="high" /></div></div>;
  }
  if (presentation.cover === 'compliance') return <ComplianceCover presentation={presentation} />;
  if (presentation.cover === 'risk') return <RiskCover />;
  if (presentation.cover === 'evidence') return <EvidenceCover presentation={presentation} />;
  if (presentation.cover === 'monitoring') return <MonitoringCover />;
  if (presentation.cover === 'findings') return <FindingsCover presentation={presentation} />;
  if (presentation.cover === 'records') return <RecordsCover />;
  return <div className="cs-cover-fallback">{project.title}</div>;
}

function ImageViewer({ screenshot, onClose }) {
  const dialog = useRef(null);
  const close = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element.showModal();
    close.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = overflow; };
  }, []);
  return <dialog ref={dialog} className="cs-image-dialog" aria-label="Enlarged project screenshot" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}><div className="cs-image-dialog-bar"><p>{screenshot.caption}</p><button ref={close} onClick={onClose} aria-label="Close enlarged screenshot"><X size={24} /></button></div><img src={screenshot.src} alt={screenshot.caption} /></dialog>;
}

function ScreenshotGallery({ screenshots }) {
  const [active, setActive] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const opener = useRef(null);
  const screenshot = screenshots[active];
  const closeViewer = () => { setEnlarged(false); requestAnimationFrame(() => opener.current?.focus()); };
  return <section className="cs-gallery" id="cs-gallery" aria-labelledby="cs-gallery-heading"><div className="cs-section-heading"><div><span className="cs-label">Inside the product</span><h2 id="cs-gallery-heading">Take a closer look.</h2></div><span className="cs-gallery-count">{String(active + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}</span></div>
    <div className="cs-gallery-selector" role="group" aria-label="Choose a screenshot">{screenshots.map((item, i) => <button key={item.src} aria-pressed={active === i} onClick={() => setActive(i)}>{item.caption.split('—')[0].trim()}</button>)}</div>
    <figure><button ref={opener} className="cs-screenshot-button" onClick={() => setEnlarged(true)} aria-label={`Enlarge ${screenshot.caption}`}><img key={screenshot.src} src={screenshot.src} alt={screenshot.caption} loading="lazy" /><span><Expand size={17} /> Expand image</span></button><figcaption aria-live="polite">{screenshot.caption}</figcaption></figure>
    {enlarged && <ImageViewer screenshot={screenshot} onClose={closeViewer} />}
  </section>;
}

function Architecture({ project }) {
  const steps = project.architecture?.split('→').map(step => step.trim()) || [];
  return <section className="cs-system" id="cs-system" aria-labelledby="cs-system-heading"><div className="cs-section-heading"><div><span className="cs-label">The system</span><h2 id="cs-system-heading">How the pieces connect.</h2></div><span className="cs-side-note">From input to outcome</span></div><ol className="cs-system-flow">{steps.map((step, i) => <li key={`${step}-${i}`}><span>{String(i + 1).padStart(2, '0')}</span><strong>{step}</strong>{i < steps.length - 1 && <ArrowRight aria-hidden="true" size={19} />}</li>)}</ol></section>;
}

export default function ProjectCaseStudy({ project, onBack, onNext, nextProject, dm }) {
  const heading = useRef(null);
  const presentation = CASE_STUDY_PRESENTATION[project.id];
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); heading.current?.focus({ preventScroll: true }); }, [project.id]);
  return <div className={`case-study-page ${dm ? 'cs-dark' : 'cs-light'}`}>
    <a className="cs-skip" href="#cs-context">Skip to the project story</a>
    <nav className="cs-topbar" aria-label="Case study navigation"><div className="cs-container"><button className="cs-back" onClick={onBack}><ArrowLeft size={17} />Back to portfolio</button><span>Nathan Salman <span aria-hidden="true">/</span> Selected work</span><a href="#cs-results">Jump to results <ArrowDownIcon /></a></div></nav>
    <main className="cs-container">
      <header className="cs-header"><div className="cs-header-top"><span className="cs-label">{presentation.category}</span><span className="cs-status"><i />{project.status} · {project.period}</span></div><h1 ref={heading} tabIndex={-1}>{project.title}</h1><div className="cs-header-bottom"><p>{presentation.intro}</p>{project.liveUrl && <a className="cs-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit the live project <ArrowUpRight size={20} /></a>}</div></header>
      <Reveal className={`cs-cover cs-cover-${presentation.cover}`}><ProjectCover project={project} presentation={presentation} /><p className="cs-figure-caption">{presentation.caption}</p></Reveal>
      <div className="cs-story-layout"><aside className="cs-story-rail"><span className="cs-label">In this case study</span><nav aria-label="On this page"><a href="#cs-context">The context</a>{project.screenshots && <a href="#cs-gallery">Product walkthrough</a>}<a href="#cs-system">The system</a><a href="#cs-build">The work</a><a href="#cs-results">The results</a></nav><div className="cs-tools"><span className="cs-label">Worked with</span><p>{project.tags.join(' / ')}</p></div></aside>
        <div className="cs-story-main"><Reveal><section className="cs-context" id="cs-context"><span className="cs-label">The context</span><h2>{presentation.headline}</h2><p className="cs-lead">{project.overview}</p><div className="cs-problem-solution"><div><h3>The challenge</h3><p>{project.problem}</p></div><div><h3>What I built</h3><p>{project.solution}</p></div></div></section></Reveal>
          {project.screenshots && <Reveal><ScreenshotGallery screenshots={project.screenshots} /></Reveal>}
          <Reveal><Architecture project={project} /></Reveal>
          <Reveal><section className="cs-build" id="cs-build"><div className="cs-section-heading"><div><span className="cs-label">Under the surface</span><h2>The decisions behind the work.</h2></div></div><dl className="cs-technical-list">{project.techDetails.map(detail => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl></section></Reveal>
          {project.featureCards && <Reveal><section className="cs-features"><span className="cs-label">In practice</span><h2>Built around the workflow.</h2><div>{project.featureCards.map(feature => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.desc}</p></article>)}</div></section></Reveal>}
          {(project.individualContributions || project.teamProcess) && <Reveal><section className="cs-contribution"><span className="cs-label">My part in the project</span><h2>From the idea to the handoff.</h2>{project.individualContributions && <p className="cs-contribution-lead">{project.individualContributions}</p>}{project.teamProcess && <div><h3>Working with the team</h3><p>{project.teamProcess}</p></div>}</section></Reveal>}
          <Reveal><section className="cs-results" id="cs-results"><span className="cs-label">What came out of it</span><div className="cs-result-headline"><strong>{presentation.highlight.value}</strong><div><h2>{presentation.highlight.label}</h2><p>{presentation.highlight.note}</p></div></div><ul>{project.outcomes.map(outcome => <li key={outcome}><span aria-hidden="true">↗</span>{outcome}</li>)}</ul>{project.stats && <dl className="cs-extra-stats">{project.stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd><strong>{stat.value}</strong><span>{stat.sub}</span></dd></div>)}</dl>}</section></Reveal>
          {project.takeaways && <Reveal><section className="cs-reflections"><span className="cs-label">Looking back</span><h2>What I’ll take into the next project.</h2><ul>{project.takeaways.map(item => <li key={item}>{item}</li>)}</ul></section></Reveal>}
          {project.nextSteps && <Reveal><section className="cs-reflections"><h2>Still to explore.</h2><ul>{project.nextSteps.map(item => <li key={item}>{item}</li>)}</ul></section></Reveal>}
        </div>
      </div>
      <footer className="cs-footer"><button className="cs-back" onClick={onBack}><ArrowLeft size={17} />All projects</button>{nextProject && <button className="cs-next" onClick={onNext}><span>Next case study</span><strong>{nextProject.title}</strong><ArrowUpRight size={28} /></button>}</footer>
    </main>
  </div>;
}

function ArrowDownIcon() {
  return <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3v13m-5-5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" /></svg>;
}
