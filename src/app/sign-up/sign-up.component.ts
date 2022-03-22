import { Component, OnInit } from '@angular/core';
import { Account } from '../account';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  account: Account = {
    name: '',
    email: '',
    position: '',
    password: '',
    confirmPassword: '',
  };

  constructor() {}

  ngOnInit(): void {}

  createAccount() {
    console.log('account', this.account);
  }
}
