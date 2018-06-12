import { Injectable } from '@angular/core';
import { IFamilyDetail } from './../models/interfaces';
import { IFamilyBenefitDetail } from './../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../http/http-client.service';
import { AppService } from '../app.service';
import { IUser } from './../models/interfaces';

@Injectable()
export class FamilyService {

  constructor(private httpClientService: HttpClientService, private app: AppService) { }

  getUserInfo(): string {
    let user: IUser = this.app.getLocalStorage('userAuth');
    return user.userName;
  }

  getFamilyDetail(customerID: string): Observable<any[]> {
    let url: string = "GetFamilyInfo?empCode="+customerID;
    let result = this.httpClientService.Getxml<any>(url);
    return result;
  }

  getBefPorvidentfund(customerID: string): Observable<any[]> {
    let url: string = "GetBeneficiaryOfProvidentFundInfo?empCode="+customerID;
    let result = this.httpClientService.Getxml<any>(url);
    return result;
  }

  getlifeInsurance(customerID: string): Observable<any[]> {
    let url: string = "GetBeneficiaryOfLifeInsuranceInfo?empCode="+customerID;
    let result = this.httpClientService.Getxml<any>(url);
    return result;
  }
}
