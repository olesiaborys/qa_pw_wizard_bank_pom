import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";
import { BankManagerMainPage } from "../../../src/pages/manager/BankManagerMainPage";

test("Assert manager can add new customer", async ({ page }) => {
  /* 
Test:
1. Open add customer page by link https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
2. Fill the First Name.  
3. Fill the Last Name.
4. Fill the Postal Code.
5. Click [Add Customer].
6. Reload the page
7. Click [Customers] button.
8. Assert the First Name of the customer is present in the table in the last row. 
9. Assert the Last Name of the customer is present in the table in the last row. 
10. Assert the Postal Code of the customer is present in the table in the last row. 
11. Assert there is no account number for the new customer in the table in the last row. 
  */

  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);

  const newCustomer = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode(),
  };

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(newCustomer.firstName);
  await addCustomerPage.fillLastName(newCustomer.lastName);
  await addCustomerPage.fillPostCode(newCustomer.postCode);
  await addCustomerPage.clickAddCustomerButton();

  await addCustomerPage.reloadPage();
  await bankManagerMainPage.clickCustomersButton();

  await customersListPage.assertFirstNameInTable(newCustomer.firstName);
  await customersListPage.assertLastNameInTable(newCustomer.lastName);
  await customersListPage.assertPostCodeInTable(newCustomer.postCode);

  await customersListPage.assertAccountNumberIsEmpty();
});
