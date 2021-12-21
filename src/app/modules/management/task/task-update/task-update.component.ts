import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpConf } from 'src/app/core/http/http.conf';
import { AuthService } from 'src/app/core/services/auth.service';
import { CoreService } from 'src/app/core/services/core.service';
import { SnackBarService } from 'src/app/core/services/ui/snack-bar.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {
  statusList = ['URGENT', 'HIGH', 'NORMAL', 'LOW'];
  taskUpInitForm!: FormGroup;
  customerList;

  loading: boolean = false;
  currentUser = this.authService.getCurrentUser();

  constructor(
    public dialogRef: MatDialogRef<TaskUpdateComponent>,
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private snackBarService: SnackBarService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void { 
    this.initTaskUpInitForm();
    this.getAllCustomers();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
}
  
  initTaskUpInitForm(): void {
    this.taskUpInitForm = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      deadline: [null, [Validators.required]],
      customer: [null, [Validators.required]],
      status: [null, [Validators.required]],
      userId: [this.currentUser.id],
    });

    if(this.data) {
      this.setTaskUpInitForm();
    }

  }

  setTaskUpInitForm(): void { 
    this.taskUpInitForm.patchValue({
      id: this.data.id,
      title: this.data.title,
      description: this.data.description,
      deadline: this.data.deadline,
      customer: this.data.customer,
      status: this.data.status
    })
  }

  getAllCustomers(): void {
    this.coreService.get(HttpConf.URL.customers)
      .subscribe(res => {
        this.customerList = res.body;
      }, (err: HttpErrorResponse) => {
        this.snackBarService.error(err);
      });
  }


  submit(): void {
    this.taskUpInitForm.disable();
    this.loading = true;

    const body = {
      ...this.data,
      ...this.taskUpInitForm.value
    };

    if (this.data) {
      this.updateTask(body);
    } else {
      this.createTask(body);
    }
  }

  createTask(body): void {
    delete body.id;

    this.coreService.post(HttpConf.URL.tasks, body)
      .subscribe(() => {
        this.dialogRef.close({ created: true });
      }, (err: HttpErrorResponse) => {
        this.snackBarService.error(err);
        this.taskUpInitForm.enable();
        this.loading = false;
      });
  }

  updateTask(body): void {
    this.coreService.put(HttpConf.URL.tasks + '/' + this.data.id, body)
      .subscribe(() => {
        this.dialogRef.close({ created: false });
      }, (err: HttpErrorResponse) => {
        this.snackBarService.error(err);
        this.taskUpInitForm.enable();
        this.loading = false;
      });
  }

}
