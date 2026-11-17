import { test, expect } from './fixtures';

test('minimal cuisine badges move smoothly and have one accessible list', async ({ page }, testInfo) => {
  await page.goto('/');
  const ribbon = page.getByRole('region', { name: 'Five cuisines' });
  await ribbon.scrollIntoViewIfNeeded();
  await expect(ribbon.getByRole('list', { name: 'Cuisine selection' }).getByRole('listitem')).toHaveCount(5);
  const track = ribbon.locator('.cuisine-marquee-track');
  const before = await track.evaluate(el => getComputedStyle(el).transform);
  await expect.poll(() => track.evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
  await expect(ribbon.getByRole('button')).toHaveCount(0);
  expect((await ribbon.boundingBox())!.height).toBeLessThan(80);
  await ribbon.screenshot({ path: `test-results/${testInfo.project.name}-cuisine-badges.png`, scale: 'css' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('reduced motion presents all five cuisine badges without movement or overflow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const ribbon = page.getByRole('region', { name: 'Five cuisines' });
  await expect(ribbon.locator('.cuisine-marquee-track')).toHaveCSS('animation-name', 'none');
  await expect(ribbon.getByRole('button')).toHaveCount(0);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await ribbon.scrollIntoViewIfNeeded();
    for (const badge of await ribbon.locator('.cuisine-marquee-group').first().locator('.cuisine-badge').all()) {
      const box = await badge.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
