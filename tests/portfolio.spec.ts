import { test, expect } from './fixtures';
import { createEmailLink, createWhatsAppLink, enquiryMessage } from '../src/config/contact';
import { cuisines, dishes, signatures } from '../src/menu';
import { statSync } from 'node:fs';
import { resolve } from 'node:path';

test('every cuisine has exactly five distinct, photographed preview dishes', () => {
  expect(new Set(dishes.map(dish => dish.name)).size).toBe(dishes.length);
  for (const signature of signatures) expect(dishes.map(dish => dish.name)).not.toContain(signature.name);
  expect(new Set(dishes.slice(0, 6).map(dish => dish.cuisine)).size).toBe(5);
  for (const cuisine of cuisines.filter(cuisine => cuisine !== 'All')) {
    const choices = dishes.filter(dish => dish.cuisine === cuisine);
    expect(choices.length).toBe(5);
    for (const dish of choices) {
      expect(dish.description.length).toBeGreaterThan(20);
      expect(dish.course.length).toBeGreaterThan(0);
      expect(dish.image).toBeTruthy();
      expect(dish.alt).toBeTruthy();
      expect(dish.image).toMatch(/^menu-premium-/);
      expect(dish.alt).toContain('AI-illustrated');
      for (const suffix of ['.webp', '-small.webp']) expect(statSync(resolve('public/images', `${dish.image}${suffix}`)).size).toBeGreaterThan(1000);
    }
  }
});

test('contact destinations validate and encode all visitor text', () => {
  // Synthetic test data only; these values never appear in the site config.
  const message = 'Hello Moosa!\nI am interested in the Middle Eastern menu & a birthday.';
  const whatsapp = createWhatsAppLink('12345678901', message)!;
  expect(new URL(whatsapp).hostname).toBe('wa.me');
  expect(new URL(whatsapp).searchParams.get('text')).toBe(message);
  expect(createWhatsAppLink('', message)).toBeNull();
  expect(createWhatsAppLink('+420 123 456 789', message)).toBeNull();
  const email = createEmailLink('chef@example.com', 'Private dining & menus', message)!;
  expect(email).toContain('subject=Private%20dining%20%26%20menus');
  expect(email).toContain(`body=${encodeURIComponent(message)}`);
  expect(createEmailLink('', 'Enquiry')).toBeNull();
  const menuMessage = enquiryMessage('the Italian menu');
  const menuLink = createWhatsAppLink('12345678901', menuMessage)!;
  expect(new URL(menuLink).searchParams.get('text')).toContain('the Italian menu');
  for (const label of ['Occasion:', 'Preferred date:', 'Guest count:', 'Location:', 'Dietary requirements:']) expect(menuMessage).toContain(label);
});

