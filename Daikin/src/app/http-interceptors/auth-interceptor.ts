import { AppService } from './../app.service';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private app:AppService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //debugger;
    let token:string = this.app.getLocalStorage('token')==undefined?'':this.app.getLocalStorage('token');
    const newReq = req.clone({
      setHeaders: {  
        'Authorization':`Basic ${token}`,
    } 

    },);
    return next.handle(newReq);
  }

}