import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test('POM checkout flow', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.assertLoaded();
  await inventory.addItemByName('Sauce Labs Backpack');
  await inventory.openCart();

  await cart.assertItemsCount(1);
  await cart.proceedToCheckout();

  await checkout.fillInfo('Jane', 'Doe', '560001');
  await checkout.verifyTotals();
  await checkout.finish();

  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});
