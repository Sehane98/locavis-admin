import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarUpdateComponent } from './car-update/car-update.component';


const routes: Routes = [
  {
    path: '',
    component: CarListComponent
  },
  {
    path: ':id',
    component: CarUpdateComponent
  }
  
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarConfirmationRoutingModule { }
