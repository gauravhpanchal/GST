import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsrOrdService } from '../usr-ord.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  ordId: string;
  book: any;
  pgMsg: any;

  constructor(private aRoute: ActivatedRoute, private fetch: UsrOrdService) { }

  ngOnInit() {
    this.aRoute.params.subscribe(
      param => {
        this.ordId = param['ordId'];
        this.fetch.getOneOrder(this.ordId).subscribe(
          res => { this.book = res; },
          err => { this.pgMsg = {msg: err.error, alert: "alert-danger"}; }
        );
        // setTimeout(() => {
        //     this.pgMsg = null
        // },2500);
      }
    )
  }

}
