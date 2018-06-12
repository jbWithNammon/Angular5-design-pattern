import { Component, OnInit} from '@angular/core';
import { SharedService } from '../shared.service';
import { IMenu } from "../../models/interfaces";
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'shared-notFound',
  template:'<h1>Page not found</h1>'
})

export class NotFoundComponent implements OnInit {
//    @Input() parentMessage:string;
//   message:string = "hello from child";
//   sendEmit:string="From Loginddd";
//   @Output() messageEvent = new EventEmitter<string>();
//   menus: IMenu[];
//   isAuth:boolean = false;
//   messEmit:string;
  constructor(private router: Router, private route: ActivatedRoute) {

  }
//   constructor(private service: SharedService, private router: Router, private route: ActivatedRoute,
//     private app: AppService) {

//   }

  ngOnInit() {
    
  }

}
