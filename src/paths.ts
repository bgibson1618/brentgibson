export function siteBase(input = '/brentgibson/'): string {
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(input)) {
    throw new Error('SITE_BASE must be / or a slash-delimited local path such as /brentgibson/.');
  }
  return input;
}

export type Page = 'home' | 'roster' | 'memory';
export const pagePaths: Record<Page, string> = {
  home: '', roster: 'projects/agent-roster/', memory: 'projects/agent-memory/',
};
export const pageUrl = (base: string, page: Page) => `${base}${pagePaths[page]}`;

export function demoIndex(current: number, action: 'next' | 'previous' | 'reset', count: number) {
  if (count < 1) throw new Error('A walkthrough needs at least one step.');
  if (action === 'reset') return 0;
  return Math.max(0, Math.min(count - 1, current + (action === 'next' ? 1 : -1)));
}
