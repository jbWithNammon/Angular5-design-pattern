import { IncorrectDialog } from './Modal/password/password.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { HomeComponent } from './home/home.component';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';

import { LayoutComponent }    from './layout/layout.component';

import { SharedService } from './shared.service';
import { AppService } from '../app.service';
import { SharedRoutingModule } from './shared-routing.module';
import { NotFoundComponent } from './notFound/notFound.component';
import { NumPadDirective } from '../shared/directive/numpad.directive';
import { NumPadDialog } from '../shared/directive/dialog/numpad.component.dialog';
import { MatDialogModule,MatButtonModule } from '@angular/material';
import { BottomComponent } from './bottom/bottom.component';
import { DialogComponent } from '../shared/Modal/dialog/dialog.component';
import { ModalModule } from '../shared/Modal/modal.module';
import { IdleDialog } from './Modal/idle/idle.component';
import { DragScrollDirective } from './directive/dragscroll.directive';
import { DivDragScrollDirective } from './directive/divdragscroll.directive';
import { SubDropDownDirective } from './directive/subdropdown.directive';


//import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    SharedRoutingModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    LayoutComponent,
    HomeComponent,
    NotFoundComponent,
    BottomComponent,
    LeftBarComponent,
    NumPadDirective,
    NumPadDialog,
    DialogComponent,
    IdleDialog,
    IncorrectDialog,
    DragScrollDirective,
    DivDragScrollDirective,
    SubDropDownDirective
    
  ],entryComponents: [
    NumPadDialog,
    DialogComponent,
    IdleDialog,
    IncorrectDialog
  ],
  providers: [SharedService],
  exports:[LayoutComponent,LeftBarComponent,BottomComponent,NumPadDirective,
    DragScrollDirective,DivDragScrollDirective,SubDropDownDirective]
})
export class SharedModule {}