import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AttendanceService } from '../attendance.service';
import { IAttendance } from '../../models/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MessageResource } from '../../shared/resources/message.resource';
var parseString = require('xml2js').parseString;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  atdThisMonth:IAttendance[];
  atdMonthAgo:IAttendance[];
  atdTwoMonthAgo:IAttendance[];
  atdNextMonth:IAttendance[];
  atdShowOn:IAttendance[];

  adjusment:number;

  constructor(private route: ActivatedRoute, private router: Router, private service: AttendanceService,public message: MessageResource) { }

  ngOnInit() {
    this.showThisMonth();
  }
  showMonthAgo(){
    this.adjusment = this.adjusment-1;
    this.getAtdData(this.adjusment);
  }
  showThisMonth(){
    this.adjusment = 0;
    this.getAtdData(this.adjusment);
  }
  showNextMonth(){
    this.adjusment = this.adjusment+1;
    this.getAtdData(this.adjusment);
  }

  getAtdData(getAdjusment){
    let self = this;
    this.service.getAttendance(getAdjusment.toString()).subscribe(res =>{ 
      parseString(res, function (err, result) {
      if(result != null){
       self.atdShowOn = result["ArrayOfAttendanceItem"]["AttendanceItem"];
      }
   });
   }, err => {
      console.log('err',err);
    });
  }
}
