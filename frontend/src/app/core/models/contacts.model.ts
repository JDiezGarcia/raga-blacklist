export class Contact {
    id: number;
    email: string;
    name: string;
    lastName: string;
    dni: string;
    phone: string;
    expelled: boolean;

    constructor(
        id: number,
        email: string,
        name: string,
        lastName: string,
        phone: string,
        dni: string,
        expelled: boolean
    ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.dni = dni;
        this.expelled = expelled;
    }
}

export interface ContactList {
    contacts: Contact[];
    total: number;
}

export interface ContactParams extends Partial<Contact>{
    offset: number,
    limit: number,
}
export interface ContactFields {
    email: 'Email:',
    name: 'Nombre:',
    lastName: 'Apellidos:',
    dni: 'DNI:',
    phone: 'Telefono:',
    expelled: 'No deseado:',
}

export const ContactFieldsObj : ContactFields = {
    email: 'Email:',
    name: 'Nombre:',
    lastName: 'Apellidos:',
    dni: 'DNI:',
    phone: 'Telefono:',
    expelled: 'No deseado:',
}