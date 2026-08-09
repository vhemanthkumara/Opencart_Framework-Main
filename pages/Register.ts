import { Page, Locator } from "@playwright/test";

export class RegisterPage {

    private readonly page: Page;

    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly subscribeYes: Locator;
    private readonly privacyPolicy: Locator;
    private readonly continueButton: Locator;
    private readonly finalmessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.firstName = page.getByRole("textbox", { name: "First Name" });
        this.lastName = page.getByRole("textbox", { name: "Last Name" });
        this.email = page.getByRole("textbox", { name: "E-Mail" });
        this.telephone = page.getByRole("textbox", { name: "Telephone" });
        this.password = page.locator("#input-password");
        this.confirmPassword = page.locator("#input-confirm");
        this.subscribeYes = page.getByLabel("Yes");
        this.privacyPolicy = page.getByRole("checkbox");
        this.continueButton = page.locator('input[value="Continue"]');
        this.finalmessage = page.locator('#content');
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastName.fill(lastName);
    }

    async enterEmail(email: string): Promise<string> {
        await this.email.fill(email);
        return email;
    }

    async enterPhoneNumber(phoneNumber: string): Promise<void> {
        await this.telephone.fill(phoneNumber);
    }

    async enterPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    async enterConfirmPassword(password: string): Promise<void> {
        await this.confirmPassword.fill(password);
    }

    async selectSubscribeYes(): Promise<void> {
        await this.subscribeYes.click();
    }

    async acceptPrivacyPolicy(): Promise<void> {
        await this.privacyPolicy.check();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
    async getconfirmMessage(): Promise<string> {
        return await this.finalmessage.textContent() ?? '';
    }

    async registerUser(
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        password: string
    ): Promise<void> {

        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPhoneNumber(phoneNumber);
        await this.enterPassword(password);
        await this.enterConfirmPassword(password);
        await this.selectSubscribeYes();
        await this.acceptPrivacyPolicy();
        await this.clickContinue();
    }
}