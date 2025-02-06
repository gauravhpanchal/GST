import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GstService } from 'src/app/gst/gst.service';
import { EmailPattern } from 'src/app/shared/utility/constants';
import { CheckInputIsNumber } from 'src/app/shared/utility/utility';

@Component({
  selector: 'app-individual-info-item',
  templateUrl: './individual-info-item.component.html',
  styleUrls: ['./individual-info-item.component.scss']
})
export class IndividualInfoItemComponent implements OnInit {
  @Input('IndividualInfoData') IndividualInfoData: any;
  @Input('IndividualInfoDataIndex') IndividualInfoDataIndex: number;
  @Input('ID') ID: string = '';
  @Input('tabID') tabID: string = '';
  @Input('selectedTabID') selectedTabID: string = '';
  @Output('sendDataIndividual') sendDataIndividual = new EventEmitter();
  @Output('addNewIndividual') addNewIndividual = new EventEmitter();
  frm: FormGroup;
  @Input('isSubmitted') isSubmitted: boolean = false;

  PictureFileType: string[] = ['jpg', 'jpeg', 'png', 'gif', 'csv', 'docx', 'xlsx', 'xls', 'pdf'];
  PictureFileDetails: any[] = [];
  DocumentNameList: any[] = [
    "Picture",
    "PAN",
    "Aadhar",
  ];


  LeadGeneratedByList: any[] = [
    "PPOB",
    "APOB",
    "Others",
    "Comment"
  ];

  LeadAssignedToList: any[] = [
    "Employee1",
    "Employee2",
    "Employee3",
    "Employee4"
  ];

  StatesList: any[] = [];
  IndividualInfoSubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: GstService
  ) {
    this.frm = this.formBuilder.group({
      isExpend: [true],
      First_Name: [''],
      Middle_Name: [''],
      Last_Name: [''],
      Gender: ['-1'],
      Father_First_Name: [''],
      Father_Middle_Name: [''],
      Father_Last_Name: [''],
      DOB: [''],
      PAN_Number: ['', Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')],
      Aadhaar_Number: ['', [Validators.minLength(12), Validators.maxLength(12)]],
      Flat_House_NO: [''],
      Building_Name: [''],
      Road_Street_Name: [''],
      Floor_No: [''],
      Locality: [''],
      Landmark: [''],
      State: ['-1'],
      City: [''],
      Pincode: [''],
      Contact_Number: [''],
      Email_Id: ['', [Validators.pattern(EmailPattern)]],
      Designation: [''],
      Picture: [null],
      isDIN: [''],
      DIN_Number: [''],
      isAuthorizedSignatory: ['Yes', [Validators.required]],
      PassportNo: ['', Validators.pattern('^([A-Z a-z]){1}([0-9]){7}$')],
      GenderTelephoneNoWithStdCode: "",
      FaxNumberWithSTDCode: "",
    });

    this.StatesList = service.GetAllStates();
  }

  ngOnInit() {
    this.IndividualInfoSubscription = this.service.IndividualInfoSubject.subscribe(
      (res) => {
        switch (res.type) {
          case 'setData':
            if (this.IndividualInfoData) {
              if (!('Gender' in this.IndividualInfoData)) {
                this.IndividualInfoData['Gender'] = "-1"
              }
              const defaultData = {
                ...this.IndividualInfoData,
                GenderTelephoneNoWithStdCode: this.IndividualInfoData.GenderTelephoneNoWithStdCode || '',
                FaxNumberWithSTDCode: this.IndividualInfoData.FaxNumberWithSTDCode || ''
              };
              this.frm.setValue(defaultData);
              if (this.IndividualInfoData.Picture) {
                this.PictureFileDetails = this.IndividualInfoData.Picture
              }
            }
            break;
          case 'saveClick':
            const data = {
              index: this.IndividualInfoDataIndex,
              data: this.frm.value,
              isValid: this.frm.valid
            }
            this.sendDataIndividual.emit(data)
            break;
          case 'TabChanged':
            if (this.IndividualInfoData) {
              // this.frm.setValue(this.IndividualInfoData);
              if (this.IndividualInfoData.Picture) {
                this.PictureFileDetails = this.IndividualInfoData.Picture
              }
            }
            break;
          default:
            // if (this.IndividualInfoData) {
            //   this.frm.setValue(this.IndividualInfoData);
            //   if (this.IndividualInfoData.Picture) {
            //     this.PictureFileDetails = this.IndividualInfoData.Picture
            //   }
            // }
            break;
        }

      }
    );
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.frm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(controls[name]);
      }
    }
    return invalid;
  }
  AddNewIndividualClick() {
    this.addNewIndividual.emit()
  }


  isNumber(evt: any) {
    return CheckInputIsNumber(evt);
  }

  setPictureFileDetails(data: any) {
    this.PictureFileDetails.push(data);
    this.frm.get('Picture').setValue([...this.PictureFileDetails]);
    //this.onSubmit();
  }

  ngOnDestroy() {
    if (this.IndividualInfoSubscription)
      this.IndividualInfoSubscription.unsubscribe();
  }

  sendRemoveFileDetailsFn(file: any) {
    this.PictureFileDetails = this.PictureFileDetails.filter(f => f.fileName !== file.fileName);
    this.frm.get('Picture').setValue([...this.PictureFileDetails]);
  }

}
