import { test } from "@playwright/test";
import { CustomerLoginPage } from "../../../src/pages/customer/CustomerLoginPage";
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage";

test("Assert customer has correct bank data", async ({ page }) => {
  /* 
Test:
1. Open Customer Login page
2. Select Hermione Granger
3. Click [Login]
4. Assert Account Number in Dropdown next to the Hermoine Granger name
5. Assert Account Number text
5. Assert Balance text
6. Assert Currency text
*/

  const customerLoginPage = new CustomerLoginPage(page);
  const customerAccountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer("Hermoine Granger");
  await customerLoginPage.clickLoginButton();

  await customerAccountPage.assertAccountIdInDropDownHasValue("number:1001");
  await customerAccountPage.assertAccountLineContainsText(
    "Account Number : 1001"
  );
  await customerAccountPage.assertAccountLineContainsText("Balance : 5096");
  await customerAccountPage.assertAccountLineContainsText("Currency : Dollar");
});
