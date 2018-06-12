import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceComponent }    from './attendance/attendance.component';


const attendanceRoutes: Routes = [
/*   { path: 'attendance', redirectTo: '/Attendance' },
  { path: 'Attendance',  component: AttendanceComponent} */
  { path: '',  component: AttendanceComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(attendanceRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AttendanceRoutingModule { }