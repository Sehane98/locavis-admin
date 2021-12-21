import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskRoutingModule } from './task-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [
        TaskListComponent,
        TaskUpdateComponent
    ],
    imports: [
        CommonModule,
        TaskRoutingModule,
        DragDropModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatIconModule
    ]
})
export class TaskModule { }
