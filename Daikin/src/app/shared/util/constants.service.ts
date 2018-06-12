import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { KeyedCollection } from '../../models/dictionary';
import {subMenu} from '../../models/constants';

@Injectable()
export class MessageResource {
    lang: string;    
    public display = new KeyedCollection<string>();

    constructor(private app: AppService) {
        this.lang = this.app.getLocalStorage('appLang');
        this.initLanguage(this.lang);


        // if (Meteor.isServer) {  
        //   serverMod = require('./top-secret');
        // }
    }

    private _lang = new BehaviorSubject<string>(this.lang);
    obLang = this._lang.asObservable();

    langListener(id: string) {
        this._lang.next(id);
        //console.log('id',id);
        this.initLanguage(id);
    }
    private initLanguage(lang: string) {
        // let self = this;
        // if (lang == 'TH') {
        //     import("./th.json").then(function (data) {
               
       this.setMessage(JSON[lang]);
        //     });
        // } else if (lang == 'EN') {
        //     import("./en.json").then(function (data) {
        //         self.setMessage(data);
        //     });
        // } else if (lang == 'VT') {
        //     //this.display = 'vietnam';
        // }
    }

    setMessage(resource: any) {
        // let keys = Object.keys(resource);
        // for (let i = 0; i < keys.length; i++) {
        //     let key = keys[i];            
        //     this.display.Add(key, resource[key]);                      
        //}
        //debugger;
        let self = this;
        Object.keys(resource).forEach(function(key) {
            self.display.Add(key, resource[key]); 
          })        
    }
    getMessage(key:string):string{
return this.display.Item(key);
    }
}