import { Component, OnInit } from '@angular/core';
import { MessageResource } from '../../shared/resources/message.resource';
import { BenefitsService } from '../benefits.service';
import { IWalfareModel, ModifyUniformModel } from '../../models/interfaces';
import { OtherUniformModel } from '../../models/interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../../shared/Modal/dialog/dialog.component';
import { ComboboxModel } from '../../models/interfaces';
import { AppService } from '../../app.service';
import { Observable } from "rxjs";
var parseString = require('xml2js').parseString;
@Component({
  selector: 'app-information-bef',
  templateUrl: './information-bef.component.html',
  styleUrls: ['./information-bef.component.css']
})
export class InformationBefComponent implements OnInit {
  bEditUniform: boolean;
  beditOther: boolean;
  beditFam: boolean;

  bSCEmpbtn: boolean;
  bEEmpbtn: boolean;
  bSCOthbtn: boolean;
  bEOthbtn: boolean;
  bSCFambtn: boolean;
  bEFambtn: boolean;

  bTypeOP: boolean;
  bTypeWHSP: boolean;
  bTypeOF: boolean;
  walfareModel: IWalfareModel;
  walfareModelFamilyTrip: OtherUniformModel;
  txtwalfareModel: IWalfareModel;
  txtwalfareModelFamilyTrip: OtherUniformModel;
  modifyUniformOth: ModifyUniformModel;
  modifyUniformFam: ModifyUniformModel;
  modifyUniformEmp: ModifyUniformModel;

  dropdownShirtType: ComboboxModel[];
  dropdownTrouserType: ComboboxModel[];
  dropdownBearSuitType: ComboboxModel[];
  dropdownCapType: ComboboxModel[];
  dropdownShoeType: ComboboxModel[];
  dropdownTShirtType: ComboboxModel[];
  dropdownOtherType: ComboboxModel[];
  dropdownFamily_Adult: ComboboxModel[];
  dropdownFamily_Child: ComboboxModel[];

  indexOfDropdownShirt: string;
  indexOfDropdownTrouser: string;
  indexOfDropdownBearSuit: string;
  indexOfDropdownCap: string;
  indexOfDropdownShoe: string;
  indexOfDropdownTShirt: string;
  indexOfDropdownOther: string;
  indexOfDropdownEmployee: string;
  indexOfDropdownSpouse: string;
  indexOfDropdownChild1: string;
  indexOfDropdownChild2: string;
  indexOfDropdownChild3: string;
  indexOfDropdownChild4: string;
  indexOfDropdownChild5: string;

  isModifyEmp: boolean;
  isModifyOth: boolean;
  isModifyFam: boolean;

  mockUpEmpCode: any;
  user: string;
  countApi: number;

  allowBit1: boolean;
  allowBit2: boolean;
  allowBit3: boolean;
  allowBit4: boolean;
  allowBit5: boolean;
  allowEmp:boolean;
  allowSpouse:boolean;




  constructor(private walfareService: BenefitsService, public message: MessageResource
    , private dialog: MatDialog, private app: AppService) { }

  ngOnInit() {
    this.mockUpEmpCode = this.app.getLocalStorage('userAuth');
    this.user = this.mockUpEmpCode.userName;
    this.walfareModel = {};
    this.walfareModel.EmployeeUnitform = {};
    this.walfareModel.OtherUniforms = {};
    this.walfareModel.SocialSecurityProvidentFund = {};
    this.walfareModelFamilyTrip = {};
    this.getInformation();

    this.InitailVariableScreen();
    this.InitailAllDropdownList();

    // this.getModifyUniformOthFlag();
    // this.getModifyUniformFamFlag();
    // this.getModifyUniformEmpFlag();
  }

  getModifyUniformOthFlag() {
    let self = this;
    this.walfareService.GetPeriodForModifyUniformOnOtherType().subscribe(
      res => {
        parseString(res, function (err, result) {
          self.modifyUniformOth = result.UniformPeriodItem;
          if (self.modifyUniformOth.PeriodCanModify == "Y") {
            self.isModifyOth = true;
          } else {
            self.isModifyOth = false;
          }
        });
      }
    );
  }

