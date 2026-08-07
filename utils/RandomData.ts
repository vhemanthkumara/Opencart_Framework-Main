import { faker } from "@faker-js/faker";

export class RandomData {

    static getFirstName(): string {
        return faker.person.firstName();
    }

    static getLastName(): string {
        return faker.person.lastName();
    }

    static getEmail(): string {
        return faker.internet.email();
    }

    static getPhoneNumber(): string {
        return faker.string.numeric(10);
    }

    static getPassword(): string {
        return faker.internet.password({
            length: 10,
            memorable: false
        });
    }

    static getUser() {
        return {
            firstName: this.getFirstName(),
            lastName: this.getLastName(),
            email: this.getEmail(),
            phoneNumber: this.getPhoneNumber(),
            password: this.getPassword()
        };
    }
}