import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BusService } from '../bus.service';
import { IBus, IBusHis, IBusList,IBusStopList,IBusEdit } from '../../models/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MessageResource } from '../../shared/resources/message.resource';
import { UtilService } from '../../shared/util/util.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogComponent } from '../../shared/Modal/dialog/dialog.component';
var parseString = require('xml2js').parseString;

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  bus:IBus[];
  busHis:IBusHis[];
  busNumberList:IBusList[];
  busStopList:IBusStopList[];
  busEdit:IBusEdit;
  busCurrent:string;
  busSelected:IBusList[];
  isBus:boolean;
  isBusHis:boolean;
  isEdit:boolean;
  isNoBusStop:boolean;
  animal: string;
  name: string;

  constructor(private route: ActivatedRoute, private router: Router, private service: BusService,public message: MessageResource
  ,private util:UtilService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getBus();
    this.isNoBusStop = true;
  }
  getBus() {
    this.isBus = true;
    this.isBusHis = false;
    this.isEdit = false;
    let self = this;
    this.service.getBus().subscribe(res =>{ 
      parseString(res, function (err, result) {
        if(result != null){
          self.bus = result["ArrayOfBusItem"]["BusItem"];
          self.setBusCodeSplit();
         }
      });
   }, err => {
      console.log('err',err);
    });

    this.service.getBusNumberList().subscribe(
        res =>{ 
      parseString(res, function (err, result) {
       self.busNumberList = result["ArrayOfBusItem"]["BusItem"];
   });
   }
    , err => {
      console.log('err',err);
    });
  }

  showHis() {
    let self = this;
  this.service.getBusHis().subscribe(res =>{ 
    parseString(res, function (err, result) {
    if(result != null){
     self.busHis = result["ArrayOfBusChangingItem"]["BusChangingItem"];
     self.isBus = false;
     self.isBusHis = true;
     self.isNoBusStop = true;
    }
 });
 }
  , err => {
    console.log('err',err);
  });
  }

  showBus() {
    this.isBus = true;
    this.isBusHis = false;
    this.isNoBusStop = true;
  }

  editBus(busCode,index){
    let self = this;
    let temp = this.bus.filter(bus=>bus.Code == busCode)[0];
    this.busCurrent = temp.Code + ' : '+ temp.Bus + '-' + temp.Stop;
    this.busEdit = {};
    this.busEdit.BusIndex = 'BUS'+ this.bus.length;
    this.busEdit.BusAndStopCode = busCode.toString();
    this.busEdit.BusCode = '';
    this.busEdit.StopCode = '';
    this.isBus = false;
    this.isEdit = true;
  }
  saveBus(){
    let self = this;
    if(this.busEdit.BusCode=="" || this.busEdit.StopCode ==""){
      this.openDialog(this.message.getMessage('Bus.Alert'));
    }
    else{
      this.service.postSave(this.busEdit).subscribe(res =>{ 
        self.service.getBus().subscribe(res =>{ 
          parseString(res, function (err, result) {
            if(result != null){
              self.bus = result["ArrayOfBusItem"]["BusItem"];
              self.isBus = true;
              self.isEdit = false;
              self.isNoBusStop = true;
              self.setBusCodeSplit();
             }
          });
       }
       , err => {
          console.log('err',err);
        });
 }
  , err => {
    console.log('err',err);
  });
}
   
  }
  cancleBus(){
    this.isBus = true;
    this.isEdit = false;
    this.isNoBusStop = true;
    this.busStopList = [];
  }

  onBusSelect(busCode) { 
    this.busSelected = this.busNumberList.filter(bus=>bus.Code == busCode);
    this.busEdit.BusCode = busCode.toString();
    let self = this;
    this.service.getBusStopList(busCode).subscribe(res =>{ 
      parseString(res, function (err, result) {
      if(result != null){
       self.busStopList = result["ArrayOfBusItem"]["BusItem"];
       self.busEdit.StopCode = self.busStopList[0].Code.toString();
       self.isNoBusStop = false;
      }
   });
   }
    , err => {
      console.log('err',err);
    });
}

openDialog(dialogTitle): void {
  let dialogRef = this.dialog.open(DialogComponent, {
    width: '250px',
    autoFocus: false,
    data: { dialogType: 'alert' ,dialogTitle: dialogTitle}
  });
}

setBusCodeSplit(){
  let self = this;
  if(self.bus != null){
    let maxLength = self.bus.length;
    for(let i=0; i< maxLength; i++){
      self.bus[i].CodeSplit = self.bus[i].Code.toString().split("-")[0].toUpperCase();
    }
  }
}
}
