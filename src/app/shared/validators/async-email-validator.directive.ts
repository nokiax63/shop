import { Directive } from "@angular/core";
import { AbstractControl, NG_ASYNC_VALIDATORS, Validator } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, first } from "rxjs/operators";

@Directive({
    selector: '[appAsyncEmailValidator][formControlName], [appAsyncEmailValidator][ngModel]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: AsyncEmailValidatorDirective,
            multi: true
        }
    ]
})
export class AsyncEmailValidatorDirective implements Validator {

    validate(control: AbstractControl): Promise<{ [key: string]: any}>|Observable < {[key: string]: any}> {
        return this.validateEmailObservable(control.value)
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                first()
            );
    }

    validateEmailObservable(email: string) {
        return new Observable(observer => {

            const re = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+');
            if (!re.test(email)) {
                observer.next({ asyncEmailInvalid: true });
            } else {
                observer.next(null);
            }
        });
    }
}