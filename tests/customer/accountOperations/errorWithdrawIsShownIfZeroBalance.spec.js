import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CustomerLoginPage } from "../../../src/pages/customer/CustomerLoginPage";
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage";

test("Assert the customer cannot withdraw money with empty balance", async ({
  page,
}) => {
  /* 
Test:
1. Open Customer Login page
2. Select "Ron Weasly"
3. Click [Login]
4. Assert the "Balance : 0" text is present
5. Click [Withdrawl]
6. Type amount of money to withdraw
7. Click [Withdraw]
8. Assert error message 'Transaction Failed. You can not withdraw amount more than the balance.' is visible
*/
  const customerLoginPage = new CustomerLoginPage(page);
  const customerAccountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer("Ron Weasly");
  await customerLoginPage.clickLoginButton();

  await customerAccountPage.assertAccountLineContainsText("Balance : 0");

  await customerAccountPage.clickWithdrawlButton();

  const withdrawlAmount = faker.number.int(100).toString();

  await customerAccountPage.fillAmountInputField(withdrawlAmount);
  await customerAccountPage.clickWithdrawlFormButton();

  await customerAccountPage.assertWithdrawNoBalanceErrorMessageIsVisible();
});