  getModifyUniformFamFlag() {
    let self = this;
    this.walfareService.GetPeriodForModifyUniformOnFamilyTrip().subscribe(
      res => {
        parseString(res, function (err, result) {
          self.modifyUniformFam = result.UniformPeriodItem;          
          if (self.modifyUniformFam.PeriodCanModify == "Y") {
            console.log(!self.allowBit1,!self.allowBit2,!self.allowBit3
              ,!self.allowBit4,!self.allowBit5,!self.allowEmp,!self.allowSpouse);
            if(!self.allowBit1&&!self.allowBit2&&!self.allowBit3
              &&!self.allowBit4&&!self.allowBit5&&!self.allowEmp&&!self.allowSpouse)
              self.isModifyFam = false;
              else
              self.isModifyFam = true;
          } else {
            self.isModifyFam = false;
          }          
        });
      }
    );
  }
  getModifyUniformEmpFlag() {
    let self = this;
    this.walfareService.GetPeriodForModifyUniform().subscribe(
      res => {
        parseString(res, function (err, result) {
          self.modifyUniformEmp = result.UniformPeriodItem;
          if (self.modifyUniformEmp.PeriodCanModify == "Y") {
            self.isModifyEmp = true;            
          } else {
            self.isModifyEmp = false;
          }
        });
      }
    );
  }
  getInformation() {
    let self = this;

    this.walfareService.getInformation(this.user).subscribe(
      res => {
        parseString(res, function (err, result) {
          self.walfareModel.EmployeeUnitform = result.EmpUniformItem;
          let uniFormType: string = result.EmpUniformItem.UniformType;
          if (uniFormType == 'OP') {
            document.getElementById('radOP').removeAttribute('disabled');
            document.getElementById('radOP').setAttribute('checked', 'true');
            self.bTypeOP = true;
          } else if (uniFormType == 'WH' || uniFormType == 'SP') {
            document.getElementById('radWHSP').removeAttribute('disabled');
            document.getElementById('radWHSP').setAttribute('checked', 'true');
            self.bTypeWHSP = true;
          } else if (uniFormType == 'OF') {
            document.getElementById('radOF').removeAttribute('disabled');
            document.getElementById('radOF').setAttribute('checked', 'true');
            self.bTypeOF = true;
          }
          self.getModifyUniformEmpFlag();
          /* if (self.IsNullOrEmtry(self.walfareModel.EmployeeUnitform.Shirt)) {
            self.walfareModel.EmployeeUnitform.Shirt_Show
              = self.GetUniformTypeMapping(self.dropdownShirtType, self.walfareModel.EmployeeUnitform.Shirt);
          }
          if (self.IsNullOrEmtry(self.walfareModel.EmployeeUnitform.Trouser)) {
            self.walfareModel.EmployeeUnitform.Trouser_Show
              = self.GetUniformTypeMapping(self.dropdownTrouserType, self.walfareModel.EmployeeUnitform.Trouser);
          }
          if (self.IsNullOrEmtry(self.walfareModel.EmployeeUnitform.BlueSuit)) {
            self.walfareModel.EmployeeUnitform.BlueSuit_Show
              = self.GetUniformTypeMapping(self.dropdownBearSuitType, self.walfareModel.EmployeeUnitform.BlueSuit);
          }
          if (self.IsNullOrEmtry(self.walfareModel.EmployeeUnitform.Cap)) {
            self.walfareModel.EmployeeUnitform.Cap_Show
              = self.GetUniformTypeMapping(self.dropdownCapType, self.walfareModel.EmployeeUnitform.Cap);
          }
          if (self.IsNullOrEmtry(self.walfareModel.EmployeeUnitform.Shoe)) {
            self.walfareModel.EmployeeUnitform.Shoe_Show
              = self.GetUniformTypeMapping(self.dropdownShoeType, self.walfareModel.EmployeeUnitform.Shoe);
          }
          if (self.IsNullOrEmtry(self.walfareModel.EmployeeUnitform.TShirt)) {
            self.walfareModel.EmployeeUnitform.TShirt_Show
              = self.GetUniformTypeMapping(self.dropdownTShirtType, self.walfareModel.EmployeeUnitform.TShirt);
          } */
        });
      }
    );

    this.walfareService.GetUniformInfoForOtherType(this.user).subscribe(
      res => {
        parseString(res, function (err, result) {
          self.walfareModel.OtherUniforms = result.EmpUniformOtherTypeItem;
          self.getModifyUniformOthFlag();
        });
      }
    );

    this.walfareService.GetUniformInfoForFamilyTrip(this.user).subscribe(
      res => {
        parseString(res, function (err, result) {
          self.walfareModelFamilyTrip = result.EmpUniformWithFamilyItem;          
          self.allowBit1 = self.walfareModelFamilyTrip.Child_1Size_AllowBit == 'Y' ? true : false;
          self.allowBit2 = self.walfareModelFamilyTrip.Child_2Size_AllowBit == 'Y' ? true : false;
          self.allowBit3 = self.walfareModelFamilyTrip.Child_3Size_AllowBit == 'Y' ? true : false;
          self.allowBit4 = self.walfareModelFamilyTrip.Child_4Size_AllowBit == 'Y' ? true : false;
          self.allowBit5 = self.walfareModelFamilyTrip.Child_5Size_AllowBit == 'Y' ? true : false;
          self.allowEmp = self.walfareModelFamilyTrip.EmployeeSize_AllowBit == 'Y' ? true : false;
          self.allowSpouse = self.walfareModelFamilyTrip.SpouseSize_AllowBit == 'Y' ? true : false;
          self.getModifyUniformFamFlag();
        });
      }
    );

    this.walfareService.GetSocialSecurityProvidentFundModel(this.user).subscribe(
      res => {
        parseString(res, function (err, result) {
          self.walfareModel.SocialSecurityProvidentFund = result.EmpItem;          
        });
      }
    );
  }
  // getCheckInformationData() {   
  //   let self = this;
  //   this.walfareService.getFamilyDetail(this.user).subscribe(
  //     res => {
  //       parseString(res, function (err, result) {
  //       let arr:any[] = result.ArrayOfFamilyItem.FamilyItem;
  //       if(arr != undefined)
  //       self.isModifyFam = true;
  //       else
  //       self.isModifyFam = false;
  //       });
  //     }
  //   );
  // }
  editData(event): Boolean {
    if (event.target.id == 'editEmployeebtn') {
      this.bSCEmpbtn = true;
      this.bEEmpbtn = false;

      this.bEditUniform = true;
      this.DefaultValueEmployeeDropDown();
    } else if (event.target.id == 'editOtherbtn') {
      this.bSCOthbtn = true;
      this.bEOthbtn = false;

      this.beditOther = true;
      this.DefaultValueOtherDropDown();
    } else if (event.target.id == 'editFambtn') {
      this.bSCFambtn = true;
      this.bEFambtn = false;

      this.beditFam = true;
      this.DefaultValueFamilyDropDown();

    }
    return false;
  }
  cencalData(event): Boolean {
    if (event.target.id == 'cancelEmployeebtn') {
      this.bSCEmpbtn = false;
      this.bEEmpbtn = true;

      this.bEditUniform = false;
    } else if (event.target.id == 'cancelOtherbtn') {
      this.bSCOthbtn = false;
      this.bEOthbtn = true;

      this.beditOther = false;
    } else if (event.target.id == 'cancelFambtn') {
      this.bSCFambtn = false;
      this.bEFambtn = true;

      this.beditFam = false;
    }
    return false;
  }
  saveData(event): Boolean {
    if (event.target.id == 'saveEmployeebtn') {
      this.bSCEmpbtn = false;
      this.bEEmpbtn = true;

      this.bEditUniform = false;
      this.SaveValueEmployeeDropDown();
    } else if (event.target.id == 'saveOtherbtn') {
      this.bSCOthbtn = false;
      this.bEOthbtn = true;

      this.beditOther = false;
      this.SaveValueOtherDropDown();
    } else if (event.target.id == 'saveFambtn') {
      this.bSCFambtn = false;
      this.bEFambtn = true;

      this.beditFam = false;
      this.SaveValueFamilyDropDown();
    }
    return false;
  }

