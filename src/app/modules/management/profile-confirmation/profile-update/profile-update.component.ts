import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpConf } from 'src/app/core/http/http.conf';
import { CoreService } from 'src/app/core/services/core.service';
import { SnackBarService } from 'src/app/core/services/ui/snack-bar.service';
import { ConfirmDataComponent } from 'src/app/shared/components/confirm-data/confirm-data.component';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('90deg', style({ transform: 'rotate(-90deg)' })),
      state('180deg', style({ transform: 'rotate(180deg)' })),
      state('270deg', style({ transform: 'rotate(-270deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in')),
    ]),
  ],
})
export class ProfileUpdateComponent implements OnInit {
  state: string = 'default';
  driverLicenseBack: string = 'default';
  driverLicenseFront: string = 'default';
  avatar: string = 'default';
  passport: string = 'default';
  idCardBack: string = 'default';
  idCardFront: string = 'default';

  rotateImg(url) {
    switch (this[url]) {
      case 'default':
        this[url] = '90deg';
        break;
      case '90deg':
        this[url] = '180deg';
        break;
      case '180deg':
        this[url] = '270deg';
        break;
      case '270deg':
        this[url] = 'default';
        break;
    }
    console.log(url)
  }

  profileId = this.getProfileId();
  data: any;

  profileFilterForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initProfileFilterForm();
  }

  initProfileFilterForm(): void {
    this.profileFilterForm = this.formBuilder.group({
      personId: [this.profileId],
      avatarConfirmation: this.formBuilder.group({
        confirmationStatusId: [1],
        description: [null],
      }),
      driverLicenseConfirmation: this.formBuilder.group({
        confirmationStatusId: [1],
        description: [null],
      }),
      passportConfirmation: this.formBuilder.group({
        confirmationStatusId: [1],
        description: [null],
      }),
      idCardConfirmation: this.formBuilder.group({
        confirmationStatusId: [1],
        description: [null],
      }),
    });

    this.getProfileById();
  }

  getProfileById(): void {
    this.data = null;
    const params = { personId: this.profileId };
    this.coreService.get(HttpConf.URL.getProfile, params).subscribe(
      (res) => {
        console.log(res.body?.result.person);
        this.data = res.body?.result.person;
        this.setProfileFilterForm();
      },
      (err: HttpErrorResponse) => {
        this.snackBarService.error(err);
      }
    );
  }

  setProfileFilterForm(): void {
    (this.profileFilterForm.get('avatarConfirmation') as FormGroup).patchValue({
      confirmationStatusId: this.parseCodeToId(
        this.data?.avatarConfirmationStatus?.code
      ),
      description: this.data?.avatarConfirmationStatus?.description,
    });
    (
      this.profileFilterForm.get('passportConfirmation') as FormGroup
    ).patchValue({
      confirmationStatusId: this.parseCodeToId(
        this.data?.passportConfirmationStatus?.code
      ),
      description: this.data?.passportConfirmationStatus?.description,
    });
    (this.profileFilterForm.get('idCardConfirmation') as FormGroup).patchValue({
      confirmationStatusId: this.parseCodeToId(
        this.data?.idCardConfirmationStatus?.code
      ),
      description: this.data?.idCardConfirmationStatus?.description,
    });
    (
      this.profileFilterForm.get('driverLicenseConfirmation') as FormGroup
    ).patchValue({
      confirmationStatusId: this.parseCodeToId(
        this.data?.driverLicenseConfirmationStatus?.code
      ),
      description: this.data?.driverLicenseConfirmationStatus?.description,
    });
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

  getProfileId(): number {
    return Number(this.route.snapshot.params.id);
  }

  saveDataDialog() {
    this.profileFilterForm.disable();
    const params = this.profileFilterForm.value;

    const dialogRef = this.dialog.open(ConfirmDataComponent, {
      width: '350px',
      data: {
        message: 'Məlumatların doğruluğuna əminsiniz?',
        text: 'Yadda saxla',
        confirm: (id: number) =>
          this.coreService.post(HttpConf.URL.editProfile, params),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter((v) => !!v))
      .subscribe(() => {
        this.getProfileById();
        this.snackBarService.success('Təsdiq olundu');
      })
      .add((v) => this.profileFilterForm.enable());
  }

  rejectOrConfirmData(rejectGroup: string, id: number): void {
    (this.profileFilterForm.get(rejectGroup) as FormGroup).patchValue({
      confirmationStatusId: id,
    });
    console.log(id, rejectGroup, this.profileFilterForm.value);
  }

  isSuccess(group, id) {
    let data = (this.profileFilterForm.get(group) as FormGroup).value
      .confirmationStatusId;

    return data === id;
  }
}
