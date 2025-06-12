import { test, expect } from '../support/fixtures.js';

test('with one product', async ({ loggedIn }) => {

    // add product to cart
    await loggedIn.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await expect(loggedIn.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await loggedIn.locator('[data-test="shopping-cart-link"]').click();

    await expect(loggedIn).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(loggedIn.locator('[data-test="title"]')).toHaveText('Your Cart');
    await expect(loggedIn.locator('[data-test="item-quantity"]')).toHaveText('1');
    await expect(loggedIn.locator('[data-test="item-0-title-link"]')).toHaveText('Sauce Labs Bike Light');
    await expect(loggedIn.locator('[data-test="inventory-item-desc"]'))
        .toHaveText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.");
    await expect(loggedIn.locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');

    // checkout
    await loggedIn.locator('[data-test="checkout"]').click();

    await expect(loggedIn).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(loggedIn.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

    await loggedIn.locator('[data-test="firstName"]').fill('Some First Name');
    await loggedIn.locator('[data-test="lastName"]').fill('Some Last Name');
    await loggedIn.locator('[data-test="postalCode"]').fill('123');

    // order preview
    await loggedIn.locator('[data-test="continue"]').click();

    await expect(loggedIn).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(loggedIn.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await expect(loggedIn.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');
    await expect(loggedIn.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $9.99');
    await expect(loggedIn.locator('[data-test="tax-label"]')).toHaveText('Tax: $0.80');
    await expect(loggedIn.locator('[data-test="total-label"]')).toHaveText('Total: $10.79');

    // complete order
    await loggedIn.locator('[data-test="finish"]').click();

    await expect(loggedIn).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(loggedIn.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(loggedIn.locator('[data-test="complete-text"]')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});

test('with replaced product', async ({ loggedIn }) => {
    // add product to cart
    await loggedIn.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await expect(loggedIn.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // remove product
    await loggedIn.locator('[data-test="remove-sauce-labs-bike-light"]').click();

    // add another product
    await loggedIn.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

    await expect(loggedIn.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await loggedIn.locator('[data-test="shopping-cart-link"]').click();

    await expect(loggedIn).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(loggedIn.locator('[data-test="title"]')).toHaveText('Your Cart');
    await expect(loggedIn.locator('[data-test="item-quantity"]')).toHaveText('1');

    await expect(loggedIn.locator('[data-test="item-5-title-link"]')).toHaveText('Sauce Labs Fleece Jacket');
    await expect(loggedIn.locator('[data-test="inventory-item-desc"]'))
        .toHaveText("It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.");
    await expect(loggedIn.locator('[data-test="inventory-item-price"]')).toHaveText('$49.99');

    // checkout
    await loggedIn.locator('[data-test="checkout"]').click();

    await expect(loggedIn).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(loggedIn.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

    await loggedIn.locator('[data-test="firstName"]').fill('Some First Name');
    await loggedIn.locator('[data-test="lastName"]').fill('Some Last Name');
    await loggedIn.locator('[data-test="postalCode"]').fill('123');

    // order preview
    await loggedIn.locator('[data-test="continue"]').click();

    await expect(loggedIn).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(loggedIn.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await expect(loggedIn.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');
    await expect(loggedIn.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $49.99');
    await expect(loggedIn.locator('[data-test="tax-label"]')).toHaveText('Tax: $4.00');
    await expect(loggedIn.locator('[data-test="total-label"]')).toHaveText('Total: $53.99');

    // complete order
    await loggedIn.locator('[data-test="finish"]').click();

    await expect(loggedIn).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(loggedIn.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(loggedIn.locator('[data-test="complete-text"]')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});

