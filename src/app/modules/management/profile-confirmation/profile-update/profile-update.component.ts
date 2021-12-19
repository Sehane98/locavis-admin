import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpConf } from 'src/app/core/http/http.conf';
import { CoreService } from 'src/app/core/services/core.service';
import { SnackBarService } from 'src/app/core/services/ui/snack-bar.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  profileId = this.getProfileId();
  data: any;

  profileFilterForm: FormGroup | any;

  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getProfileById();
  }

  initProfileFilterForm(): void {
    this.profileFilterForm = this.formBuilder.group({
      personId: [this.profileId],
      avatarConfirmation: this.formBuilder.group({
        confirmationStatusId: [null],
        description: [null]
      }),
      driverLicenseConfirmation: this.formBuilder.group({
        confirmationStatusId: [null],
        description: [null]
      }),
      passportConfirmation: this.formBuilder.group({
        confirmationStatusId: [null],
        description: [null]
      }),
      idCardConfirmation: this.formBuilder.group({
        confirmationStatusId: [null],
        description: [null]
      })      
    });

  }

  getProfileById(): void {
    const params = { personId: this.profileId }
    this.coreService.get(HttpConf.URL.profile, params)
      .subscribe(res => {
        console.log(res.body?.result.person);
        this.data = res.body?.result.person;
      }, (err: HttpErrorResponse) => {
        this.snackBarService.error(err);
      });
  }

  getProfileId(): number {
    return Number(this.route.snapshot.params.id);
  }


}
