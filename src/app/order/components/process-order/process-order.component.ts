import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CartService } from 'src/app/cart/services/cart.service';
import { FirstNameValidators } from 'src/app/shared/validators/first-name.validator';
import { Order } from '../../models';
import { OrderService } from '../../services';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css']
})
export class ProcessOrderComponent implements OnInit {

  private sub: Subscription;
  orderData: Order
  orderForm: FormGroup;

  placeholder = {
    address: 'Address'
  };
  rMin = 1;
  rMax = 20;

  get firstName(): AbstractControl {
    return this.orderForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.orderForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.orderForm.get('email');
  }  

  get phones(): FormArray {
    return this.orderForm.get('phones') as FormArray;
  }

  get pickup(): AbstractControl {
    return this.orderForm.get('pickup');
  }

  get address(): AbstractControl {
    return this.orderForm.get('address');
  }

  validationMessagesMap = new Map([
    ['firstName', {
      message: '',
      firstNameRange: `The first name must be longer than ${this.rMin} characters and less than ${this.rMax} characters`,
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
    }],
    ['address', {
      message: '',
      required: 'Please enter your address.',
      minlength: 'The first name must be longer than 3 characters.'
    }],
    ['pickup', {
      message: ''
    }]
  ]);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService) {
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
      firstName: new FormControl('', { validators: [Validators.required, FirstNameValidators.checkFirstNameLength(this.rMin, this.rMax)], updateOn: 'blur' }),
      lastName: [{ value: '', disabled: false }, [Validators.required]],
      email: ['', [Validators.required]],      
      phones: this.fb.array([this.buildPhone()]),
      pickup: false,
      address: ['', []]
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

  private setAddressValidation(value: boolean): void {
    this.address.clearValidators();

    if (value) {
      this.placeholder = {
        address: 'Address (required)'
      };
      this.address.setValidators([
        Validators.required, 
        Validators.minLength(3)
      ]);
    }
    else {
      this.placeholder = {
        address: 'Address'
      };
    }

    this.address.updateValueAndValidity();
  }

  private watchValueChanges(): void {

    this.sub = this.pickup.valueChanges
      .subscribe(value => this.setAddressValidation(value));

    const sub = this.orderForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(ignorValue =>
        this.setValidationMessages()
      );

    this.sub.add(sub);
  }


  onSave(): void {

    this.orderData.firstName = this.firstName.value;
    this.orderData.lastName = this.lastName.value;
    this.orderData.email = this.email.value;
    this.orderData.phones = this.phones.value;
    this.orderData.address = this.address.value;
    
    const observer = {
      next: (order: Order) => {
        this.cartService.removeAllProducts();
        alert("Order succesfully created");
      },
      error: (err: any) => console.log(err)
    };
    this.sub.add(this.orderService.createOrder(this.orderData).subscribe(observer));
  }

  private buildPhone(): FormControl  {
    return this.fb.control('');
  }

  onAddPhone(): void {
    this.phones.push(this.buildPhone());
  }

  onRemovePhone(index: number): void {
    this.phones.removeAt(index);
  }
}
