import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AngularMaterialModule} from '../../angular-material.component';

import { UserListComponent } from './user-list/user-list.component';

@NgModule
({
  declarations: [
    UserListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ],
})

export class UsersModule {

}
