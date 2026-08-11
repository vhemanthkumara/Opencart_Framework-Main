import { Expect, test, Locator, expect } from "@playwright/test";

test("sample", async ({ page }) => {

    await page.goto("https://tutorialsninja.com/demo/")

    let Firstname = page.getByRole('textbox', { name: 'First Name' });
    let Lastname = page.getByRole('textbox', { name: 'Last Name' });
    let E_mail = page.getByRole('textbox', { name: 'E-Mail' });
    let Telephone = page.getByRole('textbox', { name: 'Telephone' });
    let Password = page.locator('#input-password');
    let Password_confirm = page.locator('#input-confirm');
    let Subscribe = page.getByLabel('Yes');
    let PrivecyPolicy = page.getByRole('checkbox');
    let Countinue = page.locator('input.btn[value="Continue"]');
    let Mylinkaccount = page.locator('span:has-text("My Account")')
    let RegisterMyaccount = page.locator('.list-inline ul li:has-text("Register")');

    async function regrstration(FName: string, lastname: string, Email: string, phoneNumber: string, PWD: string, CPWD: string) {
        await Mylinkaccount.click();
        await RegisterMyaccount.click();
        await Firstname.fill(FName);
        await Lastname.fill(lastname);
        await E_mail.fill(Email);
        await Telephone.fill(phoneNumber);
        await Password.fill(PWD)
        await Password_confirm.fill(CPWD);
        await Subscribe.click();
        await PrivecyPolicy.click();
        await Countinue.click();
        await expect(page.locator('#content')).toHaveText("Your Account Has Been Created!")
    }

    await regrstration('Hemanth', 'Kumara', 'Hementh@gmail.com', "9911881188", '12345', "12345")
    await page.waitForTimeout(3000);
})

test.only("search Item @sanity", async ({ page }) => {

    await page.goto("https://tutorialsninja.com/demo/")
    let SearchBar = page.getByPlaceholder('Search');
    let SearchButton = page.locator("//button[@class='btn btn-default btn-lg']");

    async function searchitem(ItemName: string) {
        await SearchBar.fill(ItemName);
        await SearchButton.click();
        await page.locator('#button-search').click();
        const itemfound = page.getByText(ItemName, { exact: true });
        await itemfound.click();

        await page.locator("#button-cart").click();
        const ConfirmMessageText = page.locator("div.alert");
        await expect(ConfirmMessageText).toContainText(`Success: You have added ${ItemName} to your shopping cart!`);
        await page.locator('#cart-total').click();
        await page.getByText('View Cart', { exact: true }).click();
        const ConfirmProductInCart = page.locator('.table-responsive tbody td:nth-child(2)');
        await expect(ConfirmProductInCart).toContainText(`${ItemName}`);


        const prize = page.locator("ul[class='list-unstyled'] li h2");
        return prize;

    }
    await searchitem('MacBook Air');

})