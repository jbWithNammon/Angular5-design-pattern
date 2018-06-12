import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IWalfareModel } from '../models/interfaces';
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class BenefitsService {

  constructor(private http: HttpClientService) { }

  getInformation(customerID: string): Observable<any> {
    let url: string = 'GetUniformInfo?empCode=' + customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  getFamilyDetail(customerID: string): Observable<any[]> {
    let url: string = "GetFamilyInfo?empCode="+customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetUniformInfoForOtherType(customerID: string): Observable<any> {
    let url: string = 'GetUniformInfoForOtherType?empCode=' + customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetUniformInfoForFamilyTrip(customerID: string): Observable<any> {
    let url: string = 'GetUniformInfoForFamilyTrip?empCode=' + customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetSocialSecurityProvidentFundModel(customerID: string): Observable<any> {
    let url: string = 'GetEmployeeInfo?empCode=' + customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetDropdownListShirt(customerID: string): Observable<any> {
    let url: string = 'GetUniformListOnShirtType?empCode=' + customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetDropdownTrouserType(customerID: string): Observable<any> {
    let url: string = 'GetUniformListOnTrouserType?empCode=' + customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetDropdownBearSuitType(customerID: string): Observable<any> {
    let url: string = 'GetUniformListOnBearSuitType?empCode=' + customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetDropdownCapType(customerID: string): Observable<any> {
    let url: string = 'GetUniformListOnCapType?empCode=' + customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetDropdownShoeType(customerID: string): Observable<any> {
    let url: string = 'GetUniformListOnShoeType?empCode=' + customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetDropdownTShirtType(customerID: string): Observable<any> {
    let url: string = 'GetUniformListOnTShirtType?empCode=' + customerID;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetDropdownOtherType(): Observable<any> {
    let url: string = 'GetUniformListForOtherType';
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetDropdownFamily_Adult(): Observable<any> {
    let url: string = 'GetUniformListForFamily_Adult';
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetDropdownFamily_Child(): Observable<any> {
    let url: string = 'GetUniformListForFamily_Child';
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetPeriodForModifyUniform(): Observable<any> {
    let url: string = 'GetPeriodForModifyUniform';
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetPeriodForModifyUniformOnFamilyTrip(): Observable<any> {
    let url: string = 'GetPeriodForModifyUniformOnFamilyTrip';
    let result = this.http.Getxml<any>(url);
    return result;
  }

  GetPeriodForModifyUniformOnOtherType(): Observable<any> {
    let url: string = 'GetPeriodForModifyUniformOnOtherType';
    let result = this.http.Getxml<any>(url);    
    return result;
  }

  UpdateEmployeeUniform(empCode: string, uniformType: string, size: string): Observable<any> {
    let url: string = 'UpdateUniform?empCode=' + empCode + '&uniformType=' + uniformType + '&size=' + size;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  UpdateOtherUniform(empCode: string, size: string): Observable<any> {
    let url: string = 'UpdateUniformForOtherType?empCode=' + empCode + '&size=' + size;
    let result = this.http.Getxml<any>(url);
    return result;
  }

  UpdateFamilyTripUniform(empCode: string, uniformCategory: string, size: string): Observable<any> {
    let url: string = 'UpdateUniformForFamilyTrip?empCode=' + empCode + '&uniformCategory=' + uniformCategory + '&size=' + size;
    let result = this.http.Getxml<any>(url);
    return result;
  }
}
