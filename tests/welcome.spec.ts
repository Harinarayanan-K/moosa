import { test, expect } from '@playwright/test';
import { welcomeStorageKey } from '../src/config/site';

test('arrival scene reveals the website once per session and can be replayed', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /A little closer/ })).toBeVisible();
  await expect(page.locator('.welcome-vehicle')).toBeVisible();
  await page.evaluate(() => {
    const intro = document.querySelector('.welcome-intro')!;
    const observer = new MutationObserver(() => {
      const opacity = Number(getComputedStyle(intro).opacity);
      if (opacity > 0 && opacity < .95) {
        document.documentElement.dataset.introFaded = 'true';
        observer.disconnect();
      }
    });
    observer.observe(intro, { attributes: true, attributeFilter: ['style'] });
  });
  await page.waitForTimeout(850);
  const scene = await page.locator('.welcome-scene').boundingBox();
  for (const wheel of await page.locator('.welcome-wheel').all()) {
    const box = await wheel.boundingBox();
    expect(box!.y + box!.height).toBeLessThan(scene!.y + scene!.height);
    expect(box!.x).toBeGreaterThan(scene!.x);
    expect(box!.x + box!.width).toBeLessThan(scene!.x + scene!.width);
  }
  await page.screenshot({ path: `test-results/${testInfo.project.name}-welcome.png`, scale: 'css' });
  await expect(page.locator('.welcome-intro')).toHaveCount(0, { timeout: 7000 });
  await expect(page.locator('html')).toHaveAttribute('data-intro-faded', 'true');
  await expect(page.locator('#hero-title')).toBeVisible();
  expect(await page.evaluate(key => sessionStorage.getItem(key), welcomeStorageKey)).toBe('1');
  await page.reload();
  await expect(page.locator('#hero-title')).toBeVisible();
  await expect(page.locator('.welcome-intro')).toHaveCount(0);
  await page.getByRole('button', { name: 'Replay welcome', exact: true }).click();
  await expect(page.locator('.welcome-intro')).toBeVisible();
  await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
  await expect(page.locator('#hero-title')).toBeVisible();
});

test('keyboard skip and Escape immediately open the full portfolio', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Skip intro', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#hero-title')).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await page.getByRole('button', { name: 'Replay welcome', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(page.locator('.welcome-intro')).toHaveCount(0);
  await expect(page.locator('#menu')).toBeAttached();
});

test('reduced motion and direct section links bypass the intro', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('#hero-title')).toBeVisible();
  await expect(page.locator('.welcome-intro')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#menu');
  await expect(page.locator('#menu')).toBeAttached();
  await expect(page.locator('.welcome-intro')).toHaveCount(0);
});

test('the website still opens when session storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'sessionStorage', { get: () => { throw new DOMException('Storage unavailable', 'SecurityError'); } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
  await expect(page.locator('#hero-title')).toBeVisible();
});
