import{test, Expect, Locator} from "@playwright/test"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/login"
import { TestConfig } from "../test.config"

let config:TestConfig;
let homepage:HomePage;
let loginpage:LoginPage;

test.beforeEach(async ({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);
    homepage = new HomePage(page);
    await homepage.ClickMyAccount();
    await homepage.login();
    loginpage= new LoginPage(page);

})

test.afterEach(async ({page})=>{

    await page.waitForTimeout(5000);
    await page.close();
})

test("login Flow @smoke", async ({page})=>{

    //const config = new TestConfig();
    //await page.goto(config.appUrl);

    /*const homepage = new HomePage(page);

    await homepage.ClickMyAccount();
    await homepage.login();
    */
   
    //const loginpage= new LoginPage(page);
    await loginpage.enterEmail(config.email);
    await loginpage.enterPWD(config.password);
    await loginpage.clickLogin();

})
