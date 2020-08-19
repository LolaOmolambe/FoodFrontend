import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl + '/user';
import { MatSnackBar } from '@angular/material/snack-bar';
//const GOOGLE_BACKEND_URL = environment.apiUrl + ""

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private userRole: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getRole() {
    return this.userRole;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(
    email: string,
    password: string,
    passwordConfirm: string,
    firstName: string,
    lastName: string
  ) {
    const authData: any = {
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      firstName: firstName,
      lastName: firstName,
    };
    this.http.post(BACKEND_URL + '/signup', authData).subscribe(
      () => {
        this.router.navigate(['login']);
      },
      (error) => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        userRole: string;
      }>(BACKEND_URL + '/login', authData)
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.userRole = response.userRole;
            console.log(this.userRole);
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            console.log(response.token);
            this.saveAuthData(
              token,
              expirationDate,
              this.userId,
              this.userRole
            );
            this.router.navigate(['']);
            //this.router.navigate(["postlist"]);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userRole = authInformation.userRole;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.userRole = null;

    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    userRole: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('cartItems');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userRole: userRole,
    };
  }

  googlelogin(email: string, firstName: string, lastName: string) {
    const authData = { email, firstName, lastName };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        userRole: string;
      }>(BACKEND_URL + '/googlelogin', authData)
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.userRole = response.userRole;
            console.log(this.userRole);
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            console.log(response.token);
            this.saveAuthData(
              token,
              expirationDate,
              this.userId,
              this.userRole
            );
            this.router.navigate(['']);
            //this.router.navigate(["postlist"]);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  changePassword(
    passwordCurrent: string,
    password: string,
    passwordConfirm: string

  ) {
    //let productData: Product | FormData;

     let passwordData = {
      passwordCurrent: passwordCurrent,
      password: password,
      passwordConfirm: passwordConfirm
      }


    //console.log('UPDATE USER ', userData);

    this.http.patch(BACKEND_URL + "/updatepassword", passwordData).subscribe((response) => {
      this.snackBar.open('Password changed sucessfully','', {
        duration: 3000
      });
      this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.userRole = null;

    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['login']);
      //this.logout();
      //this.router.navigate(["/"]);

    });
  }
}
