import { ValidationError } from 'class-validator';

export class ErrorHelper {

    static async getValidatorErrors(errors: ValidationError[]) {
        let errObj: {[key: string]: string[]} = {};
        errors.forEach(error => {
            errObj[error.property] = [...Object.keys(error.constraints)]
        });
        return errObj;
    }
}