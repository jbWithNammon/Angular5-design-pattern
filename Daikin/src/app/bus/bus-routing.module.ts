import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusComponent }    from './bus/bus.component';


const busRoutes: Routes = [
  // { path: '', redirectTo: '/Bus' },
  { path: '',  component: BusComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(busRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BusRoutingModule { }