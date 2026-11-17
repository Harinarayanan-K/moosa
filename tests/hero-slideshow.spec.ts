import { test, expect } from './fixtures';
import { heroSlides, heroSlideDuration } from '../src/hero-slides';

test('mobile hero trims upper empty space while desktop photography fills the frame', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const image = page.locator('.hero-slide.is-active img');
    await expect(image).toHaveCSS('object-fit', 'cover');
    await expect(image).toHaveCSS('transform', 'none');
    await image.evaluate((img: HTMLImageElement) => img.decode());
    const frame = await page.locator('.hero-backdrop').boundingBox();
    const imageBox = await image.boundingBox();
    expect(imageBox!.x).toBeCloseTo(frame!.x, 0);
    expect(imageBox!.width).toBeCloseTo(frame!.width, 0);
    const ratio = await image.evaluate((img: HTMLImageElement) => img.naturalWidth / img.naturalHeight);
    if (width <= 600) {
      expect(ratio).toBeCloseTo(9 / 16, 1);
      expect(await image.evaluate((img: HTMLImageElement) => img.currentSrc)).toContain('-mobile');
      const scene = await page.locator('.hero-backdrop').boundingBox();
      const hero = await page.locator('#home').boundingBox();
      const headline = await page.locator('#hero-title').boundingBox();
      expect(scene!.height).toBeCloseTo(hero!.height, 0);
      expect(imageBox!.y).toBeLessThan(scene!.y - 100);
      expect(imageBox!.y + imageBox!.height).toBeCloseTo(scene!.y + scene!.height, 0);
      expect(scene!.height).toBeGreaterThanOrEqual(600);
      expect(headline!.y + headline!.height).toBeLessThan(scene!.y + scene!.height / 2);
    } else {
      expect(ratio).toBeGreaterThan(1.7);
      expect(imageBox!.height).toBeCloseTo(frame!.height, 0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('hero automatically advances and can be paused and resumed', async ({ page }) => {
  await page.goto('/');
  await page.locator('#hero-title').hover();
  const caption = page.locator('.hero-slide-caption');
  await expect(caption).toContainText(heroSlides[0].dish);
  await expect(caption).toContainText(heroSlides[1].dish, { timeout: 10000 });
  await page.getByRole('button', { name: 'Pause slideshow', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Play slideshow', exact: true })).toBeVisible();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(heroSlideDuration + 300);
  await expect(caption).toContainText(heroSlides[1].dish);
  await page.getByRole('button', { name: 'Play slideshow', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause slideshow', exact: true })).toBeVisible();
});

test('all hero dishes load and manual controls wrap and support keyboard use', async ({ page }, testInfo) => {
  await page.goto('/');
  const controls = page.getByRole('group', { name: 'Featured dishes slideshow' });
  for (const slide of heroSlides) {
    const button = controls.getByRole('button', { name: `Show ${slide.region}: ${slide.dish}`, exact: true });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: 'Pause slideshow', exact: true })).toBeVisible();
    await expect(page.locator('.hero-slide-caption')).toContainText(slide.dish);
    await page.locator(`.hero-slide img[src$="/${slide.image}.webp"]`).evaluate((img: HTMLImageElement) => img.decode());
    if (slide.dish === 'Croquette') {
      await expect(page.locator('.hero-slide.is-active')).toHaveCSS('opacity', '1');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: `test-results/${testInfo.project.name}-croquette-hero.png`, fullPage: true, scale: 'css' });
    }
  }
  await controls.getByRole('button', { name: 'Next dish', exact: true }).click();
  await expect(page.locator('.hero-slide-caption')).toContainText(heroSlides[0].dish);
  await controls.getByRole('button', { name: 'Previous dish', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.hero-slide-caption')).toContainText(heroSlides[heroSlides.length - 1].dish);
  await expect(page.locator('.hero-slide.is-active')).toHaveCSS('opacity', '1');
  await expect(page.getByRole('button', { name: 'Play slideshow', exact: true })).toBeVisible();
});

test('reduced motion disables automatic changes and preserves manual selection', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await page.goto('/');
  await page.clock.runFor(15000);
  await expect(page.locator('.hero-slide-caption')).toContainText(heroSlides[0].dish);
  await expect(page.getByRole('button', { name: /^(Play|Pause) slideshow$/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Next dish', exact: true }).click();
  await expect(page.locator('.hero-slide-caption')).toContainText(heroSlides[1].dish);
  await expect(page.locator('.hero-slide.is-active')).toHaveCSS('opacity', '1');
  await expect(page.locator('.hero-slide.is-active')).toHaveCSS('transform', 'none');
});
