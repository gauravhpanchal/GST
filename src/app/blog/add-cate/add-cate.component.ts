import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-add-cate',
  templateUrl: './add-cate.component.html',
  styleUrls: ['./add-cate.component.scss']
})
export class AddCateComponent implements OnInit {

  cateFrm: FormGroup;
  cateSubmit: boolean = false;
  cateBtm: boolean = false;
  pgMsg: any;

  constructor(private formBuilder: FormBuilder, private route: Router, private fetch: BlogService) { }

  ngOnInit() {
    this.cateFrm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  get ctFrm() { return this.cateFrm.controls; }

  newCate(): void {
    this.cateSubmit = true;
    this.cateBtm = true;
    if (this.cateFrm.invalid) {
      this.cateBtm = false;
      return;
    } else {
      let formObj = this.cateFrm.getRawValue();
      this.fetch.addCate(formObj).subscribe(
        res => {
          this.pgMsg = { msg: res, alert: 'alert-success' };
          this.cateFrm.reset();
          this.cateBtm = false;
          this.cateSubmit = false;
          setTimeout(() => {
            this.route.navigate(["/category/all"]);
          }, 1500);
        },
        err => {
          this.pgMsg = { msg: err.error, alert: 'alert-danger' };
          this.cateBtm = false;   //
        }
      )
    }
  }

}
