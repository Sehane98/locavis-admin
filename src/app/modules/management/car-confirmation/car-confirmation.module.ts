import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarConfirmationRoutingModule } from './car-confirmation-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CarListComponent } from './car-list/car-list.component';
import { CarUpdateComponent } from './car-update/car-update.component';
import { ConfirmDataComponent } from 'src/app/shared/components/confirm-data/confirm-data.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [CarListComponent, CarUpdateComponent],
  imports: [
    CommonModule,
    CarConfirmationRoutingModule,
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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatBadgeModule,
  ],
  entryComponents: [ConfirmDataComponent],
})
export class CarConfirmationModule {}
