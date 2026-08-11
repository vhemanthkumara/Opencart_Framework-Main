import { test, expect } from "@playwright/test"
import { TestConfig } from "../test.config"
import { RandomData } from "../utils/RandomData";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage"
import { RegisterPage } from "../pages/Register"
import { LoginPage } from "../pages/login"
import { SearchResultsPage } from "../pages/SearchResultsPage"
import { AddToCart } from "../pages/AddToCart";
import { Logout } from "../pages/logout"

let URL: TestConfig;
let login: LoginPage;
let MyAccount: MyAccountPage;
let Homepage: HomePage;
let register: RegisterPage;
let search: SearchResultsPage;
let Addtocart: AddToCart;
let logout: Logout;

test.beforeEach(async ({ page }) => {

    URL = new TestConfig();
    login = new LoginPage(page);
    MyAccount = new MyAccountPage(page);
    Homepage = new HomePage(page);
    register = new RegisterPage(page);
    search = new SearchResultsPage(page);
    Addtocart = new AddToCart(page);
    logout = new Logout(page);

})

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await Homepage.ClickMyAccount();
    await logout.clickonlogout();
    await logout.clickonCountinue();
    await page.close();
})


test("End to End Scenario @sanity", async ({ page }) => {

    await page.goto(URL.appUrl);

    await Homepage.ClickMyAccount();
    await Homepage.Register();

    const email = RandomData.getEmail();
    const PWD = RandomData.getPassword();

    await register.enterFirstName(RandomData.getFirstName());
    await register.enterLastName(RandomData.getLastName());
    await register.enterEmail(email);
    await register.enterPhoneNumber(RandomData.getPhoneNumber());
    await register.enterPassword(PWD);
    await register.enterConfirmPassword(PWD);
    await register.selectSubscribeYes();
    await register.acceptPrivacyPolicy();
    await register.clickContinue();

    await Homepage.ClickMyAccount();

    await logout.clickonlogout();

    await Homepage.ClickMyAccount();
    await Homepage.login();

    await login.enterEmail(email)
    await login.enterPWD(PWD);
    await login.clickLogin();

    await search.SearchProduct("MacBook");
    await search.ProductPrize();

    await Addtocart.AddToCart();

    const verify = await Addtocart.VerifyTheMessage();
    expect(verify).toContain('Success: You have added MacBook to your shopping cart!');

    await Addtocart.GotoCart();

    await Addtocart.GotoCart();
    const confirm = await Addtocart.IsProductInCart();
    expect(confirm).toContain('MacBook')

})