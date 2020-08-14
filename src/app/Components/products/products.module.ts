import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from "../../angular-material.component";
import {ProductCreateComponent} from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule
({
  declarations: [
    ProductCreateComponent,
    ProductListComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ],
})

export class ProductsModule {

}
