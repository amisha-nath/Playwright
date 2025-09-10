import { test, expect } from '@playwright/test';

test('Successful login redirects to inventory', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products')).toBeVisible();

  const itemCount = await page.locator('.inventory_item').count();
  expect(itemCount).toBeGreaterThan(1);  // ✅ fixed assertion
});
