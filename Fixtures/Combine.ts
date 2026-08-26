import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.js";
import { Logout } from "../pages/logout.js";
import { TestConfig } from "../test.config.js";
import { HomePage } from "../pages/HomePage.js";



type MyFixtures = {
    loginFixture: void;
    logoutFixture: void;
};

export const test = base.extend<MyFixtures>({

    // -------------------------
    // LOGIN FIXTURE
    // -------------------------

    loginFixture: async ({ page }, use) =>
        {
            const config = new TestConfig();
            const loginPage = new LoginPage(page);
            const Homepage = new HomePage(page)
            
            await page.goto(config.appUrl); 

            await Homepage.ClickMyAccount();
            await Homepage.login();       
            
            await loginPage.loginFlow("Hementh@gmail.com", "12345");
            await use();
        },


    // -------------------------
    // LOGOUT FIXTURE
    // -------------------------
    logoutFixture: async ({ page }, use) => {

        const logout = new Logout(page);

        // Test executes here
        await use();

        // Logout happens after the test
        await logout.clickOnLogout();
        await logout.clickOnContinue();
    }

});

export { expect };