  InitailVariableScreen() {
    this.walfareModel = {};
    this.txtwalfareModel = {};
    this.txtwalfareModel.EmployeeUnitform = {};
    this.txtwalfareModel.OtherUniforms = {};
    this.walfareModelFamilyTrip = {};
    this.txtwalfareModelFamilyTrip = {};

    this.bEditUniform = false;
    this.beditOther = false;
    this.bSCEmpbtn = false;
    this.bEEmpbtn = true;
    this.bSCOthbtn = false;
    this.bEOthbtn = true;
    this.bSCFambtn = false;
    this.bEFambtn = true;
    this.bTypeOP = false;
    this.bTypeWHSP = false;
    this.bTypeOF = false;
  }

  DefaultValueEmployeeDropDown() {
    this.indexOfDropdownShirt = this.walfareModel.EmployeeUnitform.Shirt;
    this.indexOfDropdownTrouser = this.walfareModel.EmployeeUnitform.Trouser;
    this.indexOfDropdownBearSuit = this.walfareModel.EmployeeUnitform.BlueSuit;
    this.indexOfDropdownCap = this.walfareModel.EmployeeUnitform.Cap;
    this.indexOfDropdownShoe = this.walfareModel.EmployeeUnitform.Shoe;
    this.indexOfDropdownTShirt = this.walfareModel.EmployeeUnitform.TShirt;
  }

