import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { GeneralComponent } from './profile/general/general.component';
import { AuthGuardService } from './authentication/auth-guard.service';



const appRoutes: Routes = [  
  { path: '',   redirectTo: '/auth/login', pathMatch: 'full',canActivate:[AuthGuardService] },
  {path:'auth',loadChildren:'app/authentication/auth.module#AuthModule'},
  {
    path: 'general',
    loadChildren: 'app/profile/profile.module#ProfileModule',
    canActivate:[AuthGuardService]
  },
  {
    path: 'bus',
    loadChildren: 'app/bus/bus.module#BusModule',
    canActivate:[AuthGuardService]
  },
  {
    path: 'family',
    loadChildren: 'app/family/family.module#FamilyModule',
    canActivate:[AuthGuardService]
  },
  {
    path: 'benefits',
    loadChildren: 'app/benefits/benefits.module#BenefitsModule',
    canActivate:[AuthGuardService]
  },
  {
    path: 'tax',
    loadChildren: 'app/tax/tax.module#TaxModule',
    canActivate:[AuthGuardService]
  },
  {
    path: 'attendance',
    loadChildren: 'app/attendance/attendance.module#AttendanceModule',
    canActivate:[AuthGuardService]
  }

  // ,{ path: 'general', redirectTo: '/General' },
  // { path: 'General',  component: GeneralComponent,canActivate:[AuthGuardService]},
  // { path: 'bus', redirectTo: '/Bus' },
  // { path: 'Bus',  component: BusComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
        preloadingStrategy: SelectivePreloadingStrategy,
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CanDeactivateGuard,
     SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }