import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postList: any;
  pgMsg: any;

  constructor(private fetch: BlogService) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    this.fetch.getAllPost().subscribe(
      res => {
        this.postList = res;
        this.postList.sort((var1, var2) => new Date(var2.updatedOn).getTime().toString().localeCompare(new Date(var1.updatedOn).getTime().toString()));
      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    );

    setTimeout(() => {
        this.pgMsg = null;
    },3500);
  }

  delPost(id: string , index: number): void {
    if(confirm("Are you sure you want to delete?")) {
      this.fetch.delPost(id).subscribe(
        res => {
          this.pgMsg = {msg: "Post deleted successfully!", alert: 'alert-success'};
          this.postList.splice(index, 1);
        },
        err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
      );

    }
    setTimeout(() => {
        this.pgMsg = null;
    },3500);
  }

}
