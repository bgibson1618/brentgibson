// Edit the website's copy here. Examples below are fictional, not recorded runs.
export const profile = {
  name: 'Brent Gibson',
  location: 'Austin, Texas',
  title: 'AI & software engineer',
  email: 'bgibson1618@gmail.com',
  github: 'https://github.com/bgibson1618',
  linkedin: 'https://www.linkedin.com/in/brent-gibson-76386265/',
  headline: 'I build AI applications and tools that help agents work together.',
  introduction: 'Some of my most useful projects started with problems in my own development workflow. I built Ensemble to coordinate agents from different AI vendors, and Folio to carry useful knowledge between sessions and projects. I use both every day.',
  about: 'I like understanding how systems work, tracing problems to their source and building tools that make the next project easier. My background spans embedded software, AI evaluation and application development. During the Gauntlet AI fellowship, I built Folio as my capstone project.',
  contactHeading: 'What can I build for your team?',
  contact: 'I’m interested in engineering roles focused on LLM applications, evaluation and agent developer tools. I’m based in Austin and open to local or remote opportunities.',
  education: [
    { institution: 'Gauntlet AI fellowship', detail: 'Intensive ten-week program · April–July 2026' },
    { institution: 'California State University, Northridge', detail: 'B.S. Computer Science · 2022' },
    { institution: 'Santa Monica College', detail: 'Certificate of Achievement in Computer Science' },
  ],
  openemr: 'I built a retrieval-augmented generation (RAG) module that makes documents and medical guidelines accessible within OpenEMR, an open-source electronic health record system. The module runs as an independently deployable sidecar, so OpenEMR can operate without it. My work covered document ingestion, chunking, embeddings, retrieval, the API and evaluations.',
};

export type DemoStep = { title: string; description: string; label: string; example: string; takeaway: string };
export type Project = {
  id: 'roster' | 'memory'; name: string; descriptor: string; summary: string;
  problem: string; contribution: string; architecture: { title: string; text: string }[];
  tradeoffTitle?: string; tradeoff: string; next?: string; source?: string; demo: DemoStep[];
};
export const projects: Project[] = [
  {
    id: 'roster', name: 'Ensemble', descriptor: 'Coordination across AI vendors',
    summary: 'Ensemble gives Claude, Codex and Antigravity agents a common way to delegate tasks, exchange messages and review one another’s work. A shared monitoring console provides observability into each agent’s progress and results.',
    problem: 'Could a Claude agent delegate work to Codex—and could Codex do the same in return? That question became the starting point for Ensemble. I wanted agents from different vendors to collaborate within one workflow, with a clear view of their tasks, communication and results.',
    contribution: 'I designed and built a coordination layer around the Claude, Codex and Antigravity command-line tools. An orchestrating agent can assign roles, launch delegates, exchange messages and collect their results. A shared monitoring console and persistent run records make that work inspectable, both while it is running and afterward.',
    architecture: [
      { title: 'Assign the work', text: 'An orchestrator selects a role and backend for each task. An adapter translates that request into the appropriate vendor’s command-line invocation.' },
      { title: 'Coordinate the agents', text: 'Agents exchange messages and return results through a common interface. Each run retains its brief, output and status for later inspection.' },
      { title: 'Follow the progress', text: 'The monitoring console brings active runs and their records into one place, making it easier to follow several agents working in parallel.' },
    ],
    tradeoffTitle: 'Design tradeoffs',
    tradeoff: 'Building around existing command-line tools gives Ensemble access to the agents and capabilities those tools provide. It also creates a maintenance responsibility: vendors differ in their permissions, session behavior and available tools, and each adapter must account for those differences as the tools evolve.\n\nCross-vendor review brings another perspective to the work. Tests and direct verification are still needed to establish whether the result is correct.',
    demo: [
      { title: 'Give the work a clear brief', description: 'An orchestrator scopes a small implementation and the evidence a reviewer will need.', label: 'Example brief', example: 'Build a CSV preview that shows the parsed columns and rejects a file with no header. Include checks for an empty file and quoted commas.', takeaway: 'The task and acceptance examples travel together.' },
      { title: 'Delegate and keep the result visible', description: 'A builder uses one backend while the orchestrator can follow the run and retrieve its output.', label: 'Example handoff', example: 'Builder: preview component and parsing checks ready. Review the empty-file and quoted-comma cases before accepting the change.', takeaway: 'The result belongs to an inspectable run, not just a terminal scrollback.' },
      { title: 'Review from another perspective', description: 'A reviewer on a different backend examines the result and the supporting checks.', label: 'Example review finding', example: 'The empty-file case is covered. A file containing only blank lines needs an explicit check before this change is accepted.', takeaway: 'A review can identify a missing case; tests establish whether the behavior is correct.' },
    ],
  },
  {
    id: 'memory', name: 'Folio', descriptor: 'Shared knowledge across sessions and projects',
    summary: 'Folio gives AI agents a shared library of knowledge they can build on over time. Keyword, semantic and graph search help retrieve relevant context, while readable Markdown records keep that knowledge accessible to people as well.',
    problem: 'I wanted useful knowledge from one task to be available in the next, even when a different agent or project needed it. That meant creating a shared knowledge base that agents could search and that I could read and edit myself.',
    contribution: 'As my capstone for the Gauntlet AI fellowship, I built a knowledge storage and retrieval system for AI agents. Folio combines versioned Markdown records, SQLite full-text search, local embeddings and a relationship graph. These search methods draw from the same knowledge base and contribute to a combined set of results.',
    architecture: [
      { title: 'Keep knowledge readable', text: 'Folio stores knowledge in versioned Markdown based on the Open Knowledge Format, an open specification introduced by Google Cloud. These records are the source of truth; search indexes are derived from them.' },
      { title: 'Search by words, meaning and relationships', text: 'Keyword search finds explicit terms. Semantic search helps when a question uses different wording. Graph traversal follows connections between knowledge entries.' },
      { title: 'Combine the results', text: 'Reciprocal rank fusion combines the separate rankings into one result list, allowing each search method to contribute without directly comparing their different scoring systems.' },
    ],
    tradeoffTitle: 'Design tradeoffs',
    tradeoff: 'Local embeddings give me control over where that processing happens, but they require a local model to be available and maintained. Semantic search depends on that service; keyword and graph search provide other ways to retrieve knowledge.\n\nSaving a lesson doesn’t make it universally applicable. A retrieved record provides context that an agent still needs to assess for relevance, accuracy and changes since it was written.',
    source: 'https://github.com/bgibson1618/agent-memory',
    demo: [
      { title: 'Save a lesson worth keeping', description: 'A useful observation becomes a readable record that can outlive the current session.', label: 'Example knowledge entry', example: 'Title: Validate CSV headers before previewing rows\nLesson: Reject a file whose header is missing or contains only whitespace.\nRelated topics: imports, input validation', takeaway: 'Knowledge is retained in an inspectable format.' },
      { title: 'Ask with different words', description: 'A later task can look for the lesson without reproducing its title exactly.', label: 'Example query', example: 'What should I check before showing a spreadsheet import preview?', takeaway: 'Meaning and relationships can supplement exact keyword matches.' },
      { title: 'Bring the lesson into the next task', description: 'The retrieved entry gives the agent context it can apply and verify.', label: 'Illustrative retrieved context', example: 'Validate CSV headers before previewing rows\nCheck for a missing header and whitespace-only header cells before rendering the preview.', takeaway: 'The next task starts with relevant prior knowledge available.' },
    ],
  },
];
