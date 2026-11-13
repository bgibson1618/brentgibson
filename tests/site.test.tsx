import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { projects } from '../src/content';
import { siteBase, pageUrl, demoIndex, type Page } from '../src/paths';

test('static routes and assets stay beneath the selected deployment base', () => {
  for (const base of ['/', '/brentgibson/']) {
    for (const page of ['home', 'roster', 'memory'] as Page[]) {
      const html = renderToString(<App page={page} base={base} />);
      assert.match(html, /<h1>/);
      assert.ok(html.includes(`href="${base}brent-gibson-resume.pdf"`));
      assert.ok(html.includes(`href="${base}#contact"`));
      assert.equal((html.match(/<main/g) ?? []).length, 1);
      if (page !== 'home') {
        assert.ok(html.includes(`href="${pageUrl(base, page === 'roster' ? 'memory' : 'roster')}"`));
        assert.match(html, /hand-authored sample steps/);
        assert.match(html.replace(/<!--.*?-->/g, ''), /Step 1 of 3/);
      }
    }
  }
});
test('home preserves the approved project order', () => {
  const html = renderToString(<App page="home" base="/" />);
  assert.ok(html.includes('<h3>Ensemble'));
  assert.ok(html.indexOf('<h3>Ensemble') < html.indexOf('<h3>Folio'));
  assert.ok(html.indexOf('<h3>Folio') < html.indexOf('Retrieval for OpenEMR'));
});
test('project links use the public names beneath either hosting base', () => {
  for (const base of ['/', '/brentgibson/']) {
    const html = renderToString(<App page="home" base={base} />);
    assert.ok(html.includes(`href="${base}projects/ensemble/"`));
    assert.ok(html.includes(`href="${base}projects/folio/"`));
    assert.ok(!html.includes(`href="${base}projects/agent-roster/"`));
    assert.ok(!html.includes(`href="${base}projects/agent-memory/"`));
  }
});
test('walkthrough controls stop at boundaries and reset predictably', () => {
  for (const project of projects) {
    const count = project.demo.length;
    let current = 0;
    assert.equal(demoIndex(current, 'previous', count), 0);
    for (let step = 1; step < count; step++) {
      current = demoIndex(current, 'next', count);
      assert.equal(current, step);
      assert.ok(project.demo[current].example.length > 0);
    }
    assert.equal(demoIndex(current, 'next', count), count - 1);
    assert.equal(demoIndex(current, 'previous', count), count - 2);
    assert.equal(demoIndex(current, 'reset', count), 0);
  }
});
test('unsafe or ambiguous deployment bases are rejected before building', () => {
  for (const input of ['https://example.com/', '//example.com/', '/../', '/a/../', 'portfolio', '/portfolio']) {
    assert.throws(() => siteBase(input));
  }
  assert.equal(siteBase('/'), '/');
  assert.equal(siteBase('/brentgibson/'), '/brentgibson/');
});
