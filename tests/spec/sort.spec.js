import { test, expect } from '@playwright/test';

test('Sort products by price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.click('#login-button'); // ✅ fixed selector

  // Sort dropdown
  await page.getByRole('combobox').selectOption({ label: 'Price (low to high)' });

  // Get all prices
  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numbers = prices.map(p => parseFloat(p.replace('$', '')));
  const sorted = [...numbers].sort((a, b) => a - b);

  // Assertion
  expect(numbers).toEqual(sorted);
});
