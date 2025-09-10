import { test, expect } from '@playwright/test';

test('Complete checkout flow and verify totals', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.click('#login-button'); // ✅ fixed

  // Add product to cart
  const product = page.locator('.inventory_item', { hasText: 'Sauce Labs Backpack' });
  await product.getByRole('button', { name: 'Add to cart' }).click();

  // Go to cart & checkout
  await page.click('.shopping_cart_link');
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Fill checkout info
  await page.getByPlaceholder('First Name').fill('Jane');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('Zip/Postal Code').fill('560001');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Verify totals
  const subtotal = parseFloat(
    (await page.locator('.summary_subtotal_label').textContent()).split('$')[1]
  );
  const tax = parseFloat(
    (await page.locator('.summary_tax_label').textContent()).split('$')[1]
  );
  const total = parseFloat(
    (await page.locator('.summary_total_label').textContent()).split('$')[1]
  );

  expect(total).toBeCloseTo(subtotal + tax, 2);

  // Finish checkout
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});
