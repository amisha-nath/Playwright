export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productsTitle = page.getByText('Products');
    this.cartLink = page.locator('.shopping_cart_link');
  }
  async assertLoaded() {
    await this.productsTitle.waitFor();
  }
  async addItemByName(name) {
    const product = this.page.locator('.inventory_item', { has: this.page.getByText(name) });
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }
  async openCart() {
    await this.cartLink.click();
  }
}
