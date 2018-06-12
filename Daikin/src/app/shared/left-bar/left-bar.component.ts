import { IUser, ISubMenu } from './../../models/interfaces';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SharedService } from '../shared.service';
import { IMenu } from "../../models/interfaces";
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { AuthService } from '../../authentication/auth.service';
import { MessageResource } from '../resources/message.resource';
import {subMenu} from '../../models/constants';

@Component({
  selector: 'left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LeftBarComponent implements OnInit {
  isSelected: boolean = false;
  subMenu: ISubMenu[];
  // constructor() {

  // }
  constructor(private service: SharedService, private router: Router, private route: ActivatedRoute,
    private app: AppService, private auth: AuthService, private message: MessageResource) {

  }

  ngOnInit() {
    // this.app.obIsSel.subscribe(data => {
    //   this.isSelected = data;
    //   this.app.setLocalStorage('isSelected',data); 
    // });    
    //debugger;
    
    this.app.obLeftbarId.subscribe(data => {
      this.app.setLocalStorage('isSelected', data > 0 ? true : false);
      this.isSelected = data > 0 ? true : false;
      this.subMenu = subMenu.filter(f=> f.ModuleId == data);
    });
  }

  setRouterLink(link:string):void{
    this.router.navigate([link]);
  }
  // getSubMenu(moduleId: number): void {
  //   this.service.getSubMenu(moduleId).subscribe(
  //     data => {
  //       this.subMenu = data;
  //     }, err => {

  //     }
  //   );
  // }
}
