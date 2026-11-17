import { test, expect } from './fixtures';
import { miniBurgers } from '../src/mini-burgers';

test('mini burger collection opens with keyboard, loads distinct images and preserves the compact menu', async ({ page }, testInfo) => {
  await page.goto('/#menu');
  const collection = page.locator('#mini-burgers');
  const summary = collection.locator('summary');
  await expect(collection).not.toHaveAttribute('open');
  await expect(page.locator('.menu-card')).toHaveCount(6);
  await expect(collection.locator('.mini-burger-content')).toBeHidden();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(collection).toHaveAttribute('open', '');
  await expect(collection.locator('article')).toHaveCount(9);
  expect(new Set(miniBurgers.map(burger => burger.image)).size).toBe(9);
  expect(miniBurgers.filter(burger => burger.group === 'Czech menu inspiration').map(burger => burger.name)).toEqual([
    'Smash Cheeseburger Mini', 'Smoky Bacon BBQ Mini Burger', 'Truffle Beef Mini Burger', 'Smažák Mini Burger',
  ]);
  for (const burger of miniBurgers) await expect(collection.getByRole('heading', { name: burger.name, exact: true })).toBeVisible();
  await collection.evaluate(async element => {
    await Promise.all([...element.querySelectorAll('img')].map(image => { image.loading = 'eager'; return image.decode(); }));
  });
  const enquiry = new URL((await collection.getByRole('link', { name: 'Enquire about mini burgers' }).getAttribute('href'))!);
  expect(enquiry.hostname).toBe('wa.me');
  expect(enquiry.pathname).toBe('/420722018176');
  expect(enquiry.searchParams.get('text')).toContain('the mini burger collection');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(collection.locator('.mini-burger-content')).toHaveCSS('animation-name', 'none');
  await collection.screenshot({ path: `test-results/${testInfo.project.name}-mini-burgers.png`, scale: 'css' });
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await summary.focus();
  await page.keyboard.press('Space');
  await expect(collection).not.toHaveAttribute('open');
  await expect(collection.locator('.mini-burger-content')).toBeHidden();
});
