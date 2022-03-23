import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url =
    'https://nameless-scrubland-86239.herokuapp.com/api/auth/local/register';

  constructor(private httpClient: HttpClient) {}

  isUsernameUnique(_username: string): Observable<boolean> {
    return of(true).pipe(delay(2000));
  }

  register(account: Account): Observable<any> {
    return this.httpClient.post(this.url, account);
  }
}
