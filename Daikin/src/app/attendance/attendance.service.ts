import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { IAttendance } from './../models/interfaces';
import { HttpClientService } from '../http/http-client.service';
import { AppService } from '../app.service';

@Injectable()
export class AttendanceService {

  constructor(private http: HttpClientService,private app: AppService) { }

  getAttendance(adjusment:string): Observable<any> {   
    let empCode = this.app.getLocalStorage('userAuth');
    let url: string = "getAttendances?empCode=" + empCode.userName +"&mm="+ adjusment;
    let result = this.http.Getxml<any>(url);
    return result
}
}
