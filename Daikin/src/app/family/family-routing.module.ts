import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationComponent } from './information/information.component';

const familyRoutes: Routes = [  
{ path: '',  component: InformationComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(familyRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FamilyRoutingModule { }
