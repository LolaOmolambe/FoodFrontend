import { NgModule } from '@angular/core';


import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({

  imports: [
    MatPaginatorModule,
    MatDialogModule
  ],

  exports : [
    MatPaginatorModule,
    MatDialogModule
  ]
})

export class AngularMaterialModule
{

}
