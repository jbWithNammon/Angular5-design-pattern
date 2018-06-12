import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusComponent } from './bus/bus.component';
import { BusRoutingModule } from './bus-routing.module'; 
import { BusService } from './bus.service';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { UtilService } from '../shared/util/util.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BusRoutingModule,
    SharedModule
  ],
  declarations: [BusComponent],
  providers: [ BusService,UtilService]
})
export class BusModule { }
