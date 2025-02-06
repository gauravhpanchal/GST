import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  ordId: string;
  book: any;
  pgMsg: any;

  constructor(private aRoute: ActivatedRoute, private fetch: ContactService) { }

  ngOnInit() {
    this.aRoute.params.subscribe(
      param => {
        this.ordId = param['ordId'];
        this.fetch.getOneOrder(this.ordId).subscribe(
          res => {
            this.book = res;
            this.book.sort((var1, var2) => new Date(var2.createdOn).getTime().toString().localeCompare(new Date(var1.createdOn).getTime().toString()));
          },
          err => { this.pgMsg = {msg: err.error, alert: "alert-danger"}; }
        );
        // setTimeout(() => {
        //     this.pgMsg = null
        // },2500);
      }
    )
  }

}
