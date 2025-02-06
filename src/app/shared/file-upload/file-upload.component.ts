import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GstService } from 'src/app/gst/gst.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input('uploadFileLableName') uploadFileLableName: string = 'Image';
  @Input('fileTypes') upTypes: string[] = ['jpg', 'jpeg', 'png', 'gif', 'csv', 'docx', 'xlsx', 'xls', 'pdf'];
  @Input('fileDetails') fileDetails: any[] = [];
  fileList: any[] = [
    {
      url: 'https://www.google.com/',
      originalFileName: 'google',
      fileName: 'google',
      fileType: 'img',
      fileExtension: '.png',
      documentName: 'Lease/Leave and License Agreement'
    }
  ];
  fileObject: any = {
    url: '',
    originalFileName: '',
    fileName: '',
    fileType: '',
    fileExtension: '',
    documentName: ''
  }
  @Output() sendFileDetails = new EventEmitter();
  @Output() sendRemoveFileDetails = new EventEmitter();
  @Input('DocumentNameList') DocumentNameList: string[] = [];

  selectedDocumentName: string = "-1";
  isDocumentNameSelected: boolean = false;
  isFileSelected: boolean = false;

  uplodedNewFileDetails: any = {
    originalFileName: '',
    fileName: '',
    fileType: '',
    fileExtension: ''
  };

  pgMsg: any = null;
  percent: number = 0;
  uploading: boolean = false;
  imgUp: string = "";
  upFrmData: any;
  upIco: boolean = true;
  defaultImg: any = '/assets/images/upload.svg';

  constructor(private service: GstService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.defaultImg = '/assets/images/upload.svg';
    this.pgMsg = null
    this.uplodedNewFileDetails.url = '';
    this.uplodedNewFileDetails.originalFileName = '';
    this.uplodedNewFileDetails.fileName = '';
    this.uplodedNewFileDetails.fileType = '';
    this.uplodedNewFileDetails.fileType = '';

    const fileType = event.target.files[0].type;
    const fileName = event.target.files[0].name.split('.');
    const chekExt = this.upTypes.find(x => x == fileName[1]);
    if (typeof (chekExt) == 'undefined') {
      this.pgMsg = { msg: `Invalid file Type... Please select only ${this.upTypes.join('/')} file`, alert: 'alert-danger' };
      return false;
    }

    // if (event.target.files[0].size >= 4148576) {
    //   this.pgMsg = { msg: "Image must small than 4mb", alert: 'alert-danger' };
    //   return false;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      this.upIco = false;
      if (fileType.includes('image/'))
        this.defaultImg = reader.result;
    }
    const uFrm = new FormData();
    const fName = fileName[0].toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    this.uplodedNewFileDetails.originalFileName = event.target.files[0].name;
    this.uplodedNewFileDetails.fileName = fName + "-" + Date.now().toString() + '.' + fileName[1]
    this.uplodedNewFileDetails.fileExtension = fileName[1];
    this.uplodedNewFileDetails.fileType = fileType;
    this.uplodedNewFileDetails.documentName = this.selectedDocumentName;
    uFrm.append('forumPhoto', event.target.files[0], this.uplodedNewFileDetails.fileName);
    this.upFrmData = uFrm;
  }

  uploadNow(): void {
    this.uploading = true;
    this.service.uploadImg(this.upFrmData).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percent = Math.round(((event.loaded / event.total) * 100));
        } else if (event.type === HttpEventType.Response) {
          let res: any = event.body;
          this.pgMsg = res;
          this.uploading = false;
          this.upIco = true;
          this.imgUp = "";
          const fileInfo = { ...this.uplodedNewFileDetails, url: `https://gstfiles.s3.amazonaws.com/gst/${this.uplodedNewFileDetails.fileName}`, uploadedOn: new Date() };
          this.defaultImg = '/assets/images/upload.svg';
          this.sendFileDetails.emit(fileInfo);
          this.selectedDocumentName = "-1"
        }
      },
      (error) => {
        this.uploading = false;
        this.pgMsg = { msg: error, alert: 'alert-danger' };
      }
    );

  }

  downloadNow() {
    //window.open(this.fileDetails.url, '_blank');
  }
  downloadFile(file: any) {
    window.open(file.url, '_blank');
  }

  UploadFile() {
    this.uploadNow();
  }

  removeFile(file: any) {
    if (confirm("Are you sure you want to delete this file!!!")) {
      this.sendRemoveFileDetails.emit(file);
    }
  }


}
