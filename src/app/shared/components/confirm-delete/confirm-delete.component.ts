import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackBarService} from '../../../core/services/ui/snack-bar.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
              private snackBarService: SnackBarService,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.loading = true;

    this.data.delete(this.data.id)
      .subscribe(() => {
        this.dialogRef.close(true);
      }, (err: HttpErrorResponse) => {
        this.snackBarService.error(err);
        this.loading = false;
      });
  }

}
