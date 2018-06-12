import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
var parseString = require('xml2js').parseString;



@Injectable()
export class UtilService {
    constructor() {

    }
    public xml2json(xml: any): any {
        parseString(xml, (err, result) => {
            return (result);
        });
    }
}