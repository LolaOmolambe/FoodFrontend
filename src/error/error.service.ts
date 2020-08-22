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
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '300px',
      data: data,
      panelClass: 'custom-modalbox',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isDialogOpen = false;

      // if (data.statusText == 'Unauthorized') {
      //   this.router.navigate(['/login']);
      // }
    });
  }
}
