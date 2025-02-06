import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-pg',
  templateUrl: './upload-pg.component.html',
  styleUrls: ['./upload-pg.component.scss']
})
export class UploadPgComponent implements OnInit {

  imgList: any;
  totalImg: number;
  pgMsg: any;
  upType: string = '1';
  percent: number = 0;
  uploading: boolean = false;
  imgUp: string;
  upFrmData: any;
  upIco: boolean = true;
  defaultImg: any = '/assets/images/upload.svg';

  constructor(private fetch: UploadService) { }

  upTypes: string[] = ['jpg', 'jpeg', 'png', 'gif', 'csv', 'docx', 'xlsx', 'xls', 'pdf'];

  ngOnInit() {
    this.getImages();
  }

  getImages(): void {
    this.fetch.getImages().subscribe(
      res => {
        this.imgList = res;
        this.totalImg = this.imgList.length;

      },
      err => { this.pgMsg = err.error; }
    );
  }

  onChange(e: any): void {
    this.getImages();
  }


  selectFile(event) {
    const fileName = event.target.files[0].name.split('.');

    if (!this.upTypes.find(x => x === fileName[1])) {
      this.pgMsg = "Invalid file... Please select only jpg/jpeg/png/gif file";
      return false;
    }

    if (event.target.files[0].size >= 4148576) {
      this.pgMsg = "Image must small than 4mb";
      return false;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      this.upIco = false;
      this.defaultImg = reader.result;
    }

    const uFrm = new FormData();

    const fName = fileName[0].toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    uFrm.append('upImg', event.target.files[0], fName + "-" + Date.now().toString() + '.' + fileName[1]);
    uFrm.append('upType', this.upType);

    this.upFrmData = uFrm;

  }

  uploadNow(): void {
    this.uploading = true;
    this.fetch.uploadPostImg(this.upFrmData).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percent = Math.round(((event.loaded / event.total) * 100));
        } else if (event.type === HttpEventType.Response) {
          let res: any = event.body;
          this.pgMsg = res;
          this.uploading = false;
          this.getImages();
          this.upIco = true;
          this.defaultImg = '/assets/images/upload.svg';
          this.imgUp = "";
        }
      },
      (error) => {
        this.uploading = false;
        this.pgMsg = { msg: error, alert: 'alert-danger' };
      }
    );

  }

}
