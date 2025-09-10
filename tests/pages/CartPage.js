import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
  }
  async assertItemsCount(n) {
    await expect(this.cartItems).toHaveCount(n);
  }
  async proceedToCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}
