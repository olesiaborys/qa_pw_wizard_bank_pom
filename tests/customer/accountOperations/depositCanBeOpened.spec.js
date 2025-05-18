import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CustomerLoginPage } from "../../../src/pages/customer/CustomerLoginPage";
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage";

test("Assert the deposit can be opened", async ({ page }) => {
  /* 
Test:
1. Open Customer Login page
2. Select "Harry Potter"
3. Click [Login]
4. Click [Deposit]
5. Fill deposit value
6. Click [Deposit]
7. Assert 'Deposit Successful' message is visible
8. Assert Balance is correct
*/

  const customerLoginPage = new CustomerLoginPage(page);
  const customerAccountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer("Harry Potter");
  await customerLoginPage.clickLoginButton();

  await customerAccountPage.clickDepositButton();

  const depositAmount = faker.number.int(100).toString();

  await customerAccountPage.fillAmountInputField(depositAmount);
  await customerAccountPage.clickDepositFormButton();

  await customerAccountPage.assertDepositSuccessfulMessageIsVisible();
  await customerAccountPage.assertAccountLineContainsText(
    `Balance : ${depositAmount}`
  );
});
