import { test, expect } from "@playwright/test";
import { DateTime } from "luxon";
import { faker } from "@faker-js/faker";

test("Create an API test by using Faker library", async ({ request }) => {

    // Generate random first name using Faker
    const firstname = faker.person.firstName();

    // Generate random last name using Faker
    const lastname = faker.person.lastName();

    // Generate a random price between 1,000 and 100,000
    const totalprice = faker.number.int({
        min: 1000,
        max: 100000
    });

    // Generate a random boolean value (true or false)
    const depositpaid = faker.datatype.boolean();

    // Generate the check-in date using the current date
    const checkin = DateTime.now().toFormat("yyyy-MM-dd");

    // Generate the check-out date 5 days after the current date
    const checkout = DateTime.now()
        .plus({ days: 5 })
        .toFormat("yyyy-MM-dd");

    // Define the additional requirement for the booking
    const additionalneeds = "Breakfast";

    // Create the request body using dynamically generated test data
    const requestBody = {
        firstname: firstname,
        lastname: lastname,
        totalprice: totalprice,
        depositpaid: depositpaid,
        bookingdates: {
            checkin: checkin,
            checkout: checkout
        },
        additionalneeds: additionalneeds
    };

    // Send a POST request to create a new booking
    const response = await request.post(
        "https://restful-booker.herokuapp.com/booking",
        {
            data: requestBody
        }
    );

    // Convert the API response into a JavaScript object
    const responseBody = await response.json();

    // Verify that the API request was successful
    expect(response.ok()).toBeTruthy();

    // Verify that the API returned HTTP 200 status code
    expect(response.status()).toBe(200);

    // Verify that the response contains a booking ID
    expect(responseBody).toHaveProperty("bookingid");

    // Verify that the response contains the booking object
    expect(responseBody).toHaveProperty("booking");

    // Verify that the request body contains the additional needs property
    expect(requestBody).toHaveProperty("additionalneeds");

    // Store the booking details from the API response
    const details = responseBody;

    // Verify that the response data matches the dynamically generated request data
    expect(details.booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    });

});