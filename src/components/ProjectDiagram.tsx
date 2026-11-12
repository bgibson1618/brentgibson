export function ProjectDiagram({ kind }: { kind: 'roster' | 'memory' }) {
  return kind === 'roster' ? (
    <figure className="project-diagram" aria-label="Concept diagram of Task Force's coordination model">
      <div className="diagram-coordinator">Your orchestrating agent</div>
      <div className="diagram-connector" aria-hidden="true" />
      <div className="diagram-backends"><span>Claude</span><span>Codex</span><span>Antigravity</span></div>
      <div className="diagram-observation"><span>Shared messages</span><span>Visible run records</span></div>
      <figcaption>One coordination layer. Multiple backends.</figcaption>
    </figure>
  ) : (
    <figure className="project-diagram" aria-label="Concept diagram of Folio's retrieval paths">
      <div className="diagram-memory-source">Shared knowledge<span>Versioned Markdown</span></div>
      <div className="diagram-retrieval">
        <div><strong>Words</strong><span>Keyword search</span></div>
        <div><strong>Meaning</strong><span>Semantic search</span></div>
        <div><strong>Connections</strong><span>Graph traversal</span></div>
      </div>
      <div className="diagram-memory-result">Useful context for the next task</div>
      <figcaption>Three ways to find what an agent needs.</figcaption>
    </figure>
  );
}
