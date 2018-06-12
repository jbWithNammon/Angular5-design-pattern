import { IProfile, IConfig } from '../../models/interfaces';
import { Component, OnInit, Inject } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MessageResource } from '../../shared/resources/message.resource';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../../shared/Modal/dialog/dialog.component';
import { AppService } from '../../app.service';
import { Observable } from "rxjs";
var parseString = require('xml2js').parseString;

@Component({
  selector: 'pro-gen',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  profile: IProfile = {};
  isEditInTel: Boolean = false;
  isEditPCT: Boolean = false;
  isEditMobile: Boolean = false; 

  tmpEditIntel: string;
  tmpEditPCT: string;
  tmpEditMobile: string;

  refCode: string;

  txtPasswordOTP: string;
  tempEmpCode: any;
  empCode: string;
  imageProfileLink:string;
  photoApi:string;
  isDialogOpen: number;

  constructor(private route: ActivatedRoute, private router: Router,
     private service: ProfileService, public message: MessageResource, private dialog: MatDialog,
     private app: AppService,@Inject('web_config') webConfig: IConfig) {
       this.profile.BankInfo = {};
       this.profile.Contact = {};
       this.photoApi = webConfig.ApiPhoto;
       //this.bModeIntel = 'saveAndCancel';
  }

  ngOnInit() {
    this.tempEmpCode = this.app.getLocalStorage('userAuth');
    this.empCode = this.tempEmpCode.userName;
    this.imageProfileLink = this.photoApi + this.empCode + ".jpg";
    //this.imageProfileLink ="assets/images/im_Profile.gif";    
    this.getProfile();
  }
  getProfile() {
    let self = this;

    this.service.getProfile(this.empCode).subscribe(
      res => {
        parseString(res, function (err, result) {
        self.profile = result.EmpItem;
        self.profile.Contact = result.EmpItem;
        self.profile.BankInfo = result.EmpItem;
        });
      }
    );
  } 

  OnclickIntel(event) {
    if (event.target.id == 'editIntelbtn') {
      this.isEditInTel = true;
      this.tmpEditIntel = this.profile.Tel;
    } else if (event.target.id == 'cancelIntelbtn') {
      this.isEditInTel = false;
      this.profile.Tel = this.tmpEditIntel;
    } else if (event.target.id == 'saveIntelbtn') {
      let self = this;

      this.isEditInTel = false;

      this.service.saveInternalPhone(this.empCode, this.profile.PHS, this.profile.Tel).subscribe(
        res => {
          parseString(res, function (err, result) {
            self.openDialogWarning(self.message.getMessage('Message.SaveComplate'));
            /* If can not save then can use code as below for show error message
            self.openDialogWarning(self.message.getMessage('Message.SaveFailed'));
            */
          });
        }
      );
    }
  }

  OnclickPCT(event) {
    if (event.target.id == 'editPCTbtn') {
      this.isEditPCT = true;
      this.tmpEditPCT = this.profile.PHS;
    } else if (event.target.id == 'cancelPCTbtn') {
      this.isEditPCT = false;
      this.profile.PHS = this.tmpEditPCT;
    } else if (event.target.id == 'savePCTbtn') {
      let self = this;

      this.isEditPCT = false;

      this.service.savePCT(this.empCode, this.profile.PHS, this.profile.Tel).subscribe(
        res => {
          parseString(res, function (err, result) {
            self.openDialogWarning(self.message.getMessage('Message.SaveComplate'));
            /* If can not save then can use code as below for show error message
            self.openDialogWarning(self.message.getMessage('Message.SaveFailed'));
            */
          });
        }
      );
    }
  }

  OnclickMobile(event) {
    if (event.target.id == 'editMobilebtn') {
      this.isEditMobile = true;
      this.tmpEditMobile = this.profile.Mobile;
    } else if (event.target.id == 'cancelMobilebtn') {
      this.isEditMobile = false;
      this.profile.Mobile = this.tmpEditMobile;
    } else if (event.target.id == 'saveMobilebtn') {
      if(this.profile.Mobile == this.tmpEditMobile)
      {
        this.openDialogWarning(this.message.getMessage('Profile.MobileSame'));
      }
      else if(this.profile.Mobile == ""){
        this.openDialogWarning(this.message.getMessage('Profile.MobileEmpty'));
      }else{
        this.openDialog();
      }
    }
  }

  saveMobile(isCansave) {
    if (isCansave) {
      //this.bModeMobile = 'edit';
      this.isEditMobile = false;
    }
  }

    closeDialog() {
    let modal: HTMLElement = document.getElementById('myModal');
    this.txtPasswordOTP = '';
    modal.style.display = 'none';
  }

  openDialog(): void {
    this.isDialogOpen = 1;
    let dialogOTP = this.dialog.open(DialogComponent, {
      width: '600px',
      disableClose:true,
      data: {dialogType: 'OTP',mobileNumber: this.profile.Mobile}
    });
    Observable.interval(100).takeWhile(val => this.isDialogOpen == 1 ).subscribe(i => {
      if (!this.app.getLocalStorage('isAuth')) {
        this.isDialogOpen = 0;
        dialogOTP.close();
      }
    });
    dialogOTP.afterClosed().subscribe(res => {
      this.isDialogOpen = 0;
      this.saveMobile(res);
     });
  }

  openDialogWarning(dialogTitle): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      autoFocus: false,
      data: { dialogType: 'alert' , dialogTitle: dialogTitle}
    });
  }
}
