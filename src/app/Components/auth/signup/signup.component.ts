import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  auth2: any;
  @ViewChild('loginRef') loginElement: ElementRef;
  isLoading = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.googleSDK();
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

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      form.value.email,
      form.value.password,
      form.value.passwordConfirm,
      form.value.firstName,
      form.value.lastName
    );
  }
}