  DefaultValueOtherDropDown() {
    this.indexOfDropdownOther = this.walfareModel.OtherUniforms.Size_Key;
  }

  DefaultValueFamilyDropDown() {
    this.indexOfDropdownOther = this.walfareModel.OtherUniforms.Size_Key;
    this.indexOfDropdownEmployee = this.walfareModelFamilyTrip.EmployeeSize_Key;
    this.indexOfDropdownSpouse = this.walfareModelFamilyTrip.SpouseSize_Key;
    this.indexOfDropdownChild1 = this.walfareModelFamilyTrip.Child_1Size_Key;
    this.indexOfDropdownChild2 = this.walfareModelFamilyTrip.Child_2Size_Key;
    this.indexOfDropdownChild3 = this.walfareModelFamilyTrip.Child_3Size_Key;
    this.indexOfDropdownChild4 = this.walfareModelFamilyTrip.Child_4Size_Key;
    this.indexOfDropdownChild5 = this.walfareModelFamilyTrip.Child_5Size_Key;
  }

  SaveValueEmployeeDropDown() {
    if (this.walfareModel.EmployeeUnitform.Shirt != this.indexOfDropdownShirt) {
      this.SaveDataEmployee(this.user, 'SHIRT', this.indexOfDropdownShirt);
    }
    if (this.walfareModel.EmployeeUnitform.Trouser != this.indexOfDropdownTrouser) {
      this.SaveDataEmployee(this.user, 'TROUSER', this.indexOfDropdownTrouser);
    }
    if (this.walfareModel.EmployeeUnitform.BlueSuit != this.indexOfDropdownBearSuit) {
      this.SaveDataEmployee(this.user, 'BLUE', this.indexOfDropdownBearSuit);
    }
    if (this.walfareModel.EmployeeUnitform.Cap != this.indexOfDropdownCap) {
      this.SaveDataEmployee(this.user, 'CAP', this.indexOfDropdownCap);
    }
    if (this.walfareModel.EmployeeUnitform.Shoe != this.indexOfDropdownShoe) {
      this.SaveDataEmployee(this.user, 'SHOE', this.indexOfDropdownShoe);
    }
    if (this.walfareModel.EmployeeUnitform.TShirt != this.indexOfDropdownTShirt) {
      this.SaveDataEmployee(this.user, 'TSHIRT', this.indexOfDropdownTShirt);
    }

    // if (this.isSaveEmp) {
    //   this.openDialogWarning(this.message.getMessage('Message.SaveComplate'));
    // } else {
    //   this.openDialogWarning(this.message.getMessage('Message.SaveFailed'));
    // }
    // this.isSaveEmp = false;
  }

