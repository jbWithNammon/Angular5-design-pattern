import { IMenu, ISubMenu } from "../models/interfaces";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { Injectable } from "@angular/core";

@Injectable()
export class SharedService {
    // constructor(private http:HttpClient) {
    // }
    private menu: IMenu[];
    constructor() {
    }
    getMenu(roleId: number): Observable<IMenu[]> {
        if (roleId == 1) {
            this.menu = [
                { sequence: 1, display: 'Customer', link: 'Customers' },
                { sequence: 2, display: 'Product', link: 'Products' },
                { sequence: 3, display: 'Order', link: 'Orders' }];
        }
        else {
            this.menu = [
                { sequence: 1, display: 'SubCustomer', link: 'Customers' },
                { sequence: 2, display: 'SubProduct', link: 'Products' },
                { sequence: 3, display: 'SubOrder', link: 'Orders' }];
        }
        return Observable.of(this.menu);
    }

    getSubMenu(moduleId: number): Observable<ISubMenu[]> {
        let subMenu: ISubMenu[];
        if (moduleId == 1) {
            subMenu = [
                { Link: "/general", Class: "fa fa-address-card", Display: "ประวัติส่วนตัว", Sequence: 1 },
                { Link: "/bus", Class: "fa fa-car", Display: "ข้อมูลสายรถ", Sequence: 2 },
                { Link: "/family", Class: "fa fa-users", Display: "ข้อมูลครอบครัว", Sequence: 3 },
                { Link: "/benefits", Class: "fa fa-smile", Display: "ข้อมูลสวัสดิการ", Sequence: 4 },
                { Link: "/tax", Class: "fa fa-wpforms", Display: "ข้อมูลภาษี", Sequence: 5 }
            ]
        }
        return Observable.of(subMenu);
    } 
}