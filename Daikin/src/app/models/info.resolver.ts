import { Observable } from 'rxjs/Observable';
import { Resolve } from "@angular/router";
import { IUser } from "./interfaces";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AppService } from '../app.service';

@Injectable()
export class InfoResolver implements Resolve<IUser>{
    constructor(private app: AppService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IUser {
        let user: IUser = { userName: 'resolve@email' };        
        this.app.roleListener(2);
        return user;
    }
}