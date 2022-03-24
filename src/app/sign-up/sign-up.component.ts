import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { Account } from '../account';
import { AccountService } from '../account.service';

function forbiddenUsernameValidator(exp: RegExp) {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = exp.test(control.value);
    return forbidden ? { forbiddenUsername: true } : null;
  };
}

function uniqueUsernameValidator(accountService: AccountService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    return accountService
      .isUsernameUnique(control.value)
      .pipe(
        map((isUsernameUnique) =>
          !isUsernameUnique ? { uniqueUsername: true } : null
        )
      );
  };
}

function matchValidator(
  formControlName: string,
  matchingFormControlName: string
) {
  return (control: AbstractControl): ValidationErrors | null => {
    const formControl = control.get(formControlName);
    const matchingFormControl = control.get(matchingFormControlName);
    if (!formControl || !matchingFormControl) {
      return null;
    }
    if (formControl?.value !== matchingFormControl?.value) {
      matchingFormControl?.setErrors({ match: true });
    } else {
      matchingFormControl?.setErrors(null);
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  submitted = false;
  signUpForm = new FormGroup(
    {
      address: new FormGroup({
        street1: new FormControl('', Validators.required),
        num: new FormControl(''),
        street2: new FormControl(''),
      }),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
          forbiddenUsernameValidator(/admin/i),
        ],
        asyncValidators: [uniqueUsernameValidator(this.accountService)],
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    },
    {
      validators: [matchValidator('password', 'confirmPassword')],
    }
  );

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  createAccount() {
    console.log(this.signUpForm.errors);
    if (this.signUpForm.valid) {
      const account: Account = this.signUpForm.value;
      this.accountService.register(account).subscribe((res) => {
        console.log(res);
      });
    }
    this.submitted = true;
  }

  showError(formControlName: string): boolean {
    const control = this.signUpForm.get(formControlName);
    if (!control) {
      return false;
    }
    return (this.submitted || control.touched) && control.invalid;
  }

  hasError(formControlName: string, errorName?: string): boolean {
    const control = this.signUpForm.get(formControlName);
    if (!control) {
      return false;
    }
    if (!errorName) {
      return control.invalid;
    }
    return control.hasError(errorName);
  }

  isRequired(formControlName: string): boolean {
    const control = this.signUpForm.get(formControlName);
    if (!control) {
      return false;
    }
    return control.hasValidator(Validators.required);
  }
}
