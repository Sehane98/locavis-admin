import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/core/services/ui/snack-bar.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-confirm-data',
  templateUrl: './confirm-data.component.html',
  styleUrls: ['./confirm-data.component.scss']
})
export class ConfirmDataComponent implements OnInit {

  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
              private snackBarService: SnackBarService,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.loading = true;

    this.data.confirm(this.data.id)
      .subscribe(() => {
        this.dialogRef.close(true);
      }, (err: HttpErrorResponse) => {
        this.snackBarService.error(err);
        this.loading = false;
      });
  }
}
