import { Locator, Page } from "@playwright/test";

export class Logout {

    private readonly page: Page;
    private readonly logoutButton: Locator;
    private readonly logoutMessage: Locator;
    private readonly countinue: Locator;



    constructor(page: Page) {
        this.page = page;
        this.logoutButton =page.locator('a').filter({ hasText: 'Logout' }).first()
        this.logoutMessage = page.locator('#content h1');
        this.countinue = page.locator('a:has-text("Continue")');
    }

    async clickonlogout() {
        await this.logoutButton.click();
    }
    async VerifyLogoutMessage() {
        return await this.logoutMessage.innerText();
    }
    async clickonCountinue() {
      await this.countinue.click();
    }
}