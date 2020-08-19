import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/error/error.component';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errorListener = new Subject<string>();

  getErrorListener() {
    return this.errorListener.asObservable();
  }

  throwError(message: string) {
    this.errorListener.next(message);
  }

  handleError() {
    this.errorListener.next(null);
  }
  public isDialogOpen: Boolean = false;
  constructor(public dialog: MatDialog, private router: Router) {}
  openDialog(data): any {
    if (this.isDialogOpen) {
      return false;
    }
    this.isDialogOpen = true;
    //this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '300px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.isDialogOpen = false;
      console.log("data " , data);

      if(data.statusText == "Unauthorized") {
        console.log("here");
        this.router.navigate(['/login']);
      }
      let animal;
      animal = result;
    });
  }
}
