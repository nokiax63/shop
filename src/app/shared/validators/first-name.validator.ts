import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FirstNameValidators {

    static checkFirstNameLength(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): ValidationErrors | null => {
            return checkLength(c, min, max);
        }    
    }
}

export function checkLength(
    c: AbstractControl,
    min: number = 1,
    max: number = 5
): ValidationErrors | null {
    if (
        c.value !== undefined &&
        (c.value.length < min || c.value.length > max)
    ) {
        return {
            firstNameRange: true
        };
    }
    return null;
}
