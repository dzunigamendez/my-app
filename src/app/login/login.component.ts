import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Credentials } from '../credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isBadRequest = false;
  formSubmitted = false;
  formGroup = new FormGroup({
    identifier: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    if (this.formGroup.valid) {
      const credentials: Credentials = this.formGroup.value;
      this.authService.login(credentials).subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        () => {
          this.isBadRequest = true;
        }
      );
    }
    this.formSubmitted = true;
  }

  showError(formControlName: string): boolean {
    const control = this.formGroup.get(formControlName);
    if (!control) {
      return false;
    }
    return (this.formSubmitted || control.touched) && control.invalid;
  }
}