  SaveValueOtherDropDown() {
    if (this.walfareModel.OtherUniforms.Size_Key != this.indexOfDropdownOther) {
      this.SaveDataOther(this.user, this.indexOfDropdownOther);
    }
    // if (this.isSaveOther) {
    //   this.openDialogWarning(this.message.getMessage('Message.SaveComplate'));
    // } else {
    //   this.openDialogWarning(this.message.getMessage('Message.SaveFailed'));
    // }
    // this.isSaveOther = false;
  }

  SaveValueFamilyDropDown() {
    if (this.walfareModel.OtherUniforms.Size_Key != this.indexOfDropdownOther) {
      this.SaveDataOther(this.user, this.indexOfDropdownOther);
    }

    if (this.walfareModelFamilyTrip.EmployeeSize_AllowBit == 'Y') {
      if (this.walfareModelFamilyTrip.EmployeeSize_Key != this.indexOfDropdownEmployee) {
        this.SaveDataFamilyTrip(this.user, 'EMP', this.indexOfDropdownEmployee);
      }
    }

    if (this.walfareModelFamilyTrip.SpouseSize_AllowBit == 'Y') {
      if (this.walfareModelFamilyTrip.SpouseSize_Key != this.indexOfDropdownSpouse) {
        this.SaveDataFamilyTrip(this.user, 'SPOUSE', this.indexOfDropdownSpouse);
      }
    }

    if (this.walfareModelFamilyTrip.Child_1Size_AllowBit == 'Y') {
      if (this.walfareModelFamilyTrip.Child_1Size_Key != this.indexOfDropdownChild1) {
        this.SaveDataFamilyTrip(this.user, 'CHILD1', this.indexOfDropdownChild1);
      }
    }

    if (this.walfareModelFamilyTrip.Child_2Size_AllowBit == 'Y') {
      if (this.walfareModelFamilyTrip.Child_2Size_Key != this.indexOfDropdownChild2) {
        this.SaveDataFamilyTrip(this.user, 'CHILD2', this.indexOfDropdownChild2);
      }
    }

    if (this.walfareModelFamilyTrip.Child_3Size_AllowBit == 'Y') {
      if (this.walfareModelFamilyTrip.Child_3Size_Key != this.indexOfDropdownChild3) {
        this.SaveDataFamilyTrip(this.user, 'CHILD3', this.indexOfDropdownChild3);
      }
    }

    if (this.walfareModelFamilyTrip.Child_4Size_AllowBit == 'Y') {
      if (this.walfareModelFamilyTrip.Child_4Size_Key != this.indexOfDropdownChild4) {
        this.SaveDataFamilyTrip(this.user, 'CHILD4', this.indexOfDropdownChild4);
      }
    }

    if (this.walfareModelFamilyTrip.Child_5Size_AllowBit == 'Y') {
      if (this.walfareModelFamilyTrip.Child_5Size_Key != this.indexOfDropdownChild5) {
        this.SaveDataFamilyTrip(this.user, 'CHILD5', this.indexOfDropdownChild5);
      }
    }

    // if (this.isSaveFamily) {
    //   this.openDialogWarning(this.message.getMessage('Message.SaveComplate'));
    // } else {
    //   this.openDialogWarning(this.message.getMessage('Message.SaveFailed'));
    // }
    // this.isSaveFamily = false;
  }

  GetUniformTypeMapping(UniformList, uniFormKey): string {
    let dataReturn: ComboboxModel = {};
    let key: string = uniFormKey[0];
    dataReturn = UniformList.filter(UniformList => UniformList.UniformTypeKey == key)[0];
    return dataReturn.UniformTypeDescription;
  }


