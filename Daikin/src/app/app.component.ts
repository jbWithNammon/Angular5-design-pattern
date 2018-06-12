import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, RoutesRecognized } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Observable } from 'rxjs/Observable';
// import {AppService} from './app.service';
import 'rxjs/add/operator/map';
import { AppService } from './app.service';
import { filter } from 'rxjs/operators';
import { subMenu } from './models/constants';
import { AuthService } from './authentication/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  parentMessage = "";
  message = "";
  messageChild: string = "";
  messageB: string;
  isSelected: boolean = false;
  isAuth: boolean = false;
  isKIOSK:boolean = false;
  connectionState$: Observable<string>;
  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event) {
  //   let date = new Date();
  //   let time = date.getTime();
  //   this.service.setLocalStorage('timeStamp',time);   
  //   //this.service.removeLocalStorage('timeStamp out'); 
  //   //this.service.removeLocalStorage('timeStamp in'); 
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHander(event) {    
  // }
  // @HostListener('window:load', ['$event']) onPageLoad(event) {
    
  //  }
  @HostListener('window:resize', ['$event'])
onResize(event) { 
  this.service.resizeListener([window.innerWidth,window.innerHeight]);
}
  constructor(public router: Router, location: Location,
    private route: ActivatedRoute, private service: AppService, private auth: AuthService) {
     // this.setWindowLoad();   
    //this.service.removeLocalStorage('result');
    this.service.obIsAuth.subscribe(data => {
      this.isAuth = data;
    });
    // this.service.obKIOSK.subscribe(data=>{
    //   this.isKIOSK = data;
    // });
    // const hubConnection = new HubConnection("/signalR");    
    // hubConnection.on('send', data => {
    //   console.log(data);
    // });
    // hubConnection.start().then(() => {
    //   console.log('connected');
    // });

    // this.router.events
    //         .filter(e => e instanceof RoutesRecognized)
    //         .pairwise()
    //   .subscribe((event: any[]) => {
    //     //debugger;
    //             console.log('obj',event);
    //             //console.log(event[0].urlAfterRedirects);
    //         });




  }

  receiveMessage($event) {
    this.message = $event;
  }
  sendToChild() {
    this.parentMessage = "Hello from parent";
  }
  setWindowLoad():void{    
    let date = new Date();
    let time = date.getTime();
    // this.service.setLocalStorage('timeStamp out',this.service.getLocalStorage('timeStamp')); 
    // this.service.setLocalStorage('timeStamp in',time); 
    alert(time - parseInt(this.service.getLocalStorage('timeStamp')));
    if(time - parseInt(this.service.getLocalStorage('timeStamp')) > 6000 && this.service.getLocalStorage('timeStamp') > 0){
      
      
      this.auth.getLogout().subscribe(res => {
        if (res) {         
          this.service.authListener(!res);
          this.service.leftbarListener(0);
          this.service.removeLocalStorage('userAuth');          
        }
      }, err => {
  
      })
    }   
    //this.service.setLocalStorage('timeStamp',time); 
    this.service.setLocalStorage('result', time - parseInt(this.service.getLocalStorage('timeStamp')));
    this.service.setLocalStorage('timeStamp',0); 
  }

}
