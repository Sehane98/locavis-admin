import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private action = 'Close';
  private duration = 2000;

  constructor(private snackBar: MatSnackBar,
    ) { }

  success(message: any, action = this.action, duration = this.duration): void {
    this.snackBar.open(message, action, {
      duration,
      panelClass: 'snacbkar-ui-success'
    });
  }

  error(err: string | HttpErrorResponse, action = this.action, duration = this.duration): void {
    let msg;
    if (err instanceof HttpErrorResponse) {
      if (err.error.title) {
        msg = err.error.title;
      } else {
        msg = err.error.message || err.error.detail || '';
      }
    } else {
      msg = err;
    }

    this.snackBar.open(msg, action, {
      duration,
      panelClass: 'snacbkar-ui-error'
    });
  }

  info(message: string, action = this.action, duration = this.duration): void {
    this.snackBar.open(message, action, {
      duration,
      panelClass: 'snacbkar-ui-info'
    });
  }

  warning(message: string, action = this.action, duration = this.duration): void {
    this.snackBar.open(message, action, {
      duration,
      panelClass: 'snacbkar-ui-warning'
    });
  }



}
