export interface TColumnConfig {
    key: string,
    name: string,
}

export interface TData {
    [key: string]: any;
}

export enum TOptionsEnum {
    Delete = 'delete',
    View = 'view'
}