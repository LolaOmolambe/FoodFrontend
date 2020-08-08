import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as AOS from 'aos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'foodclient';
  constructor(private router: Router) {}

  ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'slide'
    });
  }



}

