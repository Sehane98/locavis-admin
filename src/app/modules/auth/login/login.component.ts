import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authority } from 'src/app/core/enums/authority.enum';
import { HttpConf } from 'src/app/core/http/http.conf';
import { CoreService } from 'src/app/core/services/core.service';
import { SnackBarService } from 'src/app/core/services/ui/snack-bar.service';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginLoading = false;

  constructor(
    private authService: AuthService, 
    private coreService: CoreService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private uiService: UiService
) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  checkEmailOrPhone(): void {
    if (this.loginForm.get('username')?.value.includes('@')) {
      this.loginForm.get('username')?.setValidators(Validators.email)
    } else {
      this.loginForm.get('username')?.clearValidators();
    }
    this.loginForm.get('username')?.setValidators(Validators.required);
    this.loginForm.get('username')?.updateValueAndValidity();

  }

  submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const body = this.loginForm.value;

    if(body.username.includes('@')) {
      body['email'] = body.username;
    } else {
      body['phone'] = body.username;
    }
    console.log(body);
    delete body.username;


    this.loginForm.disable();
    this.loginLoading = true;


    this.authService.login(body)
    .subscribe(res => {
      this.authService.setDeliveryAuthData(res.result.model.token);
      this.authService.setToken(res.result.model.token);
      this.authService.setCurrentUser(res.result.model.userId);
      this.checkAuthoritiesAndRedirect();
    }, err => {
      this.snackBarService.error(err);
      this.loginForm.enable();
      this.loginLoading = false;
    });

  }

   checkAuthoritiesAndRedirect(): void {
    const auth = this.authService.getAuthorities();
    let route = '/';

    if (auth.role === Authority.ROLE_CUSTOMER ) {
      route += 'task';
    }

    this.uiService.routeWithDelay([route], 'Daxil oldunuz');
  }

}
