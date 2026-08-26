import {test, expect} from "../Fixtures/Combine.js"
import { Login_test } from "../Fixtures/LoinFixture.js";
import { SearchResultsPage } from "../pages/SearchResultsPage.js"
import { AddToCart } from "../pages/AddToCart.js"
import { TestConfig } from "../test.config.js";
import { from } from "node:stream/iter";

let searchResult:SearchResultsPage;
let addToCart:AddToCart;
let config:TestConfig;


test ("Using Login and Logout Fixture - ", async ({page, loginFixture, logoutFixture})=>
{
    const searchResult = new SearchResultsPage(page);
    const addToCart = new AddToCart(page);
   

    await searchResult.SearchProduct("MacBook Air");
    await searchResult.ProductPrize();

    await addToCart.AddToCart();
    await page.waitForTimeout(1000);
    await addToCart.GotoCart();
    await addToCart.IsProductInCart();

});