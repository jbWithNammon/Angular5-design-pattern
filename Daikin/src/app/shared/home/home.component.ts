import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation, HostListener} from '@angular/core';
import { SharedService } from '../shared.service';
import { IMenu } from "../../models/interfaces";
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { UserIdleService } from 'angular-user-idle';
import { IdleDialog } from '../Modal/idle/idle.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../authentication/auth.service';
import { LayoutComponent } from '../layout/layout.component';
import { MessageResource } from '../../shared/resources/message.resource';
@Component({
  selector: 'shared-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  dialogRef: any;
  constructor(private router: Router, private route: ActivatedRoute,
    private app: AppService,private userIdle: UserIdleService,
    private auth:AuthService,
    public dialog: MatDialog,
    public message: MessageResource) {
  
  }

ngOnInit(){ 
  this.app.setLocalStorage('isSelected', false);
  this.app.leftbarListener(0); 
  this.userIdle.startWatching();    
  this.userIdle.onTimerStart().subscribe(count => {
        if(this.app.getLocalStorage('isAuth')){
    if(count == 1 ){      
      this.openDialog();
      this.app.idleListener(count);
    }else{
      this.app.idleListener(count);
    } 
  }else{
    this.dialogRef.close();
    this.userIdle.stopWatching();
  }
  });
  
  // Start watch when time is up.
  this.userIdle.onTimeout().subscribe(() => 
  this.auth.getLogout().subscribe(res => {
    //debugger;
    if (res) {        
      this.dialogRef.close();
      this.userIdle.stopWatching();
      this.app.leftbarListener(0);
      this.app.authListener(!res);        
      this.app.setLocalStorage('isAuth',!res);
      //this.router.navigate(['auth/login']);
      this.router.navigateByUrl('/auth/login');
    }
  }, err => {

  })
);
}
navMenu(path:string){  
  this.router.navigate(['/'+path]);
  //this.app.isSelListener(true);  
  if(path == "general")this.app.leftbarListener(1);
  else if(path == "attendance")this.app.leftbarListener(1);
  else if(path == "Tax")this.app.leftbarListener(1);  
  
}

@HostListener('document:click', ['$event'])
clickout(event) {
  this.restart();
  if(this.dialogRef != null) {
    this.dialogRef.close();
  }
/*   if(this.dialogRef != undefined)
  this.dialogRef.close(); */
  //console.log('click');
  // if(this.eRef.nativeElement.contains(event.target)) {
  //   this.text = "clicked inside";
  // } else {
  //   this.text = "clicked outside";
  // }
}

stop() {
  this.userIdle.stopTimer();
}

stopWatching() {
  this.userIdle.stopWatching();
}

startWatching() {
  
  this.userIdle.startWatching();
}

restart() {
  this.userIdle.resetTimer();
}
openDialog(): void {
  let result = 'test';
  this.dialogRef = this.dialog.open(IdleDialog, {
     width: '350px',
   // height:'600px',
    //position:{top:'100px'},     
    autoFocus: false,
    data: { time: 0}
  });
  // dialogRef.afterClosed().subscribe(res => { 
  //   this.ngModelChange.emit(res);
  //   //this.el.nativeElement.mod = res 
  // });
  
}


}
