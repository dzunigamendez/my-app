import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Credentials } from './credentials';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://nameless-scrubland-86239.herokuapp.com/api/auth/local';
  userProfile$ = new BehaviorSubject<UserProfile | null>(null);

  constructor(private httpClient: HttpClient) {
    this.loadUserProfile();
  }

  getUserProfile(): Observable<UserProfile | null> {
    return this.userProfile$.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return this.userProfile$.pipe(
      map((userProfile) => {
        if (!userProfile) {
          return false;
        }
        return true;
      })
    );
  }

  getToken(): string | null {
    const userProfile = this.userProfile$.getValue();
    if (userProfile) {
      return userProfile.jwt;
    }
    return null;
  }

  login(credentials: Credentials): Observable<UserProfile> {
    return this.httpClient
      .post<UserProfile>(this.url, credentials)
      .pipe(tap((userProfile) => this.setUserProfile(userProfile)));
  }

  logout() {
    this.unsetUserProfile();
  }

  private setUserProfile(userProfile: UserProfile) {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    this.userProfile$.next(userProfile);
  }

  private unsetUserProfile() {
    localStorage.removeItem('userProfile');
    this.userProfile$.next(null);
  }

  private loadUserProfile() {
    try {
      const userProfileJson = localStorage.getItem('userProfile');
      if (userProfileJson) {
        const userProfile = JSON.parse(userProfileJson);
        this.userProfile$.next(userProfile);
      }
    } catch (error) {
      console.log('Error getting user profile from localStorage', error);
    }
  }
}
