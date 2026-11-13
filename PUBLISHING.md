# Publishing the portfolio

The production address is https://bgibson1618.github.io/brentgibson/.
The website was last checked serving the original `website` branch from its root.
Keep that branch intact as the initial rollback. This document is a release plan,
not permission to push, merge, change Pages settings or deploy.

## First release

1. Obtain Brent's scoped approval for the release, including pushing the candidate,
   merging it into `main`, changing Pages from branch publishing to GitHub Actions,
   and running the manual deployment. Preserve the approved commit identity.
2. Refresh remote state and review the proposed diff into `main`; stop on unexpected
   intervening edits. Confirm the saved `website` branch still holds the old site.
3. Push/open the approved PR and let **Verify and publish portfolio** run. It installs
   the lockfile with Node 24 and runs `npm run verify` once. PRs and pushes only verify;
   they never deploy. Merge only after the checks and review pass.
4. In repository Settings → Pages, select **GitHub Actions** as the build source.
   Preserve the existing URL and HTTPS configuration. Restrict the `github-pages`
   environment to `main` if it is not already restricted appropriately.
5. In Actions, run **Verify and publish portfolio** on `main` with **publish** enabled.
   The workflow builds and checks that revision, uploads only `dist`, then deploys
   that artifact. A manual run without publish just verifies; other branches cannot
   deploy. The remote Actions runner and deployment remain unverified until this run.
6. Check the public homepage, `/projects/ensemble/`, `/projects/folio/`, both legacy
   redirects, stylesheet/font loading, demo controls and resume download. Test direct
   project-page reloads. Confirm the deployed resume's hash against the approved PDF.
   Check LinkedIn's sharing preview after publication; social platforms may cache it.

## Later releases

Use the same approved PR, verification and manual publish process. Record the last
known-good source revision. Changes to `main` alone do not update the live site.
Never publish the repository root: it contains source and development files.

## Rollback

For the first launch, return Settings → Pages to **Deploy from a branch**, select
the preserved `website` branch and `/ (root)`, and confirm the legacy site's build
and public URL. Restore the `github-pages` environment's allowed deployment branch
to `website` as well; a `main`-only rule would block the old branch. Check the branch
identity before switching. For later releases,
revert the faulty change through an approved PR and manually publish the restored
`main`. Do not force-push history or delete the previous site.

## Routes and preview

The production build includes small redirect pages for `/projects/agent-roster/`
and `/projects/agent-memory/`. JavaScript preserves query strings and fragments;
a meta refresh and visible link also work without JavaScript. These are static
HTML redirects, not server-side HTTP 301 responses. `npm run preview` exercises
the built redirects; the development server serves only the current page sources.

The supported base is `/brentgibson/`; a future domain-root move must set
`SITE_BASE=/` and update public canonical/sharing URLs as part of its own release.

The two project pages include Open Graph and large-image card metadata in their
initial HTML. Their approved PNG covers live in `public/social/`; preserve the
versioned filenames when replacing a cover so an updated image can have a new URL.
`npm run verify` checks public URLs, image presence, dimensions and alt text in the
built output. After publication, check the public HTML and image responses; a
successful deployment does not establish that a social platform has refreshed its
cached preview. Image metadata follows the [Open Graph protocol](https://ogp.me/).

References: [Vite static deployment](https://vite.dev/guide/static-deploy.html#github-pages)
and [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
