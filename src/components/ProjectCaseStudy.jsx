import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from 'lucide-react';
import { CASE_STUDY_PRESENTATION } from '../data/caseStudyPresentation';
import './ProjectCaseStudy.css';

// Sections render in place. No scroll-triggered entrances: the page should read like a document.
function Reveal({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

function ComplianceCover({ presentation }) {
  const [phase, setPhase] = useState(1);
  return <div className="cs-compliance-cover">
    <div className="cs-cover-caption"><span>From regulation to remediation</span><span>Illustration</span></div>
    <div className="cs-document-scene" aria-hidden="true">
      <div className="cs-source-paper"><span>Regulatory requirement</span><strong>What the<br />rule says</strong><i /><i /><i /><i /><small>Parsed into structured input</small></div>
      <div className="cs-control-stamp"><span>Control<br />gap</span><ArrowRight size={26} /></div>
      <div className="cs-action-paper"><div><span>Azure DevOps</span><span>Work item</span></div><strong>What the<br />team does next</strong><p>Requirement linked<br />Control gap assessed<br />Remediation planned</p><span className="cs-paper-rule" /><small>Linked back to the requirement</small></div>
    </div>
    <div className="cs-phase-selector" role="group" aria-label="Explore the compliance workflow">
      {presentation.phases.map((item, i) => <button key={item.title} aria-pressed={phase === i}
        onClick={() => setPhase(i)}><span>{i + 1}</span>{item.title}</button>)}
    </div>
    <p className="cs-phase-explanation" aria-live="polite">{presentation.phases[phase].text}</p>
  </div>;
}

function RiskCover() {
  const [selected, setSelected] = useState({ likelihood: 4, impact: 4 });
  const score = selected.likelihood * selected.impact;
  return <div className="cs-risk-cover">
    <div className="cs-cover-caption"><span>HomeSphere Robotics</span><span>Illustration of the scoring model</span></div>
    <div className="cs-risk-layout"><div className="cs-risk-context"><span>Likelihood × impact</span><strong>Risk<br />score</strong><p>Pick a cell to see its score.</p><div className="cs-risk-readout" aria-live="polite"><b>{score}<small> / 25</small></b><span>Likelihood {selected.likelihood}<br />Impact {selected.impact}</span></div></div>
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
  return <div className="cs-evidence-cover"><div className="cs-cover-caption"><span>SecureShare, simulated incident</span><span>Illustration</span></div>
    <div className="cs-evidence-heading"><span>Incident response</span><strong>What we<br />found</strong></div>
    <div className="cs-evidence-trail">{presentation.evidence.map(item => <div className="cs-evidence-item" key={item.code}><code>{item.code}</code><strong>{item.title}</strong><small>{item.detail}</small></div>)}</div>
    <p className="cs-evidence-note">A few of the techniques, mapped to MITRE ATT&CK</p>
  </div>;
}

function MonitoringCover() {
  return <div className="cs-monitor-cover"><div className="cs-cover-caption"><span>Windows event logs in PowerShell</span><span>Illustration</span></div>
    <div className="cs-monitor-heading"><div><span>Event ID 4625</span><strong>Five failures,<br />one alert</strong></div><span className="cs-monitor-threshold">5+ failed logons<br />within 60 seconds</span></div>
    <div className="cs-event-track" aria-label="Illustration of five failed logons leading to a brute-force alert">{[1, 2, 3, 4, 5].map(number => <div className="cs-event" key={number}><span aria-hidden="true" /><code>4625</code><small>Failed logon</small></div>)}<div className="cs-event cs-event-alert"><span aria-hidden="true">!</span><strong>Alert</strong><small>Threshold reached</small></div></div>
    <div className="cs-monitor-footer"><span>Collect</span><span>Correlate</span><span>Notify</span></div>
  </div>;
}

function FindingsCover({ presentation }) {
  return <div className="cs-findings-cover"><div className="cs-cover-caption"><span>Sandbox web app</span><span>Illustration</span></div>
    <div className="cs-findings-layout"><div><span>Black-box test</span><strong>What<br />broke</strong><p>Recon, then proof,<br />then a fix for each one.</p></div><div className="cs-findings-paper"><span>Findings</span>{presentation.findings.map((finding, i) => <div key={finding}><code>F{i + 1}</code><strong>{finding}</strong><ArrowUpRight size={16} /></div>)}<small>Tested in a controlled environment</small></div></div>
  </div>;
}

function RecordsCover() {
  return <div className="cs-records-cover"><div className="cs-cover-caption"><span>Student records in Flask and MySQL</span><span>Illustration</span></div>
    <strong className="cs-records-title">Who can see<br />which records</strong>
    <div className="cs-records-flow"><div><span>Access</span><strong>Staff sign-in</strong><small>Session and role checks</small></div><ArrowRight size={25} /><div><span>Application</span><strong>Flask</strong><small>Validation and app logic</small></div><ArrowRight size={25} /><div><span>Storage</span><strong>MySQL</strong><small>Indexed tables</small></div></div>
  </div>;
}

function ProjectCover({ project, presentation }) {
  if (presentation.cover === 'screenshot') {
    return <div className="cs-product-cover"><div className="cs-cover-caption"><span>TradeForge practice screen</span><span>Real screenshot</span></div><div className="cs-browser-frame"><div className="cs-browser-toolbar" aria-hidden="true"><span /><span /><span /><code>TradeForge</code></div><img src="screenshots/practice.png" alt="TradeForge practice workspace, with historical chart replay, market overlays, and an order panel" fetchPriority="high" /></div></div>;
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
  return <dialog ref={dialog} className="cs-image-dialog" aria-label="Enlarged project screenshot" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}><div className="cs-image-dialog-bar"><p>{screenshot.title}. {screenshot.caption}</p><button ref={close} onClick={onClose} aria-label="Close enlarged screenshot"><X size={24} /></button></div><img src={screenshot.src} alt={`${screenshot.title}: ${screenshot.caption}`} /></dialog>;
}

function ScreenshotGallery({ screenshots }) {
  const [active, setActive] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const opener = useRef(null);
  const screenshot = screenshots[active];
  const closeViewer = () => { setEnlarged(false); requestAnimationFrame(() => opener.current?.focus()); };
  return <section className="cs-gallery" id="cs-gallery" aria-labelledby="cs-gallery-heading"><div className="cs-section-heading"><div><h2 id="cs-gallery-heading">Screenshots</h2></div><span className="cs-gallery-count">{active + 1} of {screenshots.length}</span></div>
    <div className="cs-gallery-selector" role="group" aria-label="Choose a screenshot">{screenshots.map((item, i) => <button key={item.src} aria-pressed={active === i} onClick={() => setActive(i)}>{item.title}</button>)}</div>
    <figure><button ref={opener} className="cs-screenshot-button" onClick={() => setEnlarged(true)} aria-label={`Enlarge screenshot: ${screenshot.title}`}><img key={screenshot.src} src={screenshot.src} alt={`${screenshot.title}: ${screenshot.caption}`} loading="lazy" /><span><Expand size={17} /> Enlarge</span></button><figcaption aria-live="polite"><strong>{screenshot.title}.</strong> {screenshot.caption}</figcaption></figure>
    {enlarged && <ImageViewer screenshot={screenshot} onClose={closeViewer} />}
  </section>;
}

function Architecture({ project }) {
  const steps = project.architecture?.split('→').map(step => step.trim()) || [];
  return <section className="cs-system" id="cs-system" aria-labelledby="cs-system-heading"><div className="cs-section-heading"><div><h2 id="cs-system-heading">How it works</h2></div></div><ol className="cs-system-flow">{steps.map((step, i) => <li key={`${step}-${i}`}><span>{i + 1}</span><strong>{step}</strong>{i < steps.length - 1 && <ArrowRight aria-hidden="true" size={19} />}</li>)}</ol></section>;
}

export default function ProjectCaseStudy({ project, onBack, onNext, nextProject, dm }) {
  const heading = useRef(null);
  const presentation = CASE_STUDY_PRESENTATION[project.id];
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); heading.current?.focus({ preventScroll: true }); }, [project.id]);
  return <div className={`case-study-page ${dm ? 'cs-dark' : 'cs-light'}`}>
    <a className="cs-skip" href="#cs-context">Skip to the project story</a>
    <nav className="cs-topbar" aria-label="Case study navigation"><div className="cs-container"><button className="cs-back" onClick={onBack}><ArrowLeft size={17} />Back to portfolio</button><span>Nathan Salman</span><a href="#cs-results">Skip to results <ArrowDownIcon /></a></div></nav>
    <main className="cs-container">
      <header className="cs-header"><div className="cs-header-top"><span className="cs-label">{presentation.category}</span><span className="cs-status"><i />{project.status === 'In Progress' ? 'Still building' : 'Finished'}, {project.period}</span></div><h1 ref={heading} tabIndex={-1}>{project.title}</h1><div className="cs-header-bottom"><p>{presentation.intro}</p>{project.liveUrl && <a className="cs-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Open the live site <ArrowUpRight size={20} /></a>}</div></header>
      <Reveal className={`cs-cover cs-cover-${presentation.cover}`}><ProjectCover project={project} presentation={presentation} /><p className="cs-figure-caption">{presentation.caption}</p></Reveal>
      <div className="cs-story-layout"><aside className="cs-story-rail"><span className="cs-label">On this page</span><nav aria-label="On this page"><a href="#cs-context">Background</a>{project.screenshots && <a href="#cs-gallery">Screenshots</a>}<a href="#cs-system">How it works</a><a href="#cs-build">Technical details</a><a href="#cs-results">Results</a></nav><div className="cs-tools"><span className="cs-label">Tools</span><p>{project.tags.join(', ')}</p></div></aside>
        <div className="cs-story-main"><Reveal><section className="cs-context" id="cs-context"><h2>{presentation.headline}</h2><p className="cs-lead">{project.overview}</p><div className="cs-problem-solution"><div><h3>The problem</h3><p>{project.problem}</p></div><div><h3>What I built</h3><p>{project.solution}</p></div></div></section></Reveal>
          {project.screenshots && <Reveal><ScreenshotGallery screenshots={project.screenshots} /></Reveal>}
          <Reveal><Architecture project={project} /></Reveal>
          <Reveal><section className="cs-build" id="cs-build"><div className="cs-section-heading"><div><h2>Technical details</h2></div></div><dl className="cs-technical-list">{project.techDetails.map(detail => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl></section></Reveal>
          {project.featureCards && <Reveal><section className="cs-features"><h2>Features</h2><div>{project.featureCards.map(feature => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.desc}</p></article>)}</div></section></Reveal>}
          {(project.individualContributions || project.teamProcess) && <Reveal><section className="cs-contribution"><h2>My part</h2>{project.individualContributions && <p className="cs-contribution-lead">{project.individualContributions}</p>}{project.teamProcess && <div><h3>Working with the team</h3><p>{project.teamProcess}</p></div>}</section></Reveal>}
          <Reveal><section className="cs-results" id="cs-results"><h2 className="cs-results-title">Results</h2><div className="cs-result-headline"><strong>{presentation.highlight.value}</strong><div><p className="cs-result-label">{presentation.highlight.label}</p><p>{presentation.highlight.note}</p></div></div><ul>{project.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul>{project.stats && <dl className="cs-extra-stats">{project.stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd><strong>{stat.value}</strong><span>{stat.sub}</span></dd></div>)}</dl>}</section></Reveal>
          {project.takeaways && <Reveal><section className="cs-reflections"><h2>What I learned</h2><ul>{project.takeaways.map(item => <li key={item}>{item}</li>)}</ul></section></Reveal>}
          {project.nextSteps && <Reveal><section className="cs-reflections"><h2>What's next</h2><ul>{project.nextSteps.map(item => <li key={item}>{item}</li>)}</ul></section></Reveal>}
        </div>
      </div>
      <footer className="cs-footer"><button className="cs-back" onClick={onBack}><ArrowLeft size={17} />All projects</button>{nextProject && <button className="cs-next" onClick={onNext}><span>Next project</span><strong>{nextProject.title}</strong><ArrowUpRight size={28} /></button>}</footer>
    </main>
  </div>;
}

function ArrowDownIcon() {
  return <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3v13m-5-5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" /></svg>;
}
