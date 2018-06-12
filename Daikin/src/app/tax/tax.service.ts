import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { ITax } from './../models/interfaces';
import { HttpClientService } from '../http/http-client.service';
import { AppService } from '../app.service';

@Injectable()
export class TaxService {

  constructor(private http: HttpClientService,private app: AppService) { }

  getTaxData(year:string): Observable<any> {
    var date = new Date(); 
    let empCode = this.app.getLocalStorage('userAuth');
    let url: string = "GetTaxInfo?empCode=" + empCode.userName +"&year="+ year;
    let result = this.http.Getxml<any>(url);
    return result;
}

}
