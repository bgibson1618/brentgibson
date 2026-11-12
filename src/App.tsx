import { profile, projects, type Project } from './content';
import { pageUrl, type Page } from './paths';
import { ProjectDiagram } from './components/ProjectDiagram';
import { DemoWalkthrough } from './components/DemoWalkthrough';
import { Button } from './components/ui/button';

function Header({ base }: { base: string }) {
  const home = pageUrl(base, 'home');
  return <header className="site-header">
    <a className="brand" href={home} aria-label="Brent Gibson home">{profile.name}</a>
    <nav aria-label="Main navigation">
      <a href={`${home}#work`}>Work</a><a href={`${home}#about`}>About</a><a href={`${home}#contact`}>Contact</a>
      <Button asChild variant="outline" className="resume-link"><a href={`${base}brent-gibson-resume.pdf`} download>Resume <span className="sr-only">PDF download</span></a></Button>
    </nav>
  </header>;
}
function Contact() {
  return <section id="contact" className="contact" aria-labelledby="contact-heading">
    <h2 id="contact-heading">{profile.contactHeading}</h2><p>{profile.contact}</p>
    <a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a>
    <div className="social-links"><a href={profile.github}>GitHub</a><a href={profile.linkedin}>LinkedIn</a></div>
  </section>;
}
function Home({ base }: { base: string }) {
  return <>
    <section className="hero">
      <p className="eyebrow">{profile.location} <span aria-hidden="true">·</span> {profile.title}</p>
      <h1>{profile.headline}</h1><p className="intro-copy">{profile.introduction}</p>
      <a className="text-link" href="#work">Explore my work</a>
    </section>
    <section id="work" className="selected-work" aria-labelledby="work-heading">
      <h2 id="work-heading" className="section-label">Selected work</h2>
      {projects.map(project => <article className="project-row" key={project.id}>
        <div className="project-copy"><h3>{project.name}</h3><p className="descriptor">{project.descriptor}</p>
          <p>{project.summary}</p><a className="text-link" href={pageUrl(base, project.id)}>How {project.id === 'roster' ? 'Roster' : 'Memory'} works</a>
        </div><ProjectDiagram kind={project.id} />
      </article>)}
      <article className="supporting-project"><div><p className="eyebrow">Also built</p><h3>Retrieval for OpenEMR</h3></div><p>{profile.openemr}</p></article>
    </section>
    <section id="about" className="about" aria-labelledby="about-heading">
      <div><h2 id="about-heading">A little about me</h2><p>{profile.about}</p></div>
      <div className="education"><h3>Education &amp; training</h3><dl>{profile.education.map(entry => <div key={entry.institution}><dt>{entry.institution}</dt><dd>{entry.detail}</dd></div>)}</dl></div>
    </section><Contact />
  </>;
}
function ProjectPage({ project, base }: { project: Project; base: string }) {
  const other = projects.find(p => p.id !== project.id)!;
  return <>
    <section className="project-hero">
      <a className="back-link" href={`${pageUrl(base, 'home')}#work`}>Back to selected work</a>
      <h1>{project.name}</h1><p className="project-subtitle">{project.descriptor}</p><p>{project.summary}</p>
      <div className="project-actions"><Button asChild><a href="#walkthrough">Try the walkthrough</a></Button>
        {project.source && <a className="text-link" href={project.source}>View source on GitHub</a>}</div>
    </section>
    <div className="case-study">
      <section className="story-section"><h2>Why I built it</h2><p>{project.problem}</p></section>
      <section className="story-section"><h2>What I built</h2><p>{project.contribution}</p></section>
      <div id="walkthrough"><DemoWalkthrough project={project} /></div>
      <section className="architecture" aria-labelledby="architecture-heading">
        <div><h2 id="architecture-heading">How the pieces fit</h2>{project.architecture.map(part => <div className="architecture-part" key={part.title}><h3>{part.title}</h3><p>{part.text}</p></div>)}</div>
        <ProjectDiagram kind={project.id} />
      </section>
      <section className="story-section"><h2>A tradeoff worth making explicit</h2><p>{project.tradeoff}</p></section>
      <section className="story-section"><h2>What comes next</h2><p>{project.next}</p></section>
      <aside className="other-project"><span>More of my work</span><a href={pageUrl(base, other.id)}>{other.name}</a></aside>
    </div><Contact />
  </>;
}

export function App({ page, base }: { page: Page; base: string }) {
  const project = projects.find(p => p.id === page);
  return <div className="site-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header base={base} />
    <main id="main-content">{project ? <ProjectPage key={project.id} project={project} base={base} /> : <Home base={base} />}</main>
    <footer className="site-footer"><p>{profile.name} <span aria-hidden="true">·</span> Austin, TX</p><a href={`${pageUrl(base, 'home')}#contact`}>Get in touch</a></footer>
  </div>;
}
