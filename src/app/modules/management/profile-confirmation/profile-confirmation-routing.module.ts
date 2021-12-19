import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileListComponent
  },
  {
    path: ':id',
    component: ProfileUpdateComponent
  }
  
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileConfirmationModuleRoutingModule { }
