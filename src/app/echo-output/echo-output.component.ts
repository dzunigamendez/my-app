import { Component, OnInit } from '@angular/core';
import { EchoService } from '../echo.service';

@Component({
  selector: 'app-echo-output',
  templateUrl: './echo-output.component.html',
  styleUrls: ['./echo-output.component.css'],
})
export class EchoOutputComponent implements OnInit {
  constructor(public echoService: EchoService) {}

  ngOnInit(): void {}
}
