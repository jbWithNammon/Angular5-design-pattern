import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralComponent } from './general/general.component';
import { AuthGuardService } from '../authentication/auth-guard.service';


const profileRoutes: Routes = [
//   { path: 'general', redirectTo: '/General' },
// { path: 'General',  component: GeneralComponent,canActivate:[AuthGuardService]}
    { path: '',  component: GeneralComponent}
    ];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }