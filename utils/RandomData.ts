import { faker } from "@faker-js/faker";

export class RandomData {

    // Generates a random first name
    static getFirstName(): string {
        return faker.person.firstName();
    }


    // Generates a random last name
    static getLastName(): string {
        return faker.person.lastName();
    }


    // Generates a random email address
    // Useful for creating unique users during registration tests
    static getEmail(): string {
        return faker.internet.email();
    }


    // Generates a random 10-digit phone number
    static getPhoneNumber(): string {
        return faker.string.numeric(10);
    }


    // Generates a random password with 10 characters
    // memorable: false generates a more random/non-readable password
    static getPassword(): string {
        return faker.internet.password({
            length: 10,
            memorable: false
        });
    }


    // Generates a complete random user object
    // This method combines all the individual random data generators
    // and returns the data as a single object
    static getUser() {

        return {

            // Generate a random first name
            firstName: this.getFirstName(),

            // Generate a random last name
            lastName: this.getLastName(),

            // Generate a random email address
            email: this.getEmail(),

            // Generate a random phone number
            phoneNumber: this.getPhoneNumber(),

            // Generate a random password
            password: this.getPassword()
        };
    }
}