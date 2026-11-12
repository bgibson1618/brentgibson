// Edit the website's copy here. Examples below are fictional, not recorded runs.
export const profile = {
  name: 'Brent Gibson',
  location: 'Austin, Texas',
  title: 'AI & software engineer',
  email: 'bgibson1618@gmail.com',
  github: 'https://github.com/bgibson1618',
  linkedin: 'https://www.linkedin.com/in/brent-gibson-76386265/',
  headline: 'I build AI applications and tools that help agents work together.',
  introduction: 'Some of my most useful projects started with problems in my own development workflow. I built Task Force to coordinate agents from different AI vendors, and Folio to carry useful knowledge between sessions and projects. I use both every day.',
  about: 'I like understanding how a system works, finding the source of friction, and building tools that make the next project easier. My background spans embedded software, AI evaluation and the Gauntlet AI fellowship, where Folio was my capstone.',
  contactHeading: "Let's talk about what you're building.",
  contact: "I'm interested in AI engineering and software engineering roles focused on LLM applications, evaluation and agent developer tools, in Austin or remotely.",
  education: [
    { institution: 'Gauntlet AI fellowship', detail: 'Intensive ten-week program · April–July 2026' },
    { institution: 'California State University, Northridge', detail: 'B.S. Computer Science · 2022' },
    { institution: 'Santa Monica College', detail: 'Certificate of Achievement in Computer Science' },
  ],
  openemr: 'An independently deployable RAG sidecar for OpenEMR. I developed document ingestion, chunking, embeddings, retrieval, the API and evaluations, while keeping the core application independent of the module.',
};

export type DemoStep = { title: string; description: string; label: string; example: string; takeaway: string };
export type Project = {
  id: 'roster' | 'memory'; name: string; descriptor: string; summary: string;
  problem: string; contribution: string; architecture: { title: string; text: string }[];
  tradeoff: string; next: string; source?: string; demo: DemoStep[];
};
export const projects: Project[] = [
  {
    id: 'roster', name: 'Task Force', descriptor: 'Coordination across AI vendors',
    summary: 'Task Force gives Claude, Codex and Antigravity agents a common way to delegate tasks, exchange messages and review one another’s work. A shared monitoring console provides observability into each agent’s progress and results.',
    problem: 'I wanted an orchestrating agent to delegate to another vendor’s agent and bring the result back into the same workflow. I also wanted to see what was running and inspect what happened afterward. A collection of separate terminal sessions made that coordination difficult.',
    contribution: 'I designed and built a reusable delegation layer around the vendor CLIs, along with agent-to-agent messaging, a live monitoring console, and persistent run logs and status. The model providers supply the agents; Task Force supplies the shared coordination and observation layer.',
    architecture: [
      { title: 'A common entry point', text: 'An orchestrator assigns a focused task and selects a role and backend. Adapters translate that launch into the appropriate vendor CLI behavior.' },
      { title: 'Messages and durable records', text: 'Agents can exchange messages, while run records preserve the task, output and status for later inspection.' },
      { title: 'A view of work in progress', text: 'The monitoring console brings runs into one place so I can follow progress without moving between every terminal.' },
    ],
    tradeoff: 'A common interface is useful, but the vendor CLIs still differ in permissions, session behavior and available tools. The adapters need to preserve those distinctions. Cross-vendor review adds another perspective; deterministic checks are still needed to verify the result.',
    next: 'The next portfolio update will replace this sample walkthrough with a recording from a public-safe task and a closer look at the monitoring console.',
    demo: [
      { title: 'Give the work a clear brief', description: 'An orchestrator scopes a small implementation and the evidence a reviewer will need.', label: 'Example brief', example: 'Build a CSV preview that shows the parsed columns and rejects a file with no header. Include checks for an empty file and quoted commas.', takeaway: 'The task and acceptance examples travel together.' },
      { title: 'Delegate and keep the result visible', description: 'A builder uses one backend while the orchestrator can follow the run and retrieve its output.', label: 'Example handoff', example: 'Builder: preview component and parsing checks ready. Review the empty-file and quoted-comma cases before accepting the change.', takeaway: 'The result belongs to an inspectable run, not just a terminal scrollback.' },
      { title: 'Review from another perspective', description: 'A reviewer on a different backend examines the result and the supporting checks.', label: 'Example review finding', example: 'The empty-file case is covered. A file containing only blank lines needs an explicit check before this change is accepted.', takeaway: 'A review can identify a missing case; tests establish whether the behavior is correct.' },
    ],
  },
  {
    id: 'memory', name: 'Folio', descriptor: 'Knowledge that carries between sessions',
    summary: 'Persistent, shared knowledge for agents working across projects. I combined versioned Markdown with keyword, semantic and graph search so useful context can be found and reused.',
    problem: 'An agent can learn something useful during one task and begin the next session without it. I wanted a knowledge base that different agents and projects could consult, with records I could also inspect and edit.',
    contribution: 'I built the knowledge storage and retrieval system around versioned Markdown, using SQLite full-text search, local embeddings and a derived relationship graph. These search paths contribute to a combined result rather than requiring a separate knowledge store for each one.',
    architecture: [
      { title: 'Readable records first', text: 'Versioned Markdown in the Open Knowledge Format is the source of truth. Search indexes are derived from it rather than becoming the only copy of the knowledge.' },
      { title: 'More than exact words', text: 'Keyword search finds explicit terms. Semantic search helps with differently worded questions. Graph traversal follows relationships between entries.' },
      { title: 'One retrieval result', text: 'The retrieval paths are combined using reciprocal rank fusion, so an agent can receive useful context without choosing a search engine first.' },
    ],
    tradeoff: 'Local embeddings give me control over that part of the data processing, but they add an operating dependency. When the embedding service is unavailable, lexical and graph retrieval remain useful, with the reduced search capability made explicit.',
    next: 'The next portfolio update will add a recorded save-and-search session with a small public example knowledge base and more detail on retrieval evaluation.',
    source: 'https://github.com/bgibson1618/agent-memory',
    demo: [
      { title: 'Save a lesson worth keeping', description: 'A useful observation becomes a readable record that can outlive the current session.', label: 'Example knowledge entry', example: 'Title: Validate CSV headers before previewing rows\nLesson: Reject a file whose header is missing or contains only whitespace.\nRelated topics: imports, input validation', takeaway: 'Knowledge is retained in an inspectable format.' },
      { title: 'Ask with different words', description: 'A later task can look for the lesson without reproducing its title exactly.', label: 'Example query', example: 'What should I check before showing a spreadsheet import preview?', takeaway: 'Meaning and relationships can supplement exact keyword matches.' },
      { title: 'Bring the lesson into the next task', description: 'The retrieved entry gives the agent context it can apply and verify.', label: 'Illustrative retrieved context', example: 'Validate CSV headers before previewing rows\nCheck for a missing header and whitespace-only header cells before rendering the preview.', takeaway: 'The next task starts with relevant prior knowledge available.' },
    ],
  },
];
