import { Component, OnInit , Inject,Renderer2,ViewEncapsulation} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MessageResource } from '../../resources/message.resource';
import { ModalService } from '../modal.service';
var parseString = require('xml2js').parseString;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
    constructor(private service: ModalService,
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,public message: MessageResource
    ) {}

    txtPasswordOTP : string;
    //result: any;
    refCode: string;
    result:boolean;
    isIncorrect:boolean;

    ngOnInit() {
        this.isIncorrect = false;
        this.txtPasswordOTP ='';
        if(this.data.dialogType == "OTP"){
          this.genOTPPassword();
        }
        
    }

    closeDialog(){
        this.dialogRef.close();
    }

    
    genOTPPassword(){
      let self = this;
     this.service.genOTPPassword(this.data.mobileNumber).subscribe(
       res => {
         parseString(res, function (err, result) {
           self.refCode = result.string._;
         });
       }
     );
     }
     
     summitOTP() : any {
     let self = this;
     this.service.verifyOTP(this.refCode,this.txtPasswordOTP).subscribe(
         res => {
           parseString(res, function (err, result) {
             if (result.int._ == '1') {
                self.dialogRef.close(true);
             } else {
                self.isIncorrect = true;
             }
           });
         }
       );
     }

}

