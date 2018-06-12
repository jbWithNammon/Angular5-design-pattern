import { IConfig } from './models/interfaces';
import { FormsModule } from '@angular/forms';
import { BrowserModule, ɵgetDOM } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from './authentication/auth.module';


import { AppComponent } from './app.component';
import { Router, NavigationStart, NavigationEnd, ChildActivationEnd, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './authentication/login/login.component';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './shared/layout/layout.component';
import { AppService } from './app.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors/index';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AuthGuardService } from './authentication/auth-guard.service';
import { MessageResource } from './shared/resources/message.resource';
import { pairwise, take } from 'rxjs/operators';
import { ProfileModule } from './profile/profile.module';
import { BusModule } from './bus/bus.module';
// import { TaxModule } from './tax/tax.module';
import { AttendanceModule } from './attendance/attendance.module';
// import { FamilyModule } from './family/family.module';
// import { BenefitsModule } from './benefits/benefits.module';
import { BottomComponent } from './shared/bottom/bottom.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserIdleModule } from 'angular-user-idle';
import {TouchEventModule} from "ng2-events/lib/touch";

//import { HttpReqInterceptor } from './shared/http-interception';
// import {AppService} from './app.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    BrowserModule,        
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule, 
    BusModule,
    ProfileModule,
    //FamilyModule,
    AuthModule, 
   // BenefitsModule,
    //TaxModule,
   AttendanceModule, 
    SharedModule,
    HttpClientModule,
    TouchEventModule,   
    UserIdleModule.forRoot({idle: getWebConfig().AppIdle.Idle, timeout: getWebConfig().AppIdle.TimeOut, ping: getWebConfig().AppIdle.Ping})
  ],
  // exports:[AppService],
  providers: [AppService, httpInterceptorProviders,
    SessionStorageService, LocalStorageService, AuthGuardService, MessageResource,
    { provide: 'web_config',useFactory:getWebConfig, deps: [] }],
  bootstrap: [AppComponent],
  exports:[TouchEventModule]
})
export class AppModule {   
  constructor(private router: Router, private service: AppService) {
    if(this.service.getLocalStorage('appLang') == null){
      this.service.setLocalStorage('appLang',getWebConfig().AppLanguage);
    }
  }
  
}
export function getWebConfig():IConfig {
  let ele = document.getElementsByTagName('link')[0];  
  let att:IConfig = JSON.parse(atob(ele.getAttribute('config')));  
  return att;
}