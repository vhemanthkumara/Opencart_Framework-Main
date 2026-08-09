import { Locator, Page } from "@playwright/test";

export class HomePage {
    private readonly page: Page;
    //Locators
    private readonly Mylinkaccount: Locator;
    private readonly RegisterMyaccount: Locator;
    private readonly LoginMyaccount: Locator;
    private readonly SearchBar: Locator;
    private readonly SearchButton: Locator;
    private readonly SearchButton2: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.Mylinkaccount = page.locator('span:has-text("My Account")')
        this.RegisterMyaccount = page.locator('.list-inline ul li:has-text("Register")');
        this.LoginMyaccount = page.locator('.list-inline ul li:has-text("Login")');
        this.SearchBar = page.locator('input.form-control');
        this.SearchButton = page.locator('.input-group-btn');
        this.SearchButton2 = page.locator("input#button-search");


    }

    //action Meathoads 
    async isPageexist() {
        let title = await this.page.title();
        if (title) {
            return true
        }
        return true
    }

    async ClickMyAccount() {
        try {
            await this.Mylinkaccount.click();
        } catch (error) {
            console.log(`error is ${error}`)
            throw error;
        }
    }

    async Register() {
        try {
            await this.RegisterMyaccount.click();
        }
        catch (error) {
            console.log(`Error for register ${error}`);
            throw error;
        }
    }
    async login() {
        try {
            await this.LoginMyaccount.click();
        }
        catch (error) {
            console.log(`error for login is ${error}`);
            throw error;
        }
    }
    async Search(item: string) {
        try {
            await this.SearchBar.fill(item)
        }
        catch (error) {
            console.log(`Error for search bar is ${error}`);
            throw error;
        }
    }
    async Search_Button() {
        try {
            await this.SearchButton.click();

        }
        catch (error) {
            console.log(`Error for search button is ${error}`);
            throw error;
        }
    }
}