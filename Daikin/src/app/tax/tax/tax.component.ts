import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TaxService } from '../tax.service';
import { ITax } from '../../models/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MessageResource } from '../../shared/resources/message.resource';
var parseString = require('xml2js').parseString;

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html'
})
export class TaxComponent implements OnInit {

  taxShowOn:ITax[];
  thisYear: number;
  adjusment:number;
  
  constructor(private route: ActivatedRoute, private router: Router, private service: TaxService ,public message: MessageResource) { }

  ngOnInit() {
    var date = new Date();
    let year = date.getFullYear();
    this.thisYear = year.valueOf();
    this.showThisYear();
  }

  showYearAgo(){
    this.adjusment = this.adjusment-1;
    let getYear = this.thisYear+this.adjusment;
    this.getTaxdata(getYear);
  }

  showThisYear(){
    this.adjusment = 0;
    let getYear = this.thisYear+this.adjusment;
    this.getTaxdata(getYear);
  }

  showNextYear(){
    this.adjusment = this.adjusment+1;
    let getYear = this.thisYear+this.adjusment;
    this.getTaxdata(getYear);
  }

  getTaxdata(getYear){
    let self = this;
    this.service.getTaxData(getYear.toString()).subscribe(res =>{ 
      parseString(res, function (err, result) {
      if(result != null){
       self.taxShowOn = result["ArrayOfTaxItem"]["TaxItem"];
      }
   });
   }, err => {
      console.log(err);
    });
  }
}
