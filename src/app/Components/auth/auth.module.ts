import { NgModule } from '@angular/core';

import { LoginComponent } from "./login/login.component";
//import { SignupComponent } from "./signup/signup.component";

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})

export class AuthModule {



}
