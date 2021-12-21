import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ProfileConfirmationModuleRoutingModule } from './profile-confirmation-routing.module';
import { ConfirmDataComponent } from 'src/app/shared/components/confirm-data/confirm-data.component';



@NgModule({
  declarations: [
    ProfileListComponent,
    ProfileUpdateComponent
  ],
  imports: [
    CommonModule,
    ProfileConfirmationModuleRoutingModule,
    DragDropModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  entryComponents: [
    ConfirmDataComponent
  ]
})
export class ProfileConfirmationModule { }
