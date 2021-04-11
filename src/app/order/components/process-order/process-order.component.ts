import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Order } from '../../models';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css']
})
export class ProcessOrderComponent implements OnInit {
  
  private sub: Subscription;
  orderData: Order
  orderForm: FormGroup;

  get firstName(): AbstractControl {
    return this.orderForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.orderForm.get('lastName');
  }
  
  get email(): AbstractControl {
    return this.orderForm.get('email');
  }

  validationMessagesMap = new Map([
    ['firstName', {
      message: '',
      required: 'Please enter your first name.',
      minlength: 'The first name must be longer than 3 characters.'
    }],
    ['lastName', {
      message: '',
      required: 'Please enter your last name.'
    }],
    ['email', {
      message: '',
      required: 'Please enter your email address.',
      pattern: 'Please enter a valid email address.',
      asyncEmailInvalid:
        'Please enter a valid email address'
    }]
  ]);

  constructor(private router: Router,
    private fb: FormBuilder) {
    this.orderData = this.router.getCurrentNavigation()?.extras?.state as Order;
  }

  ngOnInit(): void {
    this.buildForm();    
    this.watchValueChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private buildForm(): void {
    this.orderForm = this.fb.group({
      firstName: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }),
      lastName: [{value: '', disabled: false }, [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  onBlur(event): void {
    const controlName = event.target.getAttribute('formControlName');
    this.setValidationMessages(controlName);
  }

  private setValidationMessages(controlName?: string) {
    if (controlName) {
      this.buildValidationMessages(controlName);
    }
    else {
      this.validationMessagesMap.forEach((control, cntrlName) => {
        this.buildValidationMessages(cntrlName);
      });
    }
  }

  private buildValidationMessages(controlName: string): void {
    const c: AbstractControl = this[controlName]; // вызов гетера
    this.validationMessagesMap.get(controlName).message = '';

    if ((c.touched || c.dirty) && c.invalid && c.errors) {
      this.validationMessagesMap.get(controlName).message = Object.keys(c.errors)
        .map(key => this.validationMessagesMap.get(controlName)[key])
        .join(' ');
    }
  }

  private watchValueChanges(): void {
    
    this.sub = this.orderForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(ignorValue =>
        this.setValidationMessages()
      );
  }


  onSave(): void {

  }
}
