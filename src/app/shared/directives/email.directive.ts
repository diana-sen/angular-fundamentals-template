import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    const emailRegex= /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return (control: AbstractControl): ValidationErrors | null =>
       emailRegex.test(control.value) ? null : {invalidEmail: control.value};
}


@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true
    }]
})
export class EmailValidatorDirective implements Validator {
    // Add your code here
    validate(control: AbstractControl): ValidationErrors | null {
        return emailValidator()(control);
    }        

}
