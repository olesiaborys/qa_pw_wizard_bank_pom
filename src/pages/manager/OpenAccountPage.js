const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page; 
    this.currencyDropDown = page.locator('#currency');
    this.userSelectDropDown = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }
  
  async reloadPage() {
    await this.page.reload();
  }

  async selectCurrency(currencyOption) {
    await this.currencyDropDown.selectOption(currencyOption);
  }

  async assertSelectedCurrencyIs(expectedCurrency) {
    const selectedCurrency = await this.currencyDropDown.inputValue();
    expect(selectedCurrency).toBe(expectedCurrency);
  }

  async sellectUser(userOption) {
    await this.userSelectDropDown.selectOption(userOption);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
  
}