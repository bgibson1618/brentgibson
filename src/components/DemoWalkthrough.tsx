import { useState } from 'react';
import type { Project } from '../content';
import { demoIndex } from '../paths';
import { Button } from './ui/button';

export function DemoWalkthrough({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const step = project.demo[index];
  return <section className="walkthrough" aria-labelledby="walkthrough-title">
    <div className="section-intro"><h2 id="walkthrough-title">A small walkthrough</h2>
      <p>These are hand-authored sample steps, not a recording or a live model run.</p></div>
    <div className="walkthrough-body" aria-live="polite" aria-atomic="true">
      <p className="step-count">Step {index + 1} of {project.demo.length}</p>
      <h3>{step.title}</h3><p>{step.description}</p>
      <div className="example-panel"><p className="example-label">{step.label}</p><pre>{step.example}</pre></div>
      <p className="takeaway">{step.takeaway}</p>
    </div>
    <div className="walkthrough-controls">
      <Button variant="outline" disabled={index === 0} onClick={() => setIndex(i => demoIndex(i, 'previous', project.demo.length))}>Previous step</Button>
      <Button disabled={index === project.demo.length - 1} onClick={() => setIndex(i => demoIndex(i, 'next', project.demo.length))}>Next step</Button>
      <Button variant="ghost" disabled={index === 0} onClick={() => setIndex(0)}>Start over</Button>
    </div>
    <noscript><p className="no-script-note">Enable JavaScript to step through this sample. The first step and all project information are available here.</p></noscript>
  </section>;
}
