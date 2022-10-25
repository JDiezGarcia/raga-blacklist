export class Log {
    id: number;
    dateLog: string;
    description: string;
    employee: string;

    constructor(
        id: number,
        dateLog: string,
        description: string,
        employee: string,
    ) {
        this.id = id;
        this.dateLog = dateLog;
        this.description = description;
        this.employee = employee;
    }
}

export interface LogList {
    logs: Log[];
    total: number;
}