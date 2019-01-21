import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var device;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public InputFromFooter: any = "";
  title = 'app';
  hideNav = false;

  constructor(private route: Router) { }

  ngOnInit() {
    document.addEventListener("deviceready", function () {
      console.log(device);
    }, false);

    document.addEventListener('resume', function () {
      console.log(device);
    }, false);
  }
}
