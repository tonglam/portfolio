import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const publicRoutes = [
  '/',
  '/work/letletme',
  '/work/vehicle-operations',
  '/writing',
  '/writing/reliable-live-data-pipelines',
  '/writing/event-driven-cloud-billing',
  '/writing/role-secured-vehicle-workflows',
  '/writing/archive',
];

test('all public routes render without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('main')).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test('key pages have no horizontal overflow at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/work/letletme', '/work/vehicle-operations']) {
      await page.goto(route);
      const sizes = await page.evaluate(() => ({
        client: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(sizes.scroll, route).toBeLessThanOrEqual(sizes.client);
    }
  });
}

test('case studies expose structured decisions and navigable sections', async ({ page }) => {
  await page.goto('/work/letletme');
  const contents = page.getByRole('navigation', { name: 'Case study contents' });
  await expect(contents.getByRole('link')).toHaveCount(7);
  await expect(page.locator('dt', { hasText: 'Trade-off' })).toHaveCount(3);
  await expect(
    page.getByRole('heading', { name: 'Freshness, recovery and shared rules.' })
  ).toBeVisible();
});

test('theme selection persists across navigation', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /Theme:/ });
  await expect(toggle).toBeVisible();
  await toggle.click();
  const selected = await page.locator('html').getAttribute('data-theme');
  expect(['light', 'dark']).toContain(selected);
  await page.goto('/writing');
  await expect(page.locator('html')).toHaveAttribute('data-theme', selected!);
});

test('copy-email action provides feedback and writes the address', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#contact');
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.getByRole('button', { name: 'Email copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('qitonglan@gmail.com');
});

test('mobile menu exposes state and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation menu' });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('dialog', { name: 'Navigation menu' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('key pages have no serious or critical axe violations in either theme', async ({ page }) => {
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    for (const route of ['/', '/work/letletme', '/work/vehicle-operations', '/writing']) {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).analyze();
      const blocking = results.violations.filter(({ impact }) =>
        ['serious', 'critical'].includes(impact ?? '')
      );
      expect(blocking, `${colorScheme} ${route}`).toEqual([]);
    }
  }
});

test('resume files and discovery endpoints are available', async ({ request }) => {
  for (const path of [
    '/resume/qitong-lan-cv-backend-platform.pdf',
    '/resume/qitong-lan-cv-full-stack-product.pdf',
    '/sitemap.xml',
    '/robots.txt',
    '/rss.xml',
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
});

test('indexable routes expose complete discovery metadata', async ({ page }) => {
  for (const route of publicRoutes.filter(route => route !== '/writing/archive')) {
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('h1')).toHaveCount(1);
  }
});

test('writing uses a logical heading hierarchy and advertises RSS', async ({ page }) => {
  await page.goto('/writing');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('.article-card h2')).toHaveCount(3);
  await expect(page.locator('link[rel="alternate"][type="application/rss+xml"]')).toHaveAttribute(
    'href',
    'https://www.qitonglan.com/rss.xml'
  );
});

test('articles expose image and breadcrumb structured data', async ({ page }) => {
  await page.goto('/writing/reliable-live-data-pipelines');
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed = schemas.flatMap(value => {
    const data = JSON.parse(value);
    return Array.isArray(data) ? data : [data];
  });
  expect(parsed.find(item => item['@type'] === 'Article')?.image).toContain('/opengraph-image');
  expect(parsed.find(item => item['@type'] === 'BreadcrumbList')).toBeDefined();
});

test('unknown routes render the custom 404', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'This path is outside the system.' })
  ).toBeVisible();
});
