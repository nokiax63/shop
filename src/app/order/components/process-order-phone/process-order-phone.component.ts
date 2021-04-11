import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-process-order-phone',
  templateUrl: './process-order-phone.component.html',
  styleUrls: ['./process-order-phone.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProcessOrderPhoneComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProcessOrderPhoneComponent),
      multi: true
    }
  ]
})
export class ProcessOrderPhoneComponent implements OnInit, ControlValueAccessor {

  phoneInfoForm: FormGroup;
  public onTouched: () => void = () => {};
  validationMessagesMap = new Map([
    ['phone', {
      message: '',
      required: 'Please enter phone',
    }]
  ]);

  @Input('index') i = 0;
  @Output() removePhone = new EventEmitter<number>();

  get phone(): AbstractControl {
    return this.phoneInfoForm.get('phone');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.phoneInfoForm = this.buildPhone();
  }

  onBlur(event): void {
    const controlName = event.target.getAttribute('formControlName');
    this.setValidationMessages(controlName);
  }
  
  onRemovePhone(index: number): void {
    this.removePhone.emit(index);
  }

  private buildPhone(): FormGroup {
    return this.fb.group({
      phone: ['', Validators.required]
    });
  }

  private buildValidationMessages(controlName: string) {
    const c: AbstractControl = this[controlName]; 
    this.validationMessagesMap.get(controlName).message = '';

    if ((c.touched || c.dirty) && c.invalid && c.errors) {
      this.validationMessagesMap.get(controlName).message = Object.keys(c.errors)
        .map(key => this.validationMessagesMap.get(controlName)[key])
        .join(' ');
    }
  }

  private setValidationMessages(controlName?: string): void {
    if (controlName) {
      this.buildValidationMessages(controlName);
    }

    else {
      this.validationMessagesMap.forEach((control, cntrlName) => {
        this.buildValidationMessages(cntrlName);
      });
    }
  }

    // ****** CONTROL_VALUE_ACCESSOR INTERFACE METHODS ********* /

    writeValue(val: any): void {
      if (val) {
        this.phoneInfoForm.setValue(val, { emitEvent: false });
      }
    }
  
    registerOnChange(fn: any): void {
      this.phoneInfoForm.valueChanges.subscribe(fn);
    }
  
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  
    setDisabledState?(isDisabled: boolean): void {
      isDisabled ? this.phoneInfoForm.disable() : this.phoneInfoForm.enable();
    }
  
    // ****** CONTROL_VALUE_ACCESSOR INTERFACE METHODS ********* /
      
    validate(c: AbstractControl): ValidationErrors | null {
      return this.phoneInfoForm.valid
        ? null
        : {
            invalidForm: {
              valid: false,
              message: 'phoneInfoForm fields are invalid'
            }
          };
    }
}
