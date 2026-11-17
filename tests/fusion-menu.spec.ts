import { test, expect } from './fixtures';
import { fusionMenu } from '../src/fusion-menu';

test('mild fusion collection loads six dishes, keeps collections independent and encodes its enquiry', async ({ page }, testInfo) => {
  await page.goto('/#fusion-menu');
  const collection = page.locator('#fusion-menu');
  const summary = collection.locator('summary');
  await expect(collection).not.toHaveAttribute('open');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(collection).toHaveAttribute('open', '');
  await expect(collection.locator('article')).toHaveCount(6);
  await expect(collection).toContainText('Designed for a mild palate');
  expect(new Set(fusionMenu.map(dish => dish.image)).size).toBe(6);
  await expect(collection.getByRole('heading', { name: 'Coconut Milk–Poached Roasted Prawns', exact: true })).toBeVisible();
  for (const dish of fusionMenu) {
    await expect(collection.getByRole('heading', { name: dish.name, exact: true })).toBeVisible();
    await expect(collection.getByText(dish.pairing, { exact: true })).toBeVisible();
  }
  await collection.evaluate(async element => {
    await Promise.all([...element.querySelectorAll('img')].map(image => { image.loading = 'eager'; return image.decode(); }));
  });
  const enquiry = new URL((await collection.getByRole('link', { name: 'Enquire about the fusion menu' }).getAttribute('href'))!);
  expect(enquiry.hostname).toBe('wa.me');
  expect(enquiry.pathname).toBe('/420722018176');
  expect(enquiry.searchParams.get('text')).toContain('a mild Kerala–European fusion menu with gentle seasoning');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(collection.locator('.menu-collection-content')).toHaveCSS('animation-name', 'none');
  await collection.screenshot({ path: `test-results/${testInfo.project.name}-fusion-menu.png`, scale: 'css', style: '.site-header, .skip-link, .floating-whatsapp { visibility: hidden !important; }' });
  await page.locator('#mini-burgers > summary').click();
  await expect(page.locator('#mini-burgers')).toHaveAttribute('open', '');
  await expect(collection).toHaveAttribute('open', '');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await summary.focus();
  await page.keyboard.press('Space');
  await expect(collection).not.toHaveAttribute('open');
  await expect(page.locator('#mini-burgers')).toHaveAttribute('open', '');
});
