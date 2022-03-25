import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// GLOBAL SERVICE - MUST EXIST ONE INSTANCE ONLY
export class MapService {
  private isGoogleApiLoaded$: Observable<boolean>;

  constructor(private httpClient: HttpClient) {
    this.isGoogleApiLoaded$ = this.httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY_HERE',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  isGoogleApiLoaded(): Observable<boolean> {
    return this.isGoogleApiLoaded$;
  }
}
