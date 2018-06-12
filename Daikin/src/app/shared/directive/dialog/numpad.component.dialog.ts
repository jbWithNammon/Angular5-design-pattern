import { Component, Inject, ElementRef, Renderer2, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'dialog-numpad',
    templateUrl: 'numpad.component.dialog.html',
    styleUrls:['numpad.component.css'],
    encapsulation:ViewEncapsulation.None
  })
  export class NumPadDialog {
    maxLengthData: number = 10;
    constructor(
      public dialogRef: MatDialogRef<NumPadDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private renderer: Renderer2,
      private el: ElementRef
    ) {      
      if (this.data.elCallBack.nativeElement.maxLength != -1) {
        this.maxLengthData = this.data.elCallBack.nativeElement.maxLength;
      }
    }

    setAccept(): void {
      this.dialogRef.close(this.data.numVal);
    }
    setCancel():void{
      this.dialogRef.close(this.data.tmpVal);
    }
    setNumber(num:string):void{
      
        if(this.data.numVal == undefined){
            this.data.numVal = num;
        }else{
          if(this.data.numVal.length < this.maxLengthData) {
            this.data.numVal = this.data.numVal + num;
        }
      }
    }
    setDelete(): void {
      let str:string = <string>this.data.numVal;
      if(str.length > 0) 
      this.data.numVal = this.data.numVal.slice(0, -1);
    }

    
  }