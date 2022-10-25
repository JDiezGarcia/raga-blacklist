export interface FContactConfig {
    btnText: string;
    mode: FContactModeEnum;
}

export enum FContactModeEnum {
    EDIT = 'edit',
    VIEW = 'view',
    CREATE = 'create',
}