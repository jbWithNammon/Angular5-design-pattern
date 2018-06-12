import { IConfig } from './../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";




@Injectable()
export class HttpClientService {
    api: string;
    constructor(private http: HttpClient,
        @Inject('web_config') webConfig: IConfig) {            
        this.api = webConfig.ApiEndpoint;
    }

    public Post<T>(url: string, data: any, option?: any): Observable<any> {

        return this.http.post<any>(this.api.concat(url), data, option);
    }
    public Get<T>(url: string, option?: any): Observable<any> {
        return this.http.get<any>(this.api.concat(url), option);
    }
    public Getxml<T>(url: string): Observable<any> {
        let option: any = { responseType: 'text', contentType: 'application/x-www-form-urlencoded' };
        return this.http.get<any>(this.api.concat(url), option);
    }
    public Postxml<T>(url: string, data: any): Observable<any> {
        let option: any = { responseType: 'text', contentType: 'application/x-www-form-urlencoded' };
        return this.http.post<any>(this.api.concat(url), data, option);
    }
    public Getasmx(): Observable<any> {
        let option: any = { responseType: 'text' };
        return this.http.get<any>("http://192.168.10.192:1050/EDBWebService.asmx/GetEmployeeInfo?empCode=22240", option);
    }
    public GetOri<T>(url: string): Observable<any> {
        let option: any = { responseType: 'text', contentType: 'application/x-www-form-urlencoded' };
        return this.http.get<any>(url, option);
    }
}