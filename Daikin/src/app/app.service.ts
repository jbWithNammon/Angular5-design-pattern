import { IRoute } from './models/interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { subMenu } from './models/constants';


@Injectable()
export class AppService {
  moduleId: number;
  appRoute: IRoute = {};
  constructor(private $sessionStorage: SessionStorageService, private $localStorage: LocalStorageService,
    public router: Router) {
    //debugger;
    this.router.events
      .filter(e => e instanceof RoutesRecognized)
      .pairwise()
      .subscribe((event: any[]) => {
        //console.log('pair',this.router.url);
        this.appRoute.Prev = event[0].url;
        this.appRoute.Current = event[1].url;
        this.appRoute.Refresh = false;
        let tmpMenu = subMenu.find(f => f.Link == this.appRoute.Current);
        if (tmpMenu == undefined)
          this.moduleId = 0;
        else
          this.moduleId = tmpMenu.ModuleId;
        this.leftbarListener(this.moduleId);
      });
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe((event: any) => {
        //console.log('single',this.router.url);
        if (event.url == event.urlAfterRedirects) {
          this.appRoute.Refresh = true;
          this.appRoute.Current = event.url;
          let tmpMenu = subMenu.find(f => f.Link == this.appRoute.Current);
          if (tmpMenu == undefined)
            this.moduleId = 0;
          else
            this.moduleId = tmpMenu.ModuleId;
          this.leftbarListener(this.moduleId);
        }
        else if(event.url == '/' && event.urlAfterRedirects == '/auth/login'){
          if(this.getLocalStorage('isAuth')){
            this.appRoute = this.getLocalStorage('appRoute');
            this.router.navigate([this.appRoute.Current]);
          }          
        }
        this.setUnAuth();
      });

    if (this.getLocalStorage('appLang') == undefined) {
      this.setLocalStorage('appLang', 'TH');
    }
  }
  private isAuth = new BehaviorSubject<boolean>(this.getLocalStorage('isAuth') == undefined ? false : this.getLocalStorage('isAuth'));
  obIsAuth = this.isAuth.asObservable();
  private roleId = new BehaviorSubject<number>(1);
  obRoleId = this.roleId.asObservable();
  private leftbarId = new BehaviorSubject<number>(0);
  obLeftbarId = this.leftbarId.asObservable();
  private idelTime = new BehaviorSubject<number>(0);
  obIdle = this.idelTime.asObservable();
  private isKIOSK = new BehaviorSubject<boolean>(false);
  obKIOSK = this.isKIOSK.asObservable();
  private resize = new BehaviorSubject<number[]>([window.innerWidth,window.innerHeight]);
  obResize = this.resize.asObservable();

  authListener(status: boolean) {
    this.isAuth.next(status);
  }
  roleListener(id: number) {
    this.roleId.next(id);
  }
  leftbarListener(id: number) {
    this.leftbarId.next(id);
  }
  idleListener(id: number) {
    this.idelTime.next(id);
  }
  kioskListener(id: boolean) {
    this.isKIOSK.next(id);
  }
  resizeListener(id: number[]) {  
    this.resize.next(id);
  }
  setLocalStorage(key: string, value: any): void {
    this.$localStorage.store(key, value);
  }
  getLocalStorage(key: string): any {
    return this.$localStorage.retrieve(key);
  }
  removeLocalStorage(key: string): void {
    this.$localStorage.clear(key);
  }
  setSessionStorage(key: string, value: any): void {
    this.$sessionStorage.store(key, value);
  }
  getSessionStorage(key: string): any {
    return this.$sessionStorage.retrieve(key);
  }
  setUnAuth(): void {
    this.setLocalStorage('appRoute',this.appRoute);
    if (this.getLocalStorage('isAuth') && this.appRoute.Current == "/auth/login") {
      if (this.appRoute.Prev == undefined) {
        this.router.navigate(['/Home']);
      } else {
        this.router.navigate([this.appRoute.Prev]);
      }
    }
  }
}