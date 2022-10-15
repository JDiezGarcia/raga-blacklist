export class Log {
    date: string;
    description: string;
    employee: string;

    constructor(
        date: string,
        description: string,
        employee: string,
    ) {
        this.date = date;
        this.description = description;
        this.employee = employee;
    }
}
