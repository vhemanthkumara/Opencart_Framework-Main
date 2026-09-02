import { test, expect } from "@playwright/test";
import { AddToCart } from "../pages/AddToCart.js";
import { TestConfig } from "../test.config.js";

test("Clear all items from cart @sanity", async ({ page }) => {
    const config = new TestConfig();
    const cart = new AddToCart(page);

    await page.goto(`${config.appUrl}index.php?route=checkout/cart`);
    await cart.ClearCart();

    expect(await cart.IsCartEmpty()).toBe(true);
});
