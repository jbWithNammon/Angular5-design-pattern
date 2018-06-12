import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BenefitsRoutingModule  } from './benefits-routing.module';
import { BenefitsService } from './benefits.service';
import { InformationBefComponent } from './information-bef/information-bef.component';

@NgModule({
  imports: [
    CommonModule,
    BenefitsRoutingModule,
    FormsModule
  ],
  declarations: [InformationBefComponent],
  providers: [BenefitsService]
})
export class BenefitsModule { }
