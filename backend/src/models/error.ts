export interface TypeResponseErrors<T> {
    exist?: string,
    validators?: ValidatorErrors<T>,
    sql?: string,
    notFound?: string,
}

export type ValidatorErrors<T> = {
    [Property in keyof T]?: string[];
}

export enum ErrorType {
    SQL = 'Error on the Data base',
    NotFound = 'Entry not found',
    Exist = 'Entry already exist'
}