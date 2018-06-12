import { IUser } from './../../models/interfaces';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, HostListener } from '@angular/core';
import { SharedService } from '../shared.service';
import { IMenu } from '../../models/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { AuthService } from '../../authentication/auth.service';
import { MessageResource } from '../resources/message.resource';
import { MatDialog } from '@angular/material';
import { IncorrectDialog } from '../Modal/password/password.component';
import { CommonValidation } from '../../models/CommonValidation';
import { DialogComponent } from '../../shared/Modal/dialog/dialog.component';
var parseString = require('xml2js').parseString;


@Component({
  selector: 'shared-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  userName: string;
  password: string;
  isAuth: boolean;
  user: IUser;
  loginFail: boolean = false;
  dialogRef: any;
  isKIOSK: boolean = true;
  validate: CommonValidation;
  isNarrow: boolean = false;
  constructor(private service: SharedService, private router: Router, private route: ActivatedRoute,
    private app: AppService, private auth: AuthService, private message: MessageResource,
    public dialog: MatDialog) {
    this.user = {};
    this.user.userInfo = {};
    this.validate = new CommonValidation();
  }
  @HostListener('document:click', ['$event'])
  clickout(e) {
    if (this.isKIOSK && !this.app.getLocalStorage('isAuth'))
      document.getElementsByTagName('input')[0].focus();
    //this.vc.first.nativeElement.focus();
  }
  @HostListener('document:keydown', ['$event'])
  keydown(e) {      
    if (this.isKIOSK && !this.app.getLocalStorage('isAuth')){
      if(e.keyCode == 13){
        this.getAutoFocus();
      }
      else if(e.keyCode == 8){
        // if(this.userName.length == 1){
        //   this.userName ='';
        // }else{
          this.userName = this.userName.slice(0,-1);
        //}        
      }
      else{
        if(this.userName == ''||this.userName == undefined){
          this.userName = String.fromCharCode(e.keyCode);
        }
        else{
          this.userName = this.userName.concat(String.fromCharCode(e.keyCode));
        }        
      }
    }   
  }
  ngOnInit() {
    this.mockUp();
    if (this.app.getLocalStorage('isAuth') != undefined)
      this.isAuth = this.app.getLocalStorage('isAuth');
    else
      this.isAuth = false;
    this.app.obIsAuth.subscribe(data => {
      this.isAuth = data;
      this.app.setLocalStorage('isAuth', data);
      if (data == true && this.user.userName == undefined) {
        this.user = this.app.getLocalStorage('userAuth');
      } else if (!data) {
        this.router.navigate(['/auth/login']);
      }
    });
    // this.app.obRoleId.subscribe(data => {
    //   this.service.getMenu(data).subscribe(res => this.genMenu(res));
    // });
    this.auth.getIpClient().subscribe(res => {
      let self = this;
      parseString(res, function (err, resultIP) {
        resultIP = resultIP["string"]["_"];
        self.auth.getCheckKIOSK(resultIP).subscribe(
          resIk => {
            parseString(resIk, function (err, result) {
              let factResult = result["boolean"]["_"] == "true" ? true : false;
              // truth situation is result;
              //factResult = !factResult;
              self.isKIOSK = factResult;
              //self.app.kioskListener(self.isKIOSK);
              if (factResult) {
                setTimeout(() => {
                  // if (document.getElementsByTagName('input')[0] != undefined)
                  //   document.getElementsByTagName('input')[0].focus();
                  document.getElementsByTagName('body')[0].classList.add('kiosk-cursor');

                }, 1000);

              }
              else {
                setTimeout(() => {
                  if (document.getElementsByTagName('input')[0] != undefined)
                    document.getElementsByTagName('input')[0].focus();
                  document.getElementsByTagName('body')[0].classList.remove('kiosk-cursor');

                }, 1000);
              }
            });
          }, errKI => {

          }
        );

      });

      // console.log('ip', JSON.parse(res));

    }, err => {
    });
    this.app.obResize.subscribe(data => {
      if (data[0] < 700)
        this.isNarrow = true;
      else
        this.isNarrow = false;
    });
    //this.getByPass();
  }

  mockUp() {
    // this.userName = '22240';
    // this.password = '1234';
  }
  getByPass() {
    this.user.userName = '22240';
    this.user.password = '1234';
    let self = this;
    this.auth.getProfile(this.user.userName).subscribe(
      res => {
        parseString(res, function (err, result) {
          if (true) {
            self.user.userInfo = result.EmpItem;
            self.user.userName = self.user.userName.toUpperCase();
            self.app.setLocalStorage('userAuth', self.user);
            self.app.setLocalStorage('isAuth', true);
            self.isAuth = true;
            self.router.navigate(['/general']);
          } else {
            //this.loginFail = true;
          }
        });
      }
    );

  }

  getLogin(): void {
    if (this.ValidateData()) {
      this.user.userName = this.userName;
      this.user.password = this.password;

      let self = this;
      this.auth.getLogin(this.user).subscribe(
        res => {
          parseString(res, function (err, result) {
            let status = ['-2','-1','0'];
            if (!status.includes(result.string._)) {
              self.app.setLocalStorage('token',result.string._);
              self.userName = "";
              self.password = "";
              self.getInfomation(true);
            } else {
              self.openDialog();
              self.loginFail = true;
            }
          });
        }, err => {
        });
    }

    // let self = this;
    // let parseString = require('xml2js').parseString;

    // this.auth.getLogin(this.user).subscribe(
    //   res => {
    //     parseString(res, function (err, result) {
    //       if (true) {
    //         self.getInfomation(true);
    //       } else {
    //         this.loginFail = true;
    //       }
    //     });
    //   }
    // );
  }

  getInfomation(isLogin) {
    let self = this;
    //let parseString = require('xml2js').parseString;

    this.auth.getProfile(this.user.userName).subscribe(
      res => {
        parseString(res, function (err, result) {
          if (isLogin) {
            self.user.userInfo = result.EmpItem;
            self.user.userName = self.user.userName.toUpperCase();
            self.app.setLocalStorage('userAuth', self.user);
            self.app.setLocalStorage('isAuth', isLogin);
            self.isAuth = isLogin;
            self.router.navigate(['/Home']);
          } else {
            self.loginFail = true;
          }
        });
      }
    );
  }

  getLogOut() {
    this.auth.getLogout().subscribe(res => {
      if (res) {
        this.app.setLocalStorage('isAuth', !res);
        this.app.removeLocalStorage('token');
        this.app.leftbarListener(0);
        this.isAuth = !res;
        this.router.navigate(['/auth/login']);
        //window.location.reload();
      }
    }, err => {

    });
  }
  getReload() {

    window.location.reload();

  }

  setLang(lang: string) {
    this.app.setLocalStorage('appLang', lang);
    this.message.langListener(lang);
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(IncorrectDialog, {
      width: '350px',
      // height:'600px',
      //position:{top:'100px'},     
      autoFocus: false,
      //data: { time: 0}
    });
  }
  getAutoFocus(): void {
    //alert(this.userName);
    let self = this;
    if (this.isKIOSK) {
      //this.userName = '9742365';      
      this.auth.getByRFID(this.userName).subscribe(res => {
        parseString(res, function (err, result) {
          let status = result["string"]["_"];          
          //self.user.userName = '22240';        
          if (status != '0') {
            status = status.split(':');
            self.user.userName =status[0];
            self.app.setLocalStorage('token',status[1]);
            self.getInfomation(true);
          }
        });
      }, err => {

      });
    }
    this.userName = "";
    this.password = "";
  }

  ValidateData(): boolean {
    let isPassUserName: boolean = false;
    let isPassPassword: boolean = false;
    if (!this.validate.isNullorEmtry('User Name', this.userName)) {
      if (this.validate.isNoSpace('User Name', this.userName)) {
        isPassUserName = true;
      } else {
        this.openDialogWarning(this.message.getMessage('Login.UsernameHavespace'));
      }
    } else {
      this.openDialogWarning(this.message.getMessage('Login.UsernameNullOrEmtry'));
    }
    if (isPassUserName) {
      if (!this.validate.isNullorEmtry('Password', this.password)) {
        if (this.validate.isNoSpace('Password', this.password)) {
          isPassPassword = true;
        } else {
          this.openDialogWarning(this.message.getMessage('Login.PasswordHavespace'));
        }
      } else {
        this.openDialogWarning(this.message.getMessage('Login.PasswordNullOrEmtry'));
      }
    }
    return isPassUserName && isPassPassword;
  }

  openDialogWarning(dialogTitle): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      autoFocus: false,
      data: { dialogType: 'alert', dialogTitle: dialogTitle }
    });
  }
}
