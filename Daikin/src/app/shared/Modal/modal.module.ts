import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { ModalService } from '../Modal/modal.service';
import { DialogComponent } from '../Modal/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    ReactiveFormsModule
  ],
  declarations: [
  ],
  providers: [ModalService]
})
export class ModalModule {}