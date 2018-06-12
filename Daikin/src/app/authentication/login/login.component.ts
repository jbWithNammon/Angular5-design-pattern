import { UtilService } from './../../shared/util/util.service';
import { IUser } from './../../models/interfaces';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {AppService} from '../../app.service';
import { INews } from '../../models/interfaces';
import Json from '*.json';
import { MessageResource } from '../../shared/resources/message.resource';
var parseString = require('xml2js').parseString;

@Component({  
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {  
  news:INews[];
  
  constructor(public router: Router, private route: ActivatedRoute,
     private service: AuthService,private app: AppService,private util:UtilService,
     public message: MessageResource) { 
  }

  ngOnInit() {    
  //  this.email = 'admin@email.com';
  //  this.password = '1234';
  //  this.app.obIsAuth.subscribe(data => this.isAuth = data);
    this.getNews();
  } 
  
  getasmx():void{
    let parseString = require('xml2js').parseString;
    let xml = "<root>Hello xml2js!</root>"
    let self = this;
    this.service.getAsmx().subscribe(res=>{
      // xml2js.parseString(res,(err,data)=>{
      //   console.log('err',err);      
      console.log('data',self.util.xml2json(res));
      // });
      parseString(res, function (err, result) {
        console.log(result["EmpItem"]["BankName"]);
      });

    },err=>{
      console.log(err);
    });
    
  } 
  
  getNews(){
    let self = this; 
    // let detail:string ="Facebook's chief executive made the admission during the second day of his questioning in Congress.";
    // detail = detail.concat("Congresswoman Anna Eshoo asked if his own data had been \"included in the data sold to the malicious third parties\".");
    // detail = detail.concat("Mr Zuckerberg delayed before replying: \"Yes.\"");
    // detail = detail.concat("In statements released ahead of the hearing, he admitted to being \"idealistic\" and said he did not grasp how the data of the platform's two billion people could be abused.");
    // detail = detail.concat("He said: \"We didn't take a broad enough view of our responsibility, and that was a big mistake. It was my mistake, and I\'m sorry.");
    // detail = detail.concat("\"I started Facebook, I run it, and I'm responsible for what happens here.");
     
    // self.news = [{PostSubject:'Mark Zuckerberg has revealed his personal data was among that improperly acquired by election consultancy firm Cambridge Analytica',PostDetail:detail,PostDateStr:"12/04/2018"}]
    this.service.getNews().subscribe(res=>{
      parseString(res, function (err, result) {
        self.news = result["ArrayOfNewsItem"]["NewsItem"];
      });

    },err=>{
      console.log(err);
    });
  }
  
}
