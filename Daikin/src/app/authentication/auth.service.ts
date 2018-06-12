
import { Observable } from 'rxjs/Observable';
import { IUser } from './../models/interfaces';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';


import { HttpClientService } from '../http/http-client.service';
import { AppService } from '../app.service';
import { UtilService } from '../shared/util/util.service';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST,OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type"


//   })
// };

//import { HttpInterception } from '../shared/http-interception';

@Injectable()
export class AuthService {
    constructor(private http: HttpClientService, private app: AppService) {
    }
    // constructor(private $sessionStorage: SessionStorageService, private $localStorage: LocalStorageService,
    // private http:HttpClient) {
    // }

    getLogin(user: IUser): Observable<any[]> {
        let url: string = "checkSSOPassword?empCode=" + user.userName +"&oldPassword="+ user.password + "&newPassword=";
        let result = this.http.Getxml<any>(url);
        return result;
    }
    getLogout(): Observable<boolean> {
        let user: IUser = this.app.getLocalStorage('userAuth');
        let url: string = "user/logout";        
        return Observable.of(true);
        //return this.http.Post<boolean>(url,user);
    }
    getUserAuth(): boolean {
        return this.app.getLocalStorage('isAuth');
        // let user:IUser={};
        // return user;
    }
    getAsmx(): Observable<any> {
        return this.http.Getxml("GetEmployeeInfo?empCode=22240");
        // let user:IUser={};
        // return user;
    }

    getProfile(customerID: string): Observable<any[]> {
        let url: string = 'GetEmployeeInfo?empCode=' + customerID;
        let result = this.http.Getxml<any>(url);
        return result;
    }

    getCheckKIOSK(ip: string): Observable<any> {
        let url: string = 'checkKIOSK?ip=' + ip;
        let result = this.http.Getxml<any>(url);
        return result;
    }

    getIpClient(): Observable<string> {
        let url: string = 'clientIP';
        return this.http.Getxml(url);
    }
    getByRFID(id: string): Observable<string> {
        let url: string = 'getEmployeeCodebyRFID?rfid=' + id;
        return this.http.Getxml(url);
    }
     getNews(): Observable<any>{
        let url: string = 'getNews';
        return this.http.Getxml(url);
    } 
}
