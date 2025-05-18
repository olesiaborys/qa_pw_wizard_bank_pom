const { expect } = require("@playwright/test");

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersList = page.getByRole("table").nth(0);
    this.firstRow = this.customersList.getByRole("row").nth(1);
    this.secondRow = this.customersList.getByRole("row").nth(2);
    this.lastRow = this.customersList.getByRole("row").last();
    this.lastRowFirstName = this.lastRow.getByRole("cell").nth(0);
    this.lastRowLastName = this.lastRow.getByRole("cell").nth(1);
    this.lastRowPostCode = this.lastRow.getByRole("cell").nth(2);
    this.lastRowAccountNumber = this.lastRow.getByRole("cell").nth(3);
    this.searchField = page.getByPlaceholder("Search Customer");

    this.firstRowFirstName = this.firstRow.getByRole("cell").nth(0);
    this.firstRowLastName = this.lastRow.getByRole("cell").nth(1);
    this.firstRowPostCode = this.lastRow.getByRole("cell").nth(2);
  }

  getCustomerRow(firstName, lastName, postCode) {
    // return row with full text
    const fullText = `${firstName} ${lastName} ${postCode}`;
    return this.page.getByRole("row", { name: fullText });
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager/list");
  }

  async reloadPage() {
    await this.page.reload();
  }

  async assertFirstNameInTable(firstNameText) {
    await expect(this.lastRowFirstName).toContainText(firstNameText);
  }

  async assertLastNameInTable(lastNameText) {
    await expect(this.lastRowLastName).toContainText(lastNameText);
  }

  async assertPostCodeInTable(postCodeText) {
    await expect(this.lastRowPostCode).toContainText(postCodeText);
  }

  async assertAccountNumberIsEmpty() {
    await expect(this.lastRowAccountNumber).toHaveText("");
  }

  async assertAccountNumberIsNotEmpty() {
    await expect(this.lastRowAccountNumber).not.toHaveText("");
  }

  async fillSearchField(searchFieldText) {
    await this.searchField.fill(searchFieldText);
  }

  async assertFirstRowFirstNameContainsText(firstRowFirstNameText) {
    await expect(this.firstRowFirstName).toContainText(firstRowFirstNameText);
  }

  async assertFirstRowLastNameContainsText(firstRowLastNameText) {
    await expect(this.firstRowLastName).toContainText(firstRowLastNameText);
  }

  async assertFirstRowPostCodeContainsText(firstRowPostCodeText) {
    await expect(this.firstRowPostCode).toContainText(firstRowPostCodeText);
  }

  async assertSecondRowIsAbsent() {
    await expect(this.secondRow).toBeHidden();
  }

  async clickDeleteButtonFor(customer) {
    const row = this.getCustomerRow(
      customer.firstName,
      customer.lastName,
      customer.postCode
    ); //find row with full name and post code of newCustomer

    const deleteButton = row.getByRole("button", { name: "Delete" }); //find button inside this row
    await expect(deleteButton).toBeVisible();
    await deleteButton.click(); //click the button
  }

  async assertCustomerRowIsNotPresentFor(customer) {
    const row = this.getCustomerRow(
      customer.firstName,
      customer.lastName,
      customer.postCode
    );
    await expect(row).toBeHidden();
  }
}
