export interface OkResponse {
    success: string;
}

export interface ErrorResponse {
    error: ErrorFields;
}

export interface ErrorFields {
    validators: { [key: string]: ErrorsValidators[] | string[] },
    exist: string;
}

export const ErrorMessages = {
    validators: 'Error en formato del formulario',
    exist: 'Error - Ya existe el contacto',
    isString: 'El campo es obligatorio',
    isLength: 'El campo no cumple la longitud necesaria',
    isEmail: 'El campo debe ser un email',
    isDateString: 'El campo debe ser una fecha', 
}

export enum ErrorsValidators {
    IsString = 'isString',
    IsLength = 'isLength', 
    IsEmail = 'isEmail',
    IsDateString = 'isDateString',
}