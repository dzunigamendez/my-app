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

function forbiddenNameValidator(exp: RegExp) {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = exp.test(control.value);
    return forbidden ? { forbiddenName: true } : null;
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
    if (formControl?.value !== matchingFormControl?.value) {
      matchingFormControl?.setErrors({ match: true });
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
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
          forbiddenNameValidator(/admin/i),
        ],
        asyncValidators: [uniqueUsernameValidator(this.accountService)],
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
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
    return (
      (this.submitted || control.touched) && this.hasError(formControlName)
    );
  }

  hasError(formControlName: string, errorName?: string): boolean {
    const control = this.signUpForm.get(formControlName);
    if (!control) {
      return false;
    }
    if (control.valid || !control.errors) {
      return false;
    }
    if (!errorName) {
      return control.invalid;
    }
    return control.errors[errorName];
  }
}
