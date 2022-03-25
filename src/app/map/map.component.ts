import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  lat?: number;
  lng?: number;

  constructor() {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      this.handleSuccess.bind(this),
      this.handleError.bind(this)
    );
  }

  handleSuccess(position: GeolocationPosition) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  }

  handleError() {}
}
