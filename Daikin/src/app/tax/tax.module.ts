import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxComponent }    from './tax/tax.component';
import { TaxRoutingModule } from './tax-routing.module'; 
import { TaxService } from './tax.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TaxRoutingModule,
    SharedModule
  ],
  declarations: [TaxComponent],
  providers: [TaxService]
})
export class TaxModule { }
