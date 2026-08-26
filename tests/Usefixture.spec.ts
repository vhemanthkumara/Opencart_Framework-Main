import {test, expect} from "../Fixtures/Combine.js";
import { SearchResultsPage } from "../pages/SearchResultsPage.js";
import { AddToCart } from "../pages/AddToCart.js";



test("End To End Test", async ({page, loginFixture, logoutFixture})=>{

    let Cart = new AddToCart(page);
    let Search = new SearchResultsPage(page);
    
    await Search.SearchProduct("iPhone");
    
    /*await Cart.AddToCart();
    await Cart.GotoCart();
    await Cart.IsProductInCart();
    
    await page.waitForTimeout(3000);*/


});

