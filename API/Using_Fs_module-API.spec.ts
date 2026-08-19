import { test, expect } from "@playwright/test";
import fs from "fs";

test("Import request body from JSON file", async ({ request }) => {

    // Define the path of the JSON file containing the request payload
    const jsonFile = "testdata/post_requesr_body.json";

    // Read the JSON file and convert its contents into a JavaScript object
    const requestBody = JSON.parse(
        fs.readFileSync(jsonFile, "utf-8")
    );

    // Send a POST request using the JSON data as the request body
    const response = await request.post(
        "https://restful-booker.herokuapp.com/booking",
        {
            data: requestBody
        }
    );

    // Convert the API response body from JSON into a JavaScript object
    const responseBody = await response.json();

    // Print the API response for debugging purposes
    console.log(responseBody);

    // Verify that the API request was successful
    expect(response.ok()).toBeTruthy();

    // Verify that the API returned HTTP 200 status code
    expect(response.status()).toBe(200);

    // Verify that the response contains a booking ID
    expect(responseBody).toHaveProperty("bookingid");

    // Verify that the response contains the booking object
    expect(responseBody).toHaveProperty("booking");

    // Verify that the request data contains the additionalneeds property
    expect(requestBody).toHaveProperty("additionalneeds");

    // Verify that the booking details returned by the API
    // match the data that was sent in the request
    expect(responseBody.booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    });

});