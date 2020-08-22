import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { User } from './user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

const BACKEND_URL = environment.apiUrl + '/users/';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: User[] = [];
  private usersUpdated = new Subject<{
    users: User[];
    userCount: number;
  }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'notif-success',
    });
  }

  getUsers(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; users: any; maxUsers: number }>(
        BACKEND_URL + 'getallusers' + queryParams
      )
      .pipe(
        map((userData) => {
          return {
            users: userData.users.map((user) => {
              return {
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id,
                email: user.email,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              };
            }),
            maxUsers: userData.maxUsers,
          };
        })
      )
      .subscribe((transformedPostData) => {
        this.users = transformedPostData.users;
        this.usersUpdated.next({
          users: [...this.users],
          userCount: transformedPostData.maxUsers,
        });
      });
  }

  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUser() {
    return this.http.get<{
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      address: string;
      state: string;
      country: string;
    }>(BACKEND_URL);
  }

  updateUser(
    firstName: string,
    lastName: string,
    address: string,
    phonenumber: string
  ) {
    let userData = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phonenumber,
    };

    this.http
      .patch(BACKEND_URL + 'updateMe', userData)
      .subscribe((response) => {
        location.reload();
        //this.router.navigate(['/']);
        this.openSnackBar('User Details Updated');
      });
  }

  deleteUser(userId: string) {
    return this.http.get(BACKEND_URL + 'deactivateuser/' + userId);
  }
  reactivateUser(userId: string) {
    return this.http.get(BACKEND_URL + 'reactivateuser/' + userId);
  }

  contactUsFunction(
    name: string,
    email: string,
    subject: string,
    message: string
  ) {
    let emailBody = {
      name,
      email,
      subject,
      message,
    };

    this.http.post(BACKEND_URL + 'contact', emailBody).subscribe((response) => {
      this.openSnackBar('Email sent successfully');
      location.reload();
      //this.ngZone.run(() => this.router.navigate(['/contact'])).then();
      //this.router.navigate(['/contact']);
    });
  }
}
