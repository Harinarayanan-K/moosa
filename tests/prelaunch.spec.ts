import { test, expect } from './fixtures';
import { site } from '../src/config/site';

test.skip(site.launched, 'Prelaunch notices are disabled after launch.');

test('full portfolio remains available with clear prelaunch notices', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('complementary', { name: 'Launch announcement' })).toContainText('Coming soon to Prague');
  await expect(page.locator('#home')).toContainText('Not launched yet');
  await expect(page.locator('#menu')).toContainText('Full menus coming soon');
  await expect(page.locator('#home img[src*="hero-italian"]')).toHaveCount(0);
  for (const id of ['the-chef', 'menu', 'experiences', 'gallery', 'contact']) await expect(page.locator(`#${id}`)).toBeAttached();
  await page.getByRole('link', { name: 'Early enquiries', exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact')).toContainText('We haven’t launched yet');
  const whatsapp = new URL((await page.getByRole('link', { name: 'Chat on WhatsApp', exact: true }).getAttribute('href'))!);
  expect(whatsapp.searchParams.get('text')).toContain('this is an early enquiry');
  const email = new URL((await page.getByRole('link', { name: 'Send an Email', exact: true }).getAttribute('href'))!);
  expect(email.searchParams.get('body')).toContain('this is an early enquiry');
  const faq = page.getByText('Have private dining experiences launched yet?', { exact: true });
  await faq.click();
  await expect(page.locator('details[open]')).toContainText('coming soon to Prague');
});
