import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-web-form',
  templateUrl: './web-form.component.html',
  styleUrls: ['./web-form.component.scss']
})
export class WebFormComponent implements OnInit {

  planList: any;
  web: string;
  pgMsg: any;


  constructor(private aRoute: ActivatedRoute, private fetch: ContactService) { }

  ngOnInit() {
    this.fetch.getAllPlan().subscribe(
        res => {
          this.planList = res;
        }
    );
    this.aRoute.params.subscribe(param => {
      this.web = param['site'];
    });
  }

  planFList(list: string) {
    return list.split(',');
  }

}
