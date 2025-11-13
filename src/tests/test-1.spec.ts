import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.tradingview.com/');
  await page.getByRole('button', { name: 'Open user menu' }).click();
  await page.getByRole('menuitem', { name: 'Sign in' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('iframe[title="Schaltfläche „Über Google anmelden“"]').contentFrame().getByRole('button', { name: 'Continue with Google. Opens' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Email or phone' }).click();
});