  SaveDataEmployee(empCode: string, type: string, size: string): void {
    let self = this;

    this.walfareService.UpdateEmployeeUniform(empCode, type, size).subscribe(
      res => {
        parseString(res, function (err, result) {
          if (result.string._ == 'OK') {
            //self.isSaveEmp = true;
            self.getInformation();
          }
        });
      }
    );
  }

  SaveDataOther(empCode: string, size: string): void {
    let self = this;

    this.walfareService.UpdateOtherUniform(empCode, size).subscribe(
      res => {
        parseString(res, function (err, result) {
          if (result.string._ == 'OK') {
            //self.isSaveOther = true;
            self.getInformation();
          }
        });
      }
    );
  }

  SaveDataFamilyTrip(empCode: string, category: string, size: string): void {
    let self = this;

    this.walfareService.UpdateFamilyTripUniform(empCode, category, size).subscribe(
      res => {
        parseString(res, function (err, result) {
          if (result.string._ == 'OK') {
            //self.isSaveFamily = true;
            self.getInformation();
          }
        });
      }
    );
  }

  InitailAllDropdownList() {
    let self = this;
    //this.countApi = 10;
    this.walfareService.GetDropdownListShirt(this.user).subscribe(
      res => {
        parseString(res, function (err, result) {
          self.dropdownShirtType = result.ArrayOfUniformItem.UniformItem;
          //self.countApi--;          
        });
      }
    );

    this.walfareService.GetDropdownTrouserType(this.user).subscribe(
      res => {
        parseString(res, function (err, result) {
          self.dropdownTrouserType = result.ArrayOfUniformItem.UniformItem;
          //self.countApi--;          
        });
      }
    );

    this.walfareService.GetDropdownBearSuitType(this.user).subscribe(
      res => {
        parseString(res, function (err, result) {
          self.dropdownBearSuitType = result.ArrayOfUniformItem.UniformItem;
          //self.countApi--;         
        });
      }
    );

    this.walfareService.GetDropdownCapType(this.user).subscribe(
      res => {
        parseString(res, function (err, result) {
          self.dropdownCapType = result.ArrayOfUniformItem.UniformItem;
          // self.countApi--;          
        });
      }
    );

    this.walfareService.GetDropdownShoeType(this.user).subscribe(
      res => {
        parseString(res, function (err, result) {
          self.dropdownShoeType = result.ArrayOfUniformItem.UniformItem;
          //self.countApi--;          
        });
      }
    );

    this.walfareService.GetDropdownTShirtType(this.user).subscribe(
      res => {
        parseString(res, function (err, result) {
          self.dropdownTShirtType = result.ArrayOfUniformItem.UniformItem;
          //self.countApi--;         
        });
      }
    );

    this.walfareService.GetDropdownOtherType().subscribe(
      res => {
        parseString(res, function (err, result) {
          self.dropdownOtherType = result.ArrayOfUniformItem.UniformItem;
          //self.countApi--;          
        });
      }
    );

    this.walfareService.GetDropdownFamily_Adult().subscribe(
      res => {
        parseString(res, function (err, result) {
          self.dropdownFamily_Adult = result.ArrayOfUniformItem.UniformItem;
          // self.countApi--;         
        });
      }
    );

    this.walfareService.GetDropdownFamily_Child().subscribe(
      res => {
        parseString(res, function (err, result) {
          self.dropdownFamily_Child = result.ArrayOfUniformItem.UniformItem;
          //self.countApi--;          
        });
      }
    );


    /*     Observable.interval(100).takeWhile(val => this.countApi != 0).subscribe(i => {
          if (this.countApi == 1) {
            this.getInformation();
            this.countApi--;
          }
        }); */
  }

  IsNullOrEmtry(data: string): boolean {
    if (data == '' || data == null) {
      return false;
    }
    return true;
  }

  openDialogWarning(dialogTitle): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      autoFocus: false,
      data: { dialogType: 'alert', dialogTitle: dialogTitle }
    });
  }
}
