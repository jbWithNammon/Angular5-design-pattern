import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationBefComponent } from './information-bef/information-bef.component';

const benefitsRoutes: Routes = [
//   { path: 'benefits', redirectTo: '/Benefits' },
// { path: 'Benefits',  component: InformationBefComponent}
// ];
{ path: '',  component: InformationBefComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(benefitsRoutes)
  ],
  exports: [RouterModule]
})
export class BenefitsRoutingModule { }
