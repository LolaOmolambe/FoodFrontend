import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  auth2: any;
  @ViewChild('loginRef') loginElement: ElementRef;
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService, private ngZone: NgZone, private router: Router) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    //this.googleSDK();
    this.ngZone.run(() => this.googleSDK());

  }

  prepareLoginButton() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        let email = profile.getEmail();
        let firstname = profile.getName().split(" ")[0];
        let lastname = profile.getName().split(" ")[1];
        //YOUR CODE HERE
        this.isLoading = true;
        this.authService.googlelogin(email, firstname, lastname);
        this.ngZone.run(() => this.router.navigate(['/home'])).then();

      }, (error) => {
        this.ngZone.run(() => this.router.navigate(['/login'])).then();
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
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