test('all cuisine filters work and preserve the correct results', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore the Menu' }).click();
  await expect(page).toHaveURL(/#menu$/);
  await expect(page.locator('.menu-card')).toHaveCount(6);
  await page.locator('.menu-grid').evaluate(async grid => {
    await Promise.all([...grid.querySelectorAll('img')].map(image => { image.loading = 'eager'; return image.decode(); }));
  });
  await expect(page.locator('.menu-card').first()).toHaveCSS('opacity', '1');
  await page.locator('.menu-grid').screenshot({ path: `test-results/${testInfo.project.name}-premium-menu.png`, scale: 'css' });
  const expand = page.getByRole('button', { name: 'See menu preview' });
  await expect(expand).toHaveAttribute('aria-expanded', 'false');
  await expand.click();
  await expect(page.locator('.menu-card')).toHaveCount(25);
  await expect(page.locator('.menu-card .menu-image img')).toHaveCount(25);
  await page.getByRole('button', { name: 'Show less' }).click();
  await expect(page.locator('.menu-card')).toHaveCount(6);
  for (const [cuisine, count, dish] of [
    ['Kerala', 5, 'Malabar Prawn Curry'], ['Indian', 5, 'Chicken Biryani'],
    ['Italian', 5, 'Risotto ai Funghi'], ['European', 5, 'Herb-Roasted Sea Bass'],
    ['Middle Eastern', 5, 'Lamb Mandi'],
  ] as const) {
    await page.getByRole('button', { name: new RegExp(`^${cuisine}`) }).click();
    await expect(page.locator('.menu-card')).toHaveCount(count);
    await expect(page.locator('.menu-card .menu-image img')).toHaveCount(count);
    await page.locator('.menu-grid').evaluate(async grid => {
      await Promise.all([...grid.querySelectorAll('img')].map(image => { image.loading = 'eager'; return image.decode(); }));
    });
    await expect(page.locator('.menu-card h3').first()).toHaveText(dish);
    await expect(page.getByRole('button', { name: new RegExp(`^${cuisine}`) })).toHaveAttribute('aria-pressed', 'true');
  }
  await page.getByRole('button', { name: /^All/ }).click();
  await expect(page.locator('.menu-card')).toHaveCount(6);
  const enquiry = page.getByRole('link', { name: 'Enquire about this menu' });
  await expect(enquiry).toHaveAttribute('href', /^https:\/\/wa.me\/420722018176\?text=/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('lightbox wraps, supports buttons and keyboard, and returns focus', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#home .hero-backdrop img')).toHaveCount(5);
  await expect(page.locator('img[src$="/chef.webp"]')).toHaveCount(1);
  const trigger = page.getByRole('button', { name: 'Open image 1: The art of the plate' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('01 / 06');
  await page.getByRole('button', { name: 'Previous image' }).click();
  await expect(dialog).toContainText('06 / 06');
  await page.getByRole('button', { name: 'Next image' }).click();
  await expect(dialog).toContainText('01 / 06');
  await page.keyboard.press('ArrowRight');
  await expect(dialog).toContainText('02 / 06');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog).toContainText('01 / 06');
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    await expect(page.locator('[role="dialog"] :focus')).toHaveCount(1);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('WhatsApp and email links use the supplied contact details', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('a[href*="wa.me"]');
  expect(await links.count()).toBeGreaterThan(5);
  for (const link of await links.all()) {
    const url = new URL((await link.getAttribute('href'))!);
    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/420722018176');
    expect(url.searchParams.get('text')).toContain('Hello Chef Moosa');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
  await expect(page.getByRole('link', { name: 'Chat on WhatsApp', exact: true })).toHaveAttribute('href', /^https:\/\/wa.me\/420722018176\?text=/);
  const email = page.getByRole('link', { name: 'Send an Email', exact: true });
  const emailUrl = new URL((await email.getAttribute('href'))!);
  expect(emailUrl.protocol).toBe('mailto:');
  expect(emailUrl.pathname).toBe('libinsadk@gmail.com');
  expect(emailUrl.searchParams.get('subject')).toBe('Private dining enquiry — Chef Moosa');
  expect(emailUrl.searchParams.get('body')).toContain('Hello Chef Moosa');
  expect(emailUrl.searchParams.get('body')).toContain('Dietary requirements:');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('navigation works, all local assets load, and layout fits', async ({ page }, testInfo) => {
  const errors: string[] = [];
  const failures: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
  await page.goto('/');
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /The Chef/ }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  } else {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'The Chef' }).click();
  }
  await expect(page).toHaveURL(/#the-chef$/);
  // Walk the page so lazy assets are exercised in the static production build.
  for (const id of ['the-chef', 'menu', 'experiences', 'gallery', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
  }
  await page.evaluate(async () => {
    for (const img of document.images) img.loading = 'eager';
    await Promise.all([...document.images].filter(img => img.getBoundingClientRect().width > 0).map(img => img.decode()));
    await document.fonts.ready;
  });
  expect(errors).toEqual([]);
  expect(failures).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  // Trigger each reveal before capturing the complete page.
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(45);
  }
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `test-results/${testInfo.project.name}-home.png`, fullPage: true, scale: 'css' });
});

test('reduced motion keeps all content visible and interactions functional', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const item of await page.locator('.hero-reveal').all()) await expect(item).toHaveCSS('opacity', '1');
  for (const image of await page.locator('#home .hero-backdrop img').all()) await expect(image).toHaveCSS('transform', 'none');
  await page.getByRole('button', { name: /^Kerala/ }).click();
  await expect(page.locator('.menu-card')).toHaveCount(5);
});

test('signature photographs crossfade on desktop and stack on mobile', async ({ page }, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name === 'desktop') {
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
    for (const index of [1, 2, 0]) {
      await page.locator('.signature-story').nth(index).evaluate(el => el.scrollIntoView({ block: 'center' }));
      await expect(page.locator(`[data-signature="${index}"]`)).toHaveCSS('opacity', '1');
    }
  } else {
    await expect(page.locator('.signature-stage')).toBeHidden();
    for (const image of await page.locator('.signature-mobile-photo').all()) await expect(image).toBeVisible();
  }
});

test('narrow phone and tablet layouts have no overflow', async ({ page }) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
});

test('motion preferences can change while browsing', async ({ page }) => {
  await page.goto('/');
  await page.locator('#the-chef').scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const word of await page.locator('.motion-word').all()) {
    await expect(word).toHaveCSS('transform', 'none');
    await expect(word).toHaveCSS('opacity', '1');
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: /^Italian/ }).click();
  await expect(page.locator('.menu-card')).toHaveCount(5);
  await expect(page.locator('.menu-card h3').first()).toHaveText('Risotto ai Funghi');
  const menuUrl = new URL((await page.getByRole('link', { name: 'Enquire about this menu' }).getAttribute('href'))!);
  expect(menuUrl.pathname).toBe('/420722018176');
  expect(menuUrl.searchParams.get('text')).toContain('Italian');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('planning guidance and FAQs work with keyboard navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'How it comes together' }).click();
  await expect(page).toHaveURL(/#planning$/);
  await expect(page.locator('.planning-steps > li')).toHaveCount(3);
  await expect(page.getByRole('link', { name: 'Discuss your evening' })).toHaveAttribute('href', /^https:\/\/wa.me\/420722018176\?text=/);
  const question = page.locator('.dining-question').filter({ hasText: 'Can I request a menu that is not shown?' });
  await question.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(question).toHaveAttribute('open', '');
  await expect(question.locator('.question-answer')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(question).not.toHaveAttribute('open');
  await page.keyboard.press('Tab');
  const dietaryQuestion = page.locator('.dining-question').filter({ hasText: 'What about allergies and dietary requirements?' });
  await expect(dietaryQuestion.locator('summary')).toBeFocused();
  await page.keyboard.press('Space');
  await expect(dietaryQuestion.locator('.question-answer')).toBeVisible();
  await expect(dietaryQuestion).toContainText('Confirm menu suitability');
  await expect(page.locator('form')).toHaveCount(0);
});
