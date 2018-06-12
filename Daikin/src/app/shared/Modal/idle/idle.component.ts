import { Component, Inject, ElementRef, Renderer2, ViewEncapsulation,HostListener } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AppService } from "../../../app.service";
import { MessageResource } from '../../resources/message.resource';
import { IConfig } from "../../../models/interfaces";
import { UserIdleService } from 'angular-user-idle';

@Component({
    selector: 'dialog-idle',
    templateUrl: 'idle.component.html'
  })
  export class IdleDialog {    
    constructor(
      public dialogRef: MatDialogRef<IdleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private renderer: Renderer2,
      private el: ElementRef,
      private app:AppService,
      public message: MessageResource,
      @Inject('web_config') webConfig: IConfig,
      private userIdle: UserIdleService
    ) {
        this.app.obIdle.subscribe(count => {
          if(count != webConfig.AppIdle.TimeOut){
            this.data.time = webConfig.AppIdle.TimeOut + 1 - count;
          }
          else{
            this.data.time = webConfig.AppIdle.TimeOut + 1 - count;
            this.closeDialog();
          }
        });
    }
  getContinue(){

  }
  closeDialog(){
    this.dialogRef.close();
}

@HostListener('document:click', ['$event'])
clickout(event) {
  this.restart();
  if(this.dialogRef != null) {
    this.dialogRef.close();
  }
}
restart() {
  this.userIdle.resetTimer();
}
  }