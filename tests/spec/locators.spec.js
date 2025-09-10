import { test, expect } from '@playwright/test';

test('Locator strategy mastery', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click(); // ✅ fixed

  // Verify product appears
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByAltText('Sauce Labs Backpack')).toBeVisible();

  // Find a specific product container and interact with its button
  const product = page.locator('.inventory_item', {
    has: page.getByText('Sauce Labs Backpack'),
  });
  await product.getByRole('button', { name: 'Add to cart' }).click();

  // Verify cart badge updated
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
