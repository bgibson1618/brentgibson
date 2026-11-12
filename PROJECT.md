# Personal portfolio MVP

Build a calm, approachable portfolio for AI/application engineering and agent
developer tools roles. The approved order is Agent Roster, Folio (Agent Memory), then a
smaller OpenEMR entry on the homepage. Home, two project pages, resume download and contact links
must work. Preserve concise education/background facts. Copy and demos can be
refined after this first functional version.

## Design and implementation

Use the accepted blue/neutral direction with restrained warm amber accents.
React and shadcn/ui are approved. This first dependency plan uses TypeScript,
Vite for a static multi-page build, Tailwind for the shadcn Button foundation,
Radix Slot, class-variance-authority, clsx and tailwind-merge. IBM Plex Sans is
self-hosted with Fontsource. Node's test runner plus tsx provides focused checks.
Pin direct versions and keep the npm lockfile. No backend, CMS, analytics,
tracking, paid API or runtime external font request.

Pre-render the three routes from the same React components at build time. Real
HTML pages must work on static hosting beneath `/brentgibson/`, including direct
project links. Do not rely on a host rewriting unknown routes to index.html.
Keep visitor content and navigation available before JavaScript. The two small
demo walkthroughs use hand-authored fictional examples, clearly labeled as such.
They do not claim live runs, timings, scores or product screenshots.

The original `website` branch/history is preserved. The new work is local on
`codex/portfolio-mvp`; no push or publication is authorized by this build request.
Prior legacy assets remain in Git history and need not be copied to build output.

## Acceptance evidence

- Home and two dedicated pages render at the root and the deployment base path.
- Navigation, project links, anchors, local resources and resume resolve.
- Resume PDF matches the latest user-edited DOCX; keep original unchanged.
- No placeholder links or inaccessible source link is presented as working.
- Demo controls advance/back/reset without network or model requests.
- Desktop and 320px layouts fit; keyboard focus is visible; palette text passes
  contrast checks; reduced-motion preferences respected (no entrance animation).
- Static render, route/link and demo-state tests plus one integrated build pass.
- Independent Claude review through selected contained Roster covers correctness,
  code clarity, efficiency and storage. Browser checks remain the integrator's job.

## Storage and recovery

`node_modules`, `.vite` and `dist` are reproducible project-owned outputs excluded
from Git. After stopping this project's dev/preview servers and builds, run
`npm run clean` to preview dist and .vite; `npm run clean -- --apply` removes
only those two directories after showing exact paths. No automatic pruning is enabled.
Keep source, public resume, notices, lockfile and compact verification records.
Private planning, QA and Roster records live in the existing personal research
directory and never enter the public repository. Rollback is the unchanged
website branch; local progress is committed in small cohesive changes.

## Sources

- Vite static multi-page build: https://vite.dev/guide/build.html
- shadcn manual setup: https://ui.shadcn.com/docs/installation/manual
- shadcn Button: https://ui.shadcn.com/docs/components/radix/button
- Public Memory description: https://github.com/bgibson1618/agent-memory
- Copy: Brent's approved profile/resume and portfolio workshops.
