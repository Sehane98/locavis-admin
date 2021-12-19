import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";
import { AuthLayoutComponent } from "./containers/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./containers/main-layout/main-layout.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {ConfirmDeleteComponent} from './components/confirm-delete/confirm-delete.component';
import { MatDialogModule } from "@angular/material/dialog";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../core/interceptors/auth.interceptor";

@NgModule({
  declarations: [
    MainLayoutComponent,
    AuthLayoutComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    },
  ],
})
export class SharedModule { }
