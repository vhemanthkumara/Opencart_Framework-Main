import {test, Locator, Expect, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/Register";
import { RandomData } from "../utils/RandomData";
import { TestConfig } from "../test.config";

let homepage:HomePage;
let registerpage:RegisterPage;
let config:TestConfig;

test.beforeEach(async ({page})=>{

    config=new TestConfig();
    homepage = new HomePage(page);
    registerpage = new RegisterPage(page);
    await page.goto(config.appUrl)  
})


test.afterEach(async ({page})=>{
    
    await page.waitForTimeout(5000);
    await page.close();

})

test("Account Registration", async ()=>{

    //const config=new TestConfig();
    //await page.goto(config.appUrl)  

    //const homepage = new HomePage(page);  //Navigate to the page 
    await homepage.ClickMyAccount()
    await homepage.Register();

    //const registerpage = new RegisterPage(page);  
    await registerpage.enterFirstName(RandomData.getFirstName());
    await registerpage.enterLastName(RandomData.getLastName());
    await registerpage.enterEmail(RandomData.getEmail());
    await registerpage.enterPhoneNumber(RandomData.getPhoneNumber());
    const password = RandomData.getPassword()
    await registerpage.enterPassword(password);
    await registerpage.enterConfirmPassword(password);

    await registerpage.selectSubscribeYes();
    await registerpage.acceptPrivacyPolicy();
    await registerpage.clickContinue();

    const ConfirmMessage = await registerpage.getconfirmMessage()
    expect(ConfirmMessage).toContain("Your Account Has Been Created!")


})