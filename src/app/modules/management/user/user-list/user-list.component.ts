import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { HttpConf } from 'src/app/core/http/http.conf';
import { AuthService } from 'src/app/core/services/auth.service';
import { CoreService } from 'src/app/core/services/core.service';
import { SnackBarService } from 'src/app/core/services/ui/snack-bar.service';
import { ConfirmDataComponent } from 'src/app/shared/components/confirm-data/confirm-data.component';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  columnsToDisplay = [
    'id',
    'name',
    'surname',
    'middleName',
    'pin',
    'phone',
    'email',
    'status',
    '#',
  ];

  dataSource = new MatTableDataSource<any>([]);

  customerList: any;

  userFilterForm!: FormGroup;
  tableLoading: boolean = false;

  // pagination
  length!: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private coreService: CoreService
  ) {
  }

  ngOnInit() {
    this.initUserFilterForm();
    this.getAllUsers();
  }

  getAllUsers(): void {
    const params = { ...this.userFilterForm.value };

    this.tableLoading = true;

    this.coreService
      .get(HttpConf.URL.getUsers, params)
      .subscribe(
        (res) => {
          this.dataSource = new MatTableDataSource(res.body?.result?.users);
          this.length = res.body?.result?.pagination?.totalCount;
        },
        (err: HttpErrorResponse) => {
          this.snackBarService.error(err);
        }
      )
      .add(() => (this.tableLoading = false));
  }

  initUserFilterForm(): void {
    this.userFilterForm = this.formBuilder.group({
      count: [0],
      IsLocked: [null],
      IsSuspended: [null],
      name: [null],
      surname: [null],
      pin: [null],
      middleName: [null],
      PageNumber: [1],
      PageSize: [15]
    });

    this.subscribeFilterForm();
  }

  subscribeFilterForm(): void {
    this.userFilterForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.userFilterForm.get('PageNumber')?.setValue(1, { emitEvent: false });
        this.getAllUsers();
      });
  }

  onChangePage(e) {
    this.userFilterForm.get('PageNumber')?.setValue(e.pageIndex + 1, { emitEvent: false });
    this.userFilterForm.get('PageSize')?.setValue(e.pageSize, { emitEvent: false });
    this.getAllUsers();
  }

  changeUserActivity(element, action) {
    const params = { userId: element.id };
    let url;
    let message;
    let successText;

    switch (action) {
      case 'unlock':
        url = HttpConf.USER + '/Unlock';
        message = 'İstifadəçini blokdan çıxarmaq istəyirisiz?';
        successText = 'İstifadəçi blokdan çıxarıldı';
        break;
      case 'suspend':
        url = HttpConf.USER + '/Suspend';
        message = 'İstifadəçini birdəfəlik bloklamaq istəyirisiz?';
        successText = 'İstifadəçi birdəfəlik bloklandı';
        break;
    }

    const dialogRef = this.dialog.open(ConfirmDataComponent, {
      width: '350px',
      data: {
        data: element,
        message: message,
        text: 'Yadda saxla',
        confirm: (date: any) => this.coreService.post(url, {}, params),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((v) => !!v))
      .subscribe(() => {
        this.getAllUsers();
        this.snackBarService.success(successText);
      });
  }

  lockUser(element, action) {
    const body = { userId: element.id };

    let url = HttpConf.USER + '/Lock';
    let message = 'İstifadəçini müvəqqəti bloklamaq istəyirisiz?';
    let successText = 'İstifadəçi müvəqqəti bloklandı';
    let isLock = true;

    const dialogRef = this.dialog.open(ConfirmDataComponent, {
      width: '350px',
      data: {
        data: element,
        message: message,
        isLock: isLock,
        text: 'Yadda saxla',
        confirm: (lockedToTime: any) => this.coreService.post(url, {...body, lockedToTime})
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((v) => !!v))
      .subscribe(() => {
        this.getAllUsers();
        this.snackBarService.success(successText);
      });
  }

  openDeleteConfirmDialog(row) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '350px',
      height: 'auto',
      data: {
        id: row.id,
        message: 'Are you sure?',
        delete: (id: number) =>
          this.coreService.delete(HttpConf.URL.getUsers + '/' + row.id, row.id),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((v) => !!v))
      .subscribe(() => {
        this.snackBarService.success('Successfully deleted!');
        this.getAllUsers();
      });
  }

  statusColor(element, group, id) {
    let data = this.parseCodeToId(element[group]?.code);

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
        break;
      case '$Approved':
        id = 3;
        break;
    }
    return id;
  }
}
