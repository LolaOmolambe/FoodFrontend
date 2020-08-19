import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/error/error.component';
import { ErrorService } from 'src/error/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog, private errorService: ErrorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occured';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        console.log(error);
        let data = { message: errorMessage, statusText: error.statusText, status: error.status };
        this.errorService.openDialog(data);
        //this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        // this.dialog.c().subscribe(result => {
        //   console.log('The dialog was closed');
        // });
        return throwError(error);
      })
    );
  }
}
