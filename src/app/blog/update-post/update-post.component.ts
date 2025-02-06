import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
declare var MediumEditor:any;

const BUTTONS = [
  'bold','italic','underline','subscript','superscript','anchor','quote','pre','orderedlist','unorderedlist', 'justifyLeft','justifyCenter','justifyRight','justifyFull','h2','h3','h4', 'image', 'html', 'removeFormat'];


@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit, AfterViewInit {

  editor:any;
  tourEditor:any;
  locEditor:any;
  galleryEditor:any;
  reviewEditor:any;
  faqEditor:any;
  @ViewChild('editable',{
    static:true
  }) editable:ElementRef;

  @ViewChild('tourEditable',{
    static:true
  }) tourEditable:ElementRef;

  @ViewChild('locEditable',{
    static:true
  }) locEditable:ElementRef;

  @ViewChild('glyEditable',{
    static:true
  }) glyEditable:ElementRef;

  @ViewChild('rvwEditable',{
    static:true
  }) rvwEditable:ElementRef;

  @ViewChild('faqEditable',{
    static:true
  }) faqEditable:ElementRef;

  postFrm: FormGroup;
  postSubmit: boolean = false;
  postBtm: boolean = false;
  cateList: any;
  pgMsg: any;
  postURL: string;

  constructor(private formBuilder: FormBuilder, private route: Router, private aRoute: ActivatedRoute, private fetch: BlogService) { }

  ngOnInit() {
    this.postFrm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      details: ['', Validators.required],
      tourPlan:  [''],
      locArea:  [''],
      gallery:  [''],
      review:  [''],
      faq:  [''],
      imgUrl: ['', Validators.required],
      schDes: ['', Validators.required],
      schKey: ['', Validators.required],
      status: ['true', Validators.required]
    });
    
    this.fetch.getAllCate().subscribe(
      res => { this.cateList = res },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    );
  }

  ngAfterViewInit(): void {
    this.editor = new MediumEditor(this.editable.nativeElement,{
      autoLink: true,
      targetBlank: true,
      paste: {
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir','name'],
        cleanTags: ['meta'],
        unwrapTags: []
      },
      toolbar: {
          allowMultiParagraphSelection: true,
          buttons: BUTTONS,
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
          //align: 'center',
          // sticky: true,
          // updateOnEmptySelection: false
      }
    });

    this.tourEditor = new MediumEditor(this.tourEditable.nativeElement,{
      autoLink: true,
      targetBlank: true,
      paste: {
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir','name'],
        cleanTags: ['meta'],
        unwrapTags: []
      },
      toolbar: {
          allowMultiParagraphSelection: true,
          buttons: BUTTONS,
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
          //align: 'center',
          // sticky: true,
          // updateOnEmptySelection: false
      }
    });
    this.locEditor = new MediumEditor(this.locEditable.nativeElement,{
      autoLink: true,
      targetBlank: true,
      paste: {
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir','name'],
        cleanTags: ['meta'],
        unwrapTags: []
      },
      toolbar: {
          allowMultiParagraphSelection: true,
          buttons: BUTTONS,
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
          //align: 'center',
          // sticky: true,
          // updateOnEmptySelection: false
      }
    });
    this.galleryEditor = new MediumEditor(this.glyEditable.nativeElement,{
      autoLink: true,
      targetBlank: true,
      paste: {
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir','name'],
        cleanTags: ['meta'],
        unwrapTags: []
      },
      toolbar: {
          allowMultiParagraphSelection: true,
          buttons: BUTTONS,
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
          //align: 'center',
          // sticky: true,
          // updateOnEmptySelection: false
      }
    });
    this.reviewEditor = new MediumEditor(this.rvwEditable.nativeElement,{
      autoLink: true,
      targetBlank: true,
      paste: {
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir','name'],
        cleanTags: ['meta'],
        unwrapTags: []
      },
      toolbar: {
          allowMultiParagraphSelection: true,
          buttons: BUTTONS,
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
          //align: 'center',
          // sticky: true,
          // updateOnEmptySelection: false
      }
    });

    this.faqEditor = new MediumEditor(this.faqEditable.nativeElement,{
      autoLink: true,
      targetBlank: true,
      paste: {
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir','name'],
        cleanTags: ['meta'],
        unwrapTags: []
      },
      toolbar: {
          allowMultiParagraphSelection: true,
          buttons: BUTTONS,
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
          //align: 'center',
          // sticky: true,
          // updateOnEmptySelection: false
      }
    });

    this.aRoute.params.subscribe(param => {
      this.postURL = param['postId'];
      this.fetch.getOnePost(this.postURL).subscribe(
        res => {
          const data: any = res;
          this.postFrm.patchValue({
            title: data.title,
            category: data.category,
            details: data.details,
            tourPlan: data.tourPlan,
            locArea: data.location,
            gallery: data.gallery,
            review: data.reviews,
            faq: data.faq,
            imgUrl: data.imgUrl,
            schDes: data.schDes,
            schKey: data.schKey,
            status: data.status
          });
          this.editor.elements[0].innerHTML = data.details;
          this.tourEditor.elements[0].innerHTML = data.tourPlan;
          this.locEditor.elements[0].innerHTML = data.location;
          this.galleryEditor.elements[0].innerHTML = data.gallery;
          this.reviewEditor.elements[0].innerHTML = data.reviews;
          this.faqEditor.elements[0].innerHTML = data.faq;
        },
        err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
      );
    });
  }

  get pstFrm() { return this.postFrm.controls; }

  updatePost(): void {
    this.postFrm.patchValue({details: this.editor.elements[0].innerHTML});
    this.postFrm.patchValue({tourPlan: this.tourEditor.elements[0].innerHTML});
    this.postFrm.patchValue({locArea: this.locEditor.elements[0].innerHTML});
    this.postFrm.patchValue({gallery: this.galleryEditor.elements[0].innerHTML});
    this.postFrm.patchValue({review: this.reviewEditor.elements[0].innerHTML});
    this.postFrm.patchValue({faq: this.faqEditor.elements[0].innerHTML});

    this.postSubmit = true;
    this.postBtm = true;
    if(this.postFrm.invalid) {
      this.postBtm = false;
      return;
    } else {
      let formObj = this.postFrm.getRawValue();
      this.fetch.modPost(formObj, this.postURL).subscribe(
        res => {
          this.pgMsg = {msg: res, alert: 'alert-success'};
          this.postFrm.reset();
          this.postBtm = false;
          this.postSubmit = false;
          setTimeout(() => {
            this.route.navigate(["/post/all"]);
          },1500);
        },
        err => {
          this.pgMsg = {msg: err.error, alert: 'alert-danger'};
          this.postBtm = false;
        }
      )
    }
  }

}
