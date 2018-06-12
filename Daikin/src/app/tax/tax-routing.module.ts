import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaxComponent }    from './tax/tax.component';


const taxRoutes: Routes = [ 
  { path: '',  component: TaxComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(taxRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TaxRoutingModule { }