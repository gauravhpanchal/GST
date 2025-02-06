import { Component, OnInit } from '@angular/core';
import { TestimonialsService } from '../testimonials.service';

@Component({
  selector: 'app-testy-list',
  templateUrl: './testy-list.component.html',
  styleUrls: ['./testy-list.component.scss']
})
export class TestyListComponent implements OnInit {

  testyList: any;
  pgMsg: any;

  constructor(private fetch: TestimonialsService) { }

  ngOnInit() {
    this.getTesty();
  }

  getTesty(): void {
    this.fetch.getAllTesty().subscribe(
      res => { this.testyList = res; },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    );
    setTimeout(() => {
        this.pgMsg = null;
    },3500);
  }


  delTesty(id: string , index: number): void {
    if(confirm("Are you sure you want to delete?")) {
      this.fetch.delTesty(id).subscribe(
        res => {
          this.pgMsg = {msg: "Testimonial deleted successfully!", alert: 'alert-success'};
          this.testyList.splice(index, 1);
        },
        err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
      );
    }

    setTimeout(() => {
        this.pgMsg = null;
    },3500);
  }

}
