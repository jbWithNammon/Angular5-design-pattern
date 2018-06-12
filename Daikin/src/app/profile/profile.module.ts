import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { GeneralComponent }    from './general/general.component';
import { ProfileService } from './profile.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    ProfileRoutingModule,
    SharedModule,
    MatDialogModule,
  ],
  declarations: [
    GeneralComponent,
  ],
  providers: [ ProfileService]
})
export class ProfileModule {}