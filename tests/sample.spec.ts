import { Expect, test, Locator, expect } from "@playwright/test";

test("sample", async({page})=>{

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

async function regrstration(FName:string, lastname:string, Email:string, phoneNumber:string,PWD:string, CPWD:string)
{
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

await regrstration('Hemanth', 'Kumara', 'Hementh@gmail.com',"9911881188", '12345',"12345")
await page.waitForTimeout(3000);
})