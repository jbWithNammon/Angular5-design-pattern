import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyService } from './family.service';
import { FamilyRoutingModule } from './family-routing.module';
import { InformationComponent } from './information/information.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FamilyRoutingModule,
    SharedModule
  ],
  declarations: [InformationComponent],
  providers: [FamilyService]
})
export class FamilyModule { }
