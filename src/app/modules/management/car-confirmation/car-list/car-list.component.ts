import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { SnackBarService } from 'src/app/core/services/ui/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/services/core.service';
import { HttpConf } from 'src/app/core/http/http.conf';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface PeriodicElement {
  name: string;
  surname: string;
  middleName: string;
  birthDate: string;
  pin: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class CarListComponent implements OnInit {
  columnsToDisplay = ['id', 'name', 'brand', 'manufactureYear', 'model', 'registrationNumber', 'status', '#'];
  expandedElement: PeriodicElement | null | undefined;

  statusList = ['URGENT', 'HIGH', 'NORMAL', 'LOW'];
  dataSource = [];
  customerList: any;

  carFilterForm!: FormGroup;
  tableLoading: boolean = false;
  currentUser = this.authService.getCurrentUser();

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private coreService: CoreService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initCarFilterForm();
    this.getAllCars();

  }

  getAllCars(): void {
    const params = { ...this.carFilterForm.value };

    this.tableLoading = true;

    this.coreService.get(HttpConf.URL.getCars, params)
      .subscribe(res => {
        this.dataSource = res.body?.result?.cars;
        console.log(this.dataSource[0] );

      }, (err: HttpErrorResponse) => {
        this.snackBarService.error(err);
      }).add(() => this.tableLoading = false);
  }

  initCarFilterForm(): void {
    this.carFilterForm = this.formBuilder.group({
      count: [0],
      PageNumber: 1,
      OnlyNotConsidered: [true],
    });

    this.subscribeFilterForm();
  }


  subscribeFilterForm(): void {
    this.carFilterForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.getAllCars();
      });
  }

  openDeleteConfirmDialog(row) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '350px',
      height: 'auto',
      data: {
        id: row.id,
        message: 'Are you sure?',
        delete: (id: number) => this.coreService.delete(HttpConf.URL.getCars + '/' + row.id, row.id)
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(v => !!v)
      )
      .subscribe(() => {
        this.snackBarService.success('Successfully deleted!');
        this.getAllCars();
      });
  }

  statusColor(element, group, id) {
    let data = this.parseCodeToId(element[group].code);

    return data === id;
  }

  parseCodeToId(code) {
    let id;
    switch (code) {
      case '$Awaiting':
        id = 1;
        break;
      case '$Rejected':
        id = 2;
        break
      case '$Approved':
        id = 3;
        break

    }
    return id;
  }

}



