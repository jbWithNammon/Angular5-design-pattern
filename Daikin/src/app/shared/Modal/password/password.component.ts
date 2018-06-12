import { Component, Inject, ElementRef, Renderer2, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AppService } from "../../../app.service";
import { MessageResource } from '../../resources/message.resource';

@Component({
    selector: 'dialog-incorrect',
    templateUrl: 'password.component.html'
  })
  export class IncorrectDialog {    
    constructor(
      public dialogRef: MatDialogRef<IncorrectDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private renderer: Renderer2,
      private el: ElementRef,
      private app:AppService,
      public message: MessageResource
    ) {
        
    }
    
    
  }