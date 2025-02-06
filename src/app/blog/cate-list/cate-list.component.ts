import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-cate-list',
  templateUrl: './cate-list.component.html',
  styleUrls: ['./cate-list.component.scss']
})
export class CateListComponent implements OnInit {

  cateList: any;
  pgMsg: any;

  constructor(private fetch: BlogService) { }

  ngOnInit() {
    this.getCate();
  }

  getCate(): void {
    this.fetch.getAllCate().subscribe(
      res => { this.cateList = res; },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    );

    setTimeout(() => {
        this.pgMsg = null;
    },3500);
  }

  delCate(id: string , index: number): void {
    if(confirm("Are you sure you want to delete?")) {
      this.fetch.delCate(id).subscribe(
        res => {
          this.pgMsg = {msg: "Category deleted successfully!", alert: 'alert-success'};
          this.cateList.splice(index, 1);
        },
        err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
      );
    }

    setTimeout(() => {
        this.pgMsg = null;
    },3500);
  }

}
