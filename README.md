# Brent Gibson portfolio

A static React portfolio with a homepage, Agent Roster and Agent Memory case
studies, and small illustrative walkthroughs. Built with Vite, TypeScript and a
shadcn/ui Button foundation. No backend, account, analytics or model calls.

## Work locally

Use Node 24 or newer:

```sh
npm ci --ignore-scripts
npm run dev
```

Open the printed URL at `/brentgibson/`. `npm run verify` runs the focused tests,
type check, static build, pre-render and local-link checks. `npm run preview`
serves the production result on loopback.

## Edit content

- Copy and walkthrough examples: `src/content.ts`.
- Colors, type and layouts: `src/styles.css`.
- Homepage and project-page structure: `src/App.tsx`.
- Downloadable resume: `public/brent-gibson-resume.pdf`.

The walkthroughs are explicitly illustrative. Replace them with verified public
examples or recordings when the projects are updated. Roster currently has no
publicly verified source link; do not add a broken/private repository URL.

## Static hosting

The build writes real HTML files for `/`, `/projects/agent-roster/` and
`/projects/agent-memory/` relative to the selected base. Each is pre-rendered from
the same React components, then hydrated for the walkthrough controls. Links and
project content work without JavaScript. Fonts are served from the site itself.

The default base is `/brentgibson/`, matching the existing GitHub Pages path.
Use `SITE_BASE=/ npm run verify` to build at a domain root instead. Never publish
the source directory as the built site: publish only `dist`. Deployment is a
separate approved step; there is no automatic deployment workflow in this branch.

## Cleanup

Stop this project's dev/preview servers and builds before cleanup.
`npm run clean` previews the generated `dist` and `.vite` directories.
`npm run clean -- --apply` removes only those outputs. `node_modules` is also
regenerable from the lockfile but is not removed by that command. Never put unique
content in generated directories. Preserve source, public assets and verification
records. See `PROJECT.md` for scope and acceptance.
