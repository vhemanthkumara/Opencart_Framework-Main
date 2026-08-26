import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.js";
import { TestConfig } from "../test.config.js";
import { HomePage } from "../pages/HomePage.js";

type MyFixtures =
    {
        loginFIxture:void;

    };



export const Login_test = base.extend<MyFixtures>
    ({
        loginFIxture: async ({ page }, use) =>
        {
            const config = new TestConfig();
            const loginPage = new LoginPage(page);
            const Homepage = new HomePage(page)
            
            await page.goto(config.appUrl); 

            await Homepage.ClickMyAccount();
            await Homepage.login();       
            
            await loginPage.loginFlow("Hementh@gmail.com", "12345");
            await use();
        }
    });

export{expect}