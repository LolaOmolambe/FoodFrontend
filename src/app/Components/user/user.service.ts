import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { User } from './user.model';

const BACKEND_URL = environment.apiUrl + '/users/';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: User[] = [];
  private usersUpdated = new Subject<{
    users: User[];
    userCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; users: any; maxUsers: number }>(
        BACKEND_URL + "getallusers" + queryParams
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

  // getProduct(id: string) {
  //   return this.http.get<{
  //     _id: string;
  //     name: string;
  //     description: string;
  //     imagePath: string;
  //     genre: string;
  //     price: number;
  //   }>(BACKEND_URL + id);
  // }

  // updateProduct(
  //   id: string,
  //   title: string,
  //   description: string,
  //   genre: string,
  //   price: number,
  //   image: File | string
  // ) {
  //   let productData: Product | FormData;
  //   if (typeof image === 'object') {
  //     productData = new FormData();
  //     productData.append('id', id);
  //     productData.append('title', title);
  //     productData.append('description', description);
  //     productData.append('genre', genre);
  //     productData.append('price', price.toString());
  //     productData.append('image', image, title);
  //   }
  //   else {
  //     productData = {
  //       id: id,
  //       title: title,
  //       description: description,
  //       genre: genre,
  //       price: price,
  //       imagePath: image,
  //     }
  //   }

  //   console.log(productData);

  //   this.http.put(BACKEND_URL + id, productData).subscribe((response) => {
  //     this.router.navigate(["/"]);
  //   });
  // }

   deleteUser(userId: string) {
     //console.log(userId);
     return this.http.get(BACKEND_URL + "deactivateuser/" + userId);
   }
   reactivateUser(userId: string) {
    //console.log(userId);
    return this.http.get(BACKEND_URL + "reactivateuser/" + userId);
  }

   

}
