import { test, expect } from "@playwright/test";

test("Validating the Response body", async ({ request }) => {

    // Define the request payload that will be sent to the API
    const requestBody = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    };

    // Send a POST request to create a new booking
    const response = await request.post(
        "https://restful-booker.herokuapp.com/booking",
        {
            data: requestBody
        }
    );

    // Convert the API response body from JSON format into a JavaScript object
    const responseBody = await response.json();

    // Print the response in the console for debugging and verification
    console.log(responseBody);

    // Verify that the API request was successful
    expect(response.ok()).toBeTruthy();

    // Verify that the API returned HTTP 200 status code
    expect(response.status()).toBe(200);

    // Verify that the response contains the booking ID
    expect(responseBody).toHaveProperty("bookingid");

    // Verify that the response contains the booking object
    expect(responseBody).toHaveProperty("booking");

    // Verify that the request data contains the expected property
    expect(requestBody).toHaveProperty("additionalneeds");

    // Store the booking object from the API response for further validation
    const booking = responseBody.booking;

    // Verify that the returned booking details match the expected values
    expect(booking).toMatchObject({
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "additionalneeds": "Breakfast"
    });

    // Extract the booking dates from the response
    const bookingdate = booking.bookingdates;

    // Verify that the check-in and check-out dates are correct
    expect(bookingdate).toMatchObject({
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    });

});