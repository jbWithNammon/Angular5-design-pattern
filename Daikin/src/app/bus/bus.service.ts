import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { IBus, IBusHis, IBusEdit } from './../models/interfaces';
import { UtilService } from '../shared/util/util.service';
import { HttpClientService } from '../http/http-client.service';
import { AppService } from '../app.service';

@Injectable()
export class BusService {

  constructor(private util:UtilService,private http: HttpClientService,private app: AppService) { }

  getBus(): Observable<IBus[]> {    
    let empCode = this.app.getLocalStorage('userAuth');
    let url: string = "getBusByCode?empCode=" + empCode.userName;
    let result = this.http.Getxml<any>(url);
    return result
}
  getBusHis(): Observable<any> {
    let mode = "EDB"
    let empCode = this.app.getLocalStorage('userAuth');
    let url: string = "getBusChanging?empCode=" + empCode.userName +"&mode="+ mode;
    let result = this.http.Getxml<any>(url);
    return result
}    
  getBusNumberList(): Observable<any> {       
    let url: string = "getBusList";
    let result = this.http.Getxml<any>(url);
    return result
} 

  getBusStopList(busNumber : string): Observable<any> {       
  let url: string = "getBusStopList?bus=" + busNumber;
  let result = this.http.Getxml<any>(url);
  return result
} 

  postSave(busObject : IBusEdit): Observable<any> {  
    let mode = "EDB"
    let empCode = this.app.getLocalStorage('userAuth');
    let url: string = "updateBusAndStop?mode="+ mode+ "&empCode=" + empCode.userName +"&changeType="+ busObject.BusIndex + 
    "&currBusStop=" + busObject.BusAndStopCode + "&newBus=" + busObject.BusCode + "&newStop=" + busObject.StopCode;
    let result = this.http.Get<any>(url);
    return result;
} 
}
