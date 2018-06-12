import { Directive, HostListener, ElementRef, Input, NgModule, Component, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NumPadDialog } from './dialog/numpad.component.dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Directive({
  selector: '[numpad]'
})

export class NumPadDirective {   
  constructor(private el: ElementRef,public dialog: MatDialog) { }  
  //@Input() defaultColor: string;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);
 @Input('numpad') numpad: string;
  
  @HostListener('mousedown') onMouseDown() {    
    //console.log(this.el.nativeElement.value);
    //this.el.nativeElement.value = '5555';
    this.openDialog();
  }  
  openDialog(): void {
    let result = 'test';
    let dialogRef = this.dialog.open(NumPadDialog, {
     // width: '700px',
     // height:'600px',
      //position:{top:'100px'},     
      disableClose:true,
      data: { numVal: this.el.nativeElement.value, tmpVal: this.el.nativeElement.value, elCallBack: this.el },
      closeOnNavigation : false
    });
    dialogRef.afterClosed().subscribe(res => { 
      this.ngModelChange.emit(res);
      //this.el.nativeElement.mod = res 
    });
    //return result
}
}
