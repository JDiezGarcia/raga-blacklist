export class Contact {
    email: string;
    name: string;
    lastName: string;
    phone: string;

    constructor(
        email: string,
        name: string,
        lastName: string,
        phone: string,
    ) {
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
    }
}
