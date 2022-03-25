import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  isApiLoaded$: Observable<boolean>;
  center?: google.maps.LatLngLiteral;
  zoom = 8;

  constructor(mapService: MapService) {
    this.isApiLoaded$ = mapService.isGoogleApiLoaded();
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      this.handleSuccess.bind(this),
      this.handleError.bind(this)
    );
  }

  handleSuccess(position: GeolocationPosition) {
    this.center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  }

  handleError() {}
}
