import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpConf } from 'src/app/core/http/http.conf';
import { CoreService } from 'src/app/core/services/core.service';
import { SnackBarService } from 'src/app/core/services/ui/snack-bar.service';
import { ConfirmDataComponent } from 'src/app/shared/components/confirm-data/confirm-data.component';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.scss']
})
export class CarUpdateComponent implements OnInit {
  carId = this.getCarId();
  data: any;
  colorList: any;

  carFilterForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initCarFilterForm();
  }

  initCarFilterForm(): void {
    this.carFilterForm = this.formBuilder.group({
      carId: [this.carId],
      colorId: [null, [Validators.required]],
      mainInfoConfirmation: this.formBuilder.group({
        confirmationStatusId: [1],
        description: [null],
      }),
      imagesConfirmation: this.formBuilder.group({
        confirmationStatusId: [1],
        description: [null],
      })
    });

    this.getCarById();
  }

  getCarById(): void {
    this.data = null;
    const params = { carId: this.carId };
    this.coreService.get(HttpConf.URL.getCar, params).subscribe(
      (res) => {
        this.data = res.body?.result;
        this.getColorList();
        this.setCarFilterForm();
      },
      (err: HttpErrorResponse) => {
        this.snackBarService.error(err);
      }
    );
  }

  setCarFilterForm(): void {
    // this.carFilterForm.get('colorId')?.setValue(this.data?.mainInfo?.)
    (this.carFilterForm.get('imagesConfirmation') as FormGroup).patchValue({
      confirmationStatusId: this.parseCodeToId(this.data?.imagesConfirmationStatus?.code),
      description: this.data?.imagesConfirmationStatus?.description,
    });
    (this.carFilterForm.get('mainInfoConfirmation') as FormGroup).patchValue({
      confirmationStatusId: this.parseCodeToId(this.data?.mainInfoConfirmationStatus?.code),
      description: this.data?.mainInfoConfirmationStatus?.description,
    });    
    console.log(this.carFilterForm.value);
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

  getColorList(): void {
    this.coreService.get(HttpConf.URL.getColorList).subscribe(
      (res) => {
        console.log(res.body?.result);
        this.colorList = res.body?.result?.dictionary;
        this.setCarFilterForm();
      },
      (err: HttpErrorResponse) => {
        this.snackBarService.error(err);
      }
    );
  }

  getCarId(): number {
    return Number(this.route.snapshot.params.id);
  }

  saveDataDialog() {
    this.carFilterForm.disable();
    const params = this.carFilterForm.value;

    const dialogRef = this.dialog.open(ConfirmDataComponent, {
      width: '350px',
      data: {
        message: 'Məlumatların doğruluğuna əminsiniz?',
        text: 'Yadda saxla',
        confirm: (id: number) =>
          this.coreService.post(HttpConf.URL.editCar, params),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((v) => !!v))
      .subscribe(() => {
        this.getCarById();
        this.snackBarService.success('Təsdiq olundu');        
      }).add(v => this.carFilterForm.enable());
  }

  rejectOrConfirmData(rejectGroup: string, id: number): void {
    (this.carFilterForm.get(rejectGroup) as FormGroup).patchValue({
      confirmationStatusId: id,
    }); console.log(id, rejectGroup, this.carFilterForm.value)
  }


  isSuccess(group, id) {
    let data = (this.carFilterForm.get(group) as FormGroup).value.confirmationStatusId;

    return data === id;
  }

}
