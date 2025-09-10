import { test, expect } from '@playwright/test';

test('Add two items and validate cart contents', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.click('#login-button'); // ✅ fixed selector

  // Function to add an item by name
  const addItem = async (name) => {
    const product = page.locator('.inventory_item', {
      has: page.getByText(name),
    });
    await product.getByRole('button', { name: 'Add to cart' }).click();
  };

  // Add items
  await addItem('Sauce Labs Backpack');
  await addItem('Sauce Labs Bike Light');

  // Validate cart badge
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  // Go to cart and validate contents
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.cart_item')).toHaveCount(2);
});
