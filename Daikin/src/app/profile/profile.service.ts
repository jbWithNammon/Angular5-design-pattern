import { IProfile } from './../models/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { AppService } from '../app.service';
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class ProfileService {

    constructor(private http: HttpClientService, private app: AppService) {
    }
    getProfile(customerID: string): Observable<any[]> {
        let url: string = 'GetEmployeeInfo?empCode=' + customerID;        
        let result = this.http.Getxml<any>(url);
        return result;
    }

    saveInternalPhone(empCode: string, intel: string, pct: string): Observable<any> {
        let url: string = 'updateTelephone?empCode=' + empCode + '&tel=' + pct + '&phs=' + intel;
        let result = this.http.Get<any>(url);
        return result;
    }
    savePCT(empCode: string, intel: string, pct: string): Observable<any> {
        let url: string = 'updateTelephone?empCode=' + empCode + '&tel=' + pct + '&phs=' + intel;
        let result = this.http.Get<any>(url);
        return result;
    }
}
