import { Locator, Page } from "@playwright/test"

export class LoginPage {
    private readonly page: Page;
    private readonly mailaddress: Locator;
    private readonly Password: Locator;
    private readonly forgotpwd: Locator;
    private readonly Loginbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mailaddress = page.locator("#input-email");
        this.Password = page.locator("#input-password");
        this.forgotpwd = page.locator("div[class='form-group'] a");
        this.Loginbutton = page.locator("input[value='Login']");

    }

    async enterEmail(Email: string) {
        await this.mailaddress.fill(Email);
    }
    async enterPWD(password: string) {
        await this.Password.fill(password);
    }
    async clickLogin() {
        await this.Loginbutton.click();
    }
    async loginFlow(email: string, password: string) {
        await this.mailaddress.fill(email);
        await this.Password.fill(password);
        await this.Loginbutton.click();

    }
}
