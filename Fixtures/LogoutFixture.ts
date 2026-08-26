import { test as base, expect } from "@playwright/test";
import { Logout } from "../pages/logout.js";
import { HomePage } from "../pages/HomePage.js";

type MyFixtures =
    {
        logoutFixture:void;
    };

export const Logout_test = base.extend<MyFixtures>
    ({

        logoutFixture: async ({page}, use)=>

        {
        const logout = new Logout(page);
        const Homepage = new HomePage(page);

        await Homepage.ClickMyAccount();
        await logout.clickOnLogout();
        await logout.clickOnContinue();
        await use();
        }
    });

export{expect}