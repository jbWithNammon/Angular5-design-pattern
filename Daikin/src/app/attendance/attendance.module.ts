import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent }    from './attendance/attendance.component';
import { AttendanceRoutingModule } from './attendance-routing.module'; 
import { AttendanceService } from './attendance.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AttendanceRoutingModule,
    SharedModule
  ],
  declarations: [AttendanceComponent],
  providers: [AttendanceService]
})
export class AttendanceModule { }
