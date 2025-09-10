import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }
  async fillInfo(first, last, zip) {
    await this.page.getByPlaceholder('First Name').fill(first);
    await this.page.getByPlaceholder('Last Name').fill(last);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(zip);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }
  async verifyTotals() {
    const subtotal = parseFloat((await this.page.locator('.summary_subtotal_label').textContent()).split('$')[1]);
    const tax = parseFloat((await this.page.locator('.summary_tax_label').textContent()).split('$')[1]);
    const total = parseFloat((await this.page.locator('.summary_total_label').textContent()).split('$')[1]);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  }
  async finish() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }
}
