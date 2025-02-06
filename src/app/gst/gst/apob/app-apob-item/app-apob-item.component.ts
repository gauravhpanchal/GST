import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GstService } from 'src/app/gst/gst.service';
import { EmailPattern } from 'src/app/shared/utility/constants';
import { CheckInputIsNumber } from 'src/app/shared/utility/utility';

@Component({
  selector: 'app-app-apob-item',
  templateUrl: './app-apob-item.component.html',
  styleUrls: ['./app-apob-item.component.scss']
})
export class AppApobItemComponent implements OnInit, OnDestroy {
  @Input('apobInfoData') apobInfoData: any;
  @Input('APOBInfoDataIndex') apobInfoDataIndex: number;
  ApobInfoSubscription: Subscription;
  @Input('ID') ID: string = '';
  @Input('tabID') tabID: string = '';
  @Input('selectedTabID') selectedTabID: string = '';
  @Output('sendData') sendData = new EventEmitter();
  @Input("selectedTab") selectedTab: number = 0;

  @Output('sendDataAPOB') sendDataAPOB = new EventEmitter();
  AGNTFileType: string[] = ['jpg', 'jpeg', 'png', 'gif', 'csv', 'docx', 'xlsx', 'xls', 'pdf'];
  AGNTFileDetails: any[] = [];
  @Input('isSubmitted') isSubmitted: boolean = false;
  frm: FormGroup;
  @Output('tabChange') tabChange = new EventEmitter();
  LeadGeneratedByList: any[] = [
    "PPOB",
    "APOB",
    "Others",
    "Comment"
  ];

  DocumentNameList: any[] = [
    "NOC letter",
    "Consent Letter",
    "Electicity Bill",
    "Property Tax Reciept"
  ];

  LeadAssignedToList: any[] = [
    "Employee1",
    "Employee2",
    "Employee3",
    "Employee4"
  ];

  ckkNameAsSite: any[] = [];
  ckkNameAsSiteAddresss: any[] = [];

  constructor(private formBuilder: FormBuilder, private route: Router, private service: GstService) { }

  ngOnInit() {

    this.frm = this.formBuilder.group({
      DoorNoPremisesNo: [''],
      FloorNo: [''],
      BuildingPremiseName: [''],
      AreaStreetRoadName: [''],
      SubLocalityLocality: [''],
      City: [''],
      Pincode: [''],
      State: [''],
      Ebill: [''],
      GSTJurisdiction: [''],
      Range: [''],
      Division: [''],
      District: [''],
      Village: [''],
      EmailId: [''],
      ContactNumber: [''],
      AGNTUpload: [''],
      APOBNOC: [''],
      isExpend: [''],
      SitesName: ['']
    });

    this.ApobInfoSubscription = this.service.APOBSubject.subscribe(
      (res) => {
        switch (res.type) {
          case 'setData':
            if (this.apobInfoData) {
              this.frm.setValue(this.apobInfoData);
              this.ckkNameAsSite = res && res.ckkNameAsSite ? res.ckkNameAsSite : []
              this.getSiteAddress()
              if (this.apobInfoData.AGNTUpload) {
                this.AGNTFileDetails = this.apobInfoData.AGNTUpload
              }
            }
            break;
          case 'saveClick':
            const data = {
              index: this.apobInfoDataIndex,
              data: this.frm.value,
              isValid: this.frm.valid
            }
            this.sendDataAPOB.emit(data)
            break;
          case 'TabChanged':
            // if (this.IndividualInfoData) {
            //   // this.frm.setValue(this.IndividualInfoData);
            //   if (this.IndividualInfoData.Picture) {
            //     this.PictureFileDetails = this.IndividualInfoData.Picture
            //   }
            // }
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

  getSiteAddress() {
    this.ckkNameAsSiteAddresss = [];
    if (this.ckkNameAsSite && this.ckkNameAsSite.length > 0) {
      const APOBAddres = this.service.APOB_AddressDetails();
      if (APOBAddres) {
        const siteNames = this.ckkNameAsSite.filter(f => f.checked === true).map(i => i.text)
        this.ckkNameAsSiteAddresss = APOBAddres.filter(f => siteNames.includes(f.APOB));
      }
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.frm.invalid)
      return false;

    this.sendData.emit({ type: 'save', data: this.frm.value });
    // this.service.saveGST_Details(this.frm.value, this.ID).subscribe((res: any) => {
    //   // this.frm.reset();
    //   if (res.ID) {
    //     this.sendData.emit(res.ID);
    //   }
    // })
  }

  isNumber(evt: any) {
    return CheckInputIsNumber(evt);
  }

  fileToUpload: File | null = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


  setAGNTFileDetails(data: any) {
    this.AGNTFileDetails.push(data);
    this.frm.get('AGNTUpload').setValue([...this.AGNTFileDetails]);
    this.onSubmit();
  }

  ngOnDestroy() {
    if (this.ApobInfoSubscription)
      this.ApobInfoSubscription.unsubscribe();
  }

  onTabChange(direction: string) {
    this.tabChange.emit(direction)
  }

  sendRemoveFileDetailsFn(file: any) {
    this.AGNTFileDetails = this.AGNTFileDetails.filter(f => f.fileName !== file.fileName);
    this.frm.get('AGNTUpload').setValue([...this.AGNTFileDetails]);
    this.onSubmit();
  }

}
