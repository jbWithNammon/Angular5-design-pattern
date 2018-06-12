import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { Injectable } from "@angular/core";
import { HttpClientService } from '../../http/http-client.service';
import { AppService } from '../../app.service';


@Injectable()
export class ModalService {
    constructor(private http: HttpClientService,private app: AppService) {
    }

    verifyOTP(refCode: string, otpPassword): Observable<any[]> {
        let url: string = 'verifyOTP?refCode=' + refCode + '&otpPassword=' + otpPassword;
        let result = this.http.Getxml<any>(url);
        return result;
    }

    genOTPPassword(mobileNo: string): Observable<any> {
/*      let mock: string;
        mock = 'YXLE';
        return Observable.of(mock); */
        let empCode = this.app.getLocalStorage('userAuth');
        let url: string = 'genOTPPassword?empCode=' + empCode.userName + '&telNo=' + mobileNo;
        let result = this.http.Getxml<any>(url);
        return result;
    }
}