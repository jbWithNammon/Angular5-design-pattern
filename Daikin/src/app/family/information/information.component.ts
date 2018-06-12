import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { IFamilyDetail, IMenu } from './../../models/interfaces';
import { IFamilyBenefitDetail } from './../../models/interfaces';
import { FamilyService } from './../family.service';
import { MessageResource } from '../../shared/resources/message.resource';
import { listener } from '@angular/core/src/render3/instructions';
import {familyTab} from '../../models/constants';
var parseString = require('xml2js').parseString;

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  familyList: Array<IFamilyDetail>;
  befPorvidentfundList: Array<IFamilyBenefitDetail>;
  beflifeInsuranceBtn: Array<IFamilyBenefitDetail>;
  activeIDList: Array<string>;
  InActiveIDList: Array<string>;
  empCode: string;
  isNarrow:boolean = false;  
  listOfTab:IMenu[];
  constructor(private familyService: FamilyService, public message: MessageResource,private app: AppService) { 
    this.empCode = this.familyService.getUserInfo();
  }

  ngOnInit() {
    this.getInformationData();
    this.listOfTab = familyTab;
    this.app.obResize.subscribe(data=>{
      if(data[0] < 412)
      this.isNarrow = true;
      else
      this.isNarrow = false;      
    });
  }

  getInformationData() {
    let self = this;
    this.familyService.getFamilyDetail(this.empCode).subscribe(
      res => {
        parseString(res, function (err, result) {
        self.familyList = result.ArrayOfFamilyItem.FamilyItem;
        });
      }
    );

    this.familyService.getBefPorvidentfund(this.empCode).subscribe(
      res => {
        parseString(res, function (err, result) {
        self.befPorvidentfundList = result.ArrayOfBeneficiaryItem.BeneficiaryItem;
        });
      }
    );

    this.familyService.getlifeInsurance(this.empCode).subscribe(
      res => {
        parseString(res, function (err, result) {
        self.beflifeInsuranceBtn = result.ArrayOfBeneficiaryItem.BeneficiaryItem;
        });
      }
    );
    
  }
  onSelectDDLTabInfo(value):void{
    if (value == 'detailBtn') {
      this.activeIDList = ['divFamily'];
      this.InActiveIDList = ['divProvident_fund', 'divLift_insurance'];
      this.setPanelControl(this.activeIDList, this.InActiveIDList);

    } else if (value == 'porvidentfundBtn') {
      this.activeIDList = ['divProvident_fund'];
      this.InActiveIDList = ['divFamily', 'divLift_insurance'];
      this.setPanelControl(this.activeIDList, this.InActiveIDList);

    } else if (value == 'lifeInsuranceBtn') {
      this.activeIDList = ['divLift_insurance'];
      this.InActiveIDList = ['divFamily', 'divProvident_fund'];
      this.setPanelControl(this.activeIDList, this.InActiveIDList);

    }
  }
  onSelectTabInfo(event): Boolean {   
     if (event.target.id == 'detailBtn') {
      this.activeIDList = ['liTabl1', 'divFamily'];
      this.InActiveIDList = ['liTabl2', 'liTabl3', 'divProvident_fund', 'divLift_insurance'];
      this.setPanelControl(this.activeIDList, this.InActiveIDList);

    } else if (event.target.id == 'porvidentfundBtn') {
      this.activeIDList = ['liTabl2', 'divProvident_fund'];
      this.InActiveIDList = ['liTabl1', 'liTabl3', 'divFamily', 'divLift_insurance'];
      this.setPanelControl(this.activeIDList, this.InActiveIDList);

    } else if (event.target.id == 'lifeInsuranceBtn') {
      this.activeIDList = ['liTabl3', 'divLift_insurance'];
      this.InActiveIDList = ['liTabl1', 'liTabl2', 'divFamily', 'divProvident_fund'];
      this.setPanelControl(this.activeIDList, this.InActiveIDList);

    }
    return false;
  }

  setPanelControl(activeID: Array<string>, InactiveID: Array<string>) {
    activeID.forEach(function(id) {
      document.getElementById(id).classList.add('active');
    });

    InactiveID.forEach(function(id) {
      document.getElementById(id).classList.remove('active');
    });
  }
}
