import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  auth2: any;
  @ViewChild('loginRef') loginElement: ElementRef;
  isLoading = false;
  // public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  // public authInstance: gapi.auth2.GoogleAuth;
  // public error: string;
  // public user: gapi.auth2.GoogleUser;

  constructor(public authService: AuthService) {}
  ngOnInit() {
    //console.log("ngoninit");
    this.googleSDK();
    //throw new Error('Method not implemented.');
  }


  prepareLoginButton() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        let email = profile.getEmail();
        let firstname = profile.getName().split(" ")[0];
        let lastname = profile.getName().split(" ")[1];
        console.log(email, firstname, lastname);
        //YOUR CODE HERE
        this.isLoading = true;
        this.authService.googlelogin(email, firstname, lastname);


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }
  googleSDK() {

    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '883872228778-7rvp4fu46oif20g212bjvd131k44e5b1.apps.googleusercontent.com',
          // cookie_policy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
    //console.log("first google");

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
    //console.log("second google");

  }




  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  googleLogin() {
    //this.authService.googlelogin();
  }

  // async initGoogleAuth(): Promise<void> {
  //   //  Create a new Promise where the resolve function is the callback
  //   // passed to gapi.load
  //   const pload = new Promise((resolve) => {
  //     gapi.load('auth2', resolve);
  //   });

  //   // When the first promise resolves, it means we have gapi loaded
  //   // and that we can call gapi.init
  //   return pload.then(async () => {
  //     await gapi.auth2
  //       .init({ client_id: 'YOUR_GOOGLE_KEY' })
  //       .then(auth => {
  //         this.gapiSetup = true;
  //         this.authInstance = auth;
  //       });
  //   });
  // }

  // async authenticate(): Promise<gapi.auth2.GoogleUser> {
  //   // Initialize gapi if not done yet
  //   if (!this.gapiSetup) {
  //     await this.initGoogleAuth();
  //   }

  //   // Resolve or reject signin Promise
  //   return new Promise(async () => {
  //     await this.authInstance.signIn().then(
  //       user => this.user = user,
  //       error => this.error = error);
  //   });
  // }

  // async checkIfUserAuthenticated(): Promise<boolean> {
  //   // Initialize gapi if not done yet
  //   if (!this.gapiSetup) {
  //     await this.initGoogleAuth();
  //   }

  //   return this.authInstance.isSignedIn.get();
  // }
}
