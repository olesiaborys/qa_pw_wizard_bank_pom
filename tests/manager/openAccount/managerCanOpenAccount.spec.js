import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { OpenAccountPage } from "../../../src/pages/manager/OpenAccountPage";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { BankManagerMainPage } from "../../../src/pages/manager/BankManagerMainPage";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";

let newCustomer = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postCode: faker.location.zipCode(),
};

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(newCustomer.firstName);
  await addCustomerPage.fillLastName(newCustomer.lastName);
  await addCustomerPage.fillPostCode(newCustomer.postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reloadPage();
});

test("Assert manager can add account number for new customer", async ({
  page,
}) => {
  /* 
Test:
1. Click [Open Account].
2. Select Customer name you just created.
3. Select currency.
4. Click [Process].
5. Reload the page (This is a simplified step to close the popup).
6. Click [Customers].
7. Assert the customer row has the account number not empty.
  */

  const bankManagerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customerListPage = new CustomersListPage(page);

  const fullName = `${newCustomer.firstName} ${newCustomer.lastName}`;

  await bankManagerMainPage.clickOpenAccountButton();
  await openAccountPage.sellectUser(fullName);
  await openAccountPage.selectCurrency("Dollar");
  await openAccountPage.clickProcessButton();
  await openAccountPage.reloadPage();
  await bankManagerMainPage.clickCustomersButton();
  await customerListPage.assertAccountNumberIsNotEmpty();
});
