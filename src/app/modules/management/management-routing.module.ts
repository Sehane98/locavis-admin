import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile'
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile-confirmation/profile-confirmation.module').then(m => m.ProfileConfirmationModule),
    data: {
      title: 'Profile'
    }
  },
  {
    path: 'car',
    loadChildren: () => import('./car-confirmation/car-confirmation.module').then(m => m.CarConfirmationModule),
    data: {
      title: 'Car'
    }
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    data: {
      title: 'users'
    }
  }
  
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
