import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiLinkService } from "../shared/api-link.service";
import { AuthenticateService } from "../guard/authenticate.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GstService {
  public sendDataSubject = new Subject<any>();
  public IndividualInfoSubject = new Subject<any>();
  public APOBSubject = new Subject<any>();
  constructor(
    private http: HttpClient,
    private api: ApiLinkService,
    private auth: AuthenticateService
  ) { }

  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: this.auth.getLogged(),
  });

  sendData(value: any) {
    this.sendDataSubject.next(value);
  }

  sendIndividualInfoData(value: any) {
    setTimeout(() => {
      this.IndividualInfoSubject.next(value);
    }, 100);
  }

  sendAPOBData(value: any) {
    this.APOBSubject.next(value);
  }

  GetAllRecord() {
    return this.http.get(this.api.server + `GST/GetAllRecord`, {
      headers: this.headers,
    });
  }

  saveGST_Details(data: any, id: string = "") {
    if (id) {
      return this.http.put(this.api.server + `GST/update/${id}`, data, {
        headers: this.headers,
      });
    } else {
      return this.http.post(this.api.server + "GST/save", data, {
        headers: this.headers,
      });
    }
  }

  Get_GST_Details(id: string) {
    return this.http.get(this.api.server + `GST/${id}`, {
      headers: this.headers,
    });
  }

  uploadPostImg(fileToUpload: File) {
    const data = new FormData();
    const fileName = fileToUpload.name.split(".");
    const fName = fileName[0]
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    data.append(
      "upImg",
      fileToUpload,
      fName + "-" + Date.now().toString() + "." + fileName[1]
    );
    const headers = new HttpHeaders({
      Authorization: this.auth.getLogged(),
    });
    return this.http.post(this.api.server + "image/upload", data, {
      headers: headers,
      reportProgress: true,
      observe: "events",
    });
  }

  uploadImg(data) {
    const fileUploadHeaders = new HttpHeaders({
      Authorization: this.auth.getLogged(),
    });
    return this.http.post(this.api.server + "GST/uloadImage", data, {
      headers: fileUploadHeaders,
      reportProgress: true,
      observe: "events",
    });
  }

  GetAllStates() {
    return [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Delhi",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ].sort();
  }

  getAllNameAsSiteListCollection() {
    return [
      {
        BUSINESS_NAME: "HARSHADA BUSINESS SOLUTIONS",
        GSTN: "29AIYPD0807E2Z7",
        PAN_NO: "AIYPD0807E",
        States: "KARNATAKA",
        PPOB_LOCATION: "KA1",
        DoorNoPremisesNo: "No 76, Shop no 3",
        FloorNo: "1ST FLOOR",
        BuildingPremiseName: "S R ENCLAVE",
        AreaStreetRoadName: "6TH MAIN ROAD",
        SubLocalityLocality: "KAGGADASAPURA, C V RMAN NAGAR POST",
        City: "BANGALORE",
        Pincode: "560093",
        STATE_CODE: "29",
        BANK_NAME: "HDFC BANK LIMITED",
        ACCOUNT_NUMBER: "50200058261751",
        BANK_ADDRESS: "KAGGADASAPURA BRANCH",
        IFSC_CODE: "HDFC0003757",
      },
      {
        BUSINESS_NAME: "HARSHADA BUSINESS SOLUTIONS",
        GSTN: "29AIYPD0807E2Z7",
        PAN_NO: "AIYPD0807E",
        States: "Karnataka",
        PPOB_LOCATION: "KA2",
        DoorNoPremisesNo: "SHOP NO 1",
        FloorNo: "FIRST FLOOR",
        BuildingPremiseName: "149/2 NEW THIPPANSANDRA POST, S K COMPLEX",
        AreaStreetRoadName: "5TH MAIN ROAD MALLESHPALYA",
        SubLocalityLocality: "BENGALURU URBAN",
        City: "BENGALURU",
        Pincode: "560075",
        STATE_CODE: "29",
        BANK_NAME: "HDFC BANK LIMITED",
        ACCOUNT_NUMBER: "50200058261751",
        BANK_ADDRESS: "KAGGADASAPURA BRANCH",
        IFSC_CODE: "HDFC0003757",
      },
      {
        BUSINESS_NAME: "ALPHA OMEGA SERVICE",
        GSTN: "29AFLPA6736K1Z2",
        PAN_NO: "AFLPA6736K",
        States: "Karnataka",
        PPOB_LOCATION: "KA3",
        DoorNoPremisesNo: "NO 70",
        FloorNo: "",
        BuildingPremiseName: "",
        AreaStreetRoadName: "8TH CROSS",
        SubLocalityLocality: "KAGGADASAPURA ,C V RAMAN NAGAR POST",
        City: "BANGALORE",
        Pincode: "560093",
        STATE_CODE: "29",
        BANK_NAME: "HDFC BANK LIMITED",
        ACCOUNT_NUMBER: "50200058411629",
        BANK_ADDRESS: "KAGGADASAPURA BRANCH",
        IFSC_CODE: "HDFC0003757",
      },
      {
        BUSINESS_NAME: "HARSHADA BUSINESS SOLUTIONS",
        GSTN: "27AIYPD0807E1ZC",
        PAN_NO: "AIYPD0807E",
        States: "MAHARASHTRA",
        PPOB_LOCATION: "MH1",
        DoorNoPremisesNo: "SHOP NO 24",
        FloorNo: "GROUND FLOOR",
        BuildingPremiseName: "MONEY MARKET, EAST STREET GALLERIA PREMISES CHS",
        AreaStreetRoadName: "2421, GENERAL THIMMAYA ROAD, EAST STREET",
        SubLocalityLocality: "CAMP",
        City: "PUNE",
        Pincode: "4110001",
        STATE_CODE: "27",
        BANK_NAME: "HDFC BANK LIMITED",
        ACCOUNT_NUMBER: "50200058261751",
        BANK_ADDRESS: "KAGGADASAPURA BRANCH",
        IFSC_CODE: "HDFC0003757",
      },
      {
        BUSINESS_NAME: "HARSHADA BUSINESS SOLUTIONS",
        GSTN: "27AIYPD0807E1ZC",
        PAN_NO: "AIYPD087E",
        States: "Maharashtra",
        PPOB_LOCATION: "MH2",
        DoorNoPremisesNo: "",
        FloorNo: "Office No. I-1, I2/29,32",
        BuildingPremiseName: "Ambika Nilayam",
        AreaStreetRoadName: "Hyderabad Road, Near Gharkul Police Station, Bidi Gharkul, Solapur",
        SubLocalityLocality: "",
        City: "",
        Pincode: "413005",
        STATE_CODE: "27",
        BANK_NAME: "HDFC BANK LIMITED",
        ACCOUNT_NUMBER: "50200058261751",
        BANK_ADDRESS: "KAGGADASAPURA BRANCH",
        IFSC_CODE: "HDFC0003757",
      },
      {
        BUSINESS_NAME: "ALPHA OMEGA SERVICE",
        GSTN: "27AFLPA6736K1Z6",
        PAN_NO: "AIYPD087E",
        States: "Maharashtra",
        PPOB_LOCATION: "MH3",
        DoorNoPremisesNo: "SHOP NO 6",
        FloorNo: "GROUND FLOOR",
        BuildingPremiseName: "CITY CENTRE",
        AreaStreetRoadName: "930-931 SYNAGOGUE STREET, NEXT TO TANDEL MASJID, OPPOSITE PUNJAB, NATIONAL BANK",
        SubLocalityLocality: "CAMP",
        City: "Pune",
        Pincode: "411001",
        STATE_CODE: "27",
        BANK_NAME: "HDFC BANK LIMITED",
        ACCOUNT_NUMBER: "50200058411629",
        BANK_ADDRESS: "KAGGADASAPURA BRANCH",
        IFSC_CODE: "HDFC0003757",
      },
    ];
  }

  GetAllCA_Address() {
    return [
      {
        CA_CODES: "CA-1",
        CA_NAME: "GANDHAR BUSINESS SOLUTIONS PVT. LTD",
        ADDRESS1: "3/101, JAWAHAR NAGAR",
        ADDRESS2: "JAIPUR, RAJASTHAN - 302002",
        ADDRESS3: "",
        STATE: "RAJASTHAN ",
        GSTN: "08AAHCG0120H1Z2",
        PAN_NO: "AAHCG0120H",
        STATE_CODE: "08",
      },
      {
        CA_CODES: "CA-2",
        CA_NAME: "GANDHAR BUSINESS SOLUTIONS PVT. LTD",
        ADDRESS1: "6TH CROSS, KAGADASAPURA",
        ADDRESS2: "CV RAMAN NAGAR POST",
        ADDRESS3: "BANGALORE 560093",
        STATE: "KARNATAKA",
        GSTN: "29AAHCG0120H1ZY",
        PAN_NO: "AAHCG0120H",
        STATE_CODE: "29",
      },
      {
        CA_CODES: "CA-3",
        CA_NAME: "GANDHAR BUSINESS SOLUTIONS PVT. LTD",
        ADDRESS1: "GROUND FLOOR, SHOP NO 24, MONEY MARKET",
        ADDRESS2: "EAST STREET GALLERIA PREMISES CHS, 2421",
        ADDRESS3: "AHMEDABAD, GUJARAT - 380009",
        STATE: "MAHARASHTRA",
        GSTN: "27AAHCG0120H1Z2",
        PAN_NO: "AAHCG0120H",
        STATE_CODE: "27",
      },
      {
        CA_CODES: "CA-4",
        CA_NAME: "MEVADA & CO",
        ADDRESS1: "301, EMERALD, Near CHOICE RESTAURANT,",
        ADDRESS2: "SWASTIK CROSS ROAD, CG ROAD",
        ADDRESS3: "AHMEDABAD, GUJARAT - 380009",
        STATE: "Gujarat",
        GSTN: "24AAXFM1995R1Z2",
        PAN_NO: "AAXFM1995R",
        STATE_CODE: "24",
      },
      {
        CA_CODES: "CA-5",
        CA_NAME: "OPTIMUS ADVISORS",
        ADDRESS1: "C-222 SIDHHI VINAYAK TOWERS, ",
        ADDRESS2: "CORPORATE ROAD, NR. KATARIYA ARCADE, ",
        ADDRESS3: "MAKARBA, Ahmedabad, Gujarat, 380051",
        STATE: "Gujarat",
        GSTN: "24AAFFO6746C1ZE",
        PAN_NO: "AAFFO6746C",
        STATE_CODE: "24",
      },
      {
        CA_CODES: "CA-6",
        CA_NAME: "PROPAL ADVISORS PRIVATE LIMITED",
        ADDRESS1: "212, EMERALD, NEAR CHOICE RESTAURANT,",
        ADDRESS2: "SWASTIK CROSS ROAD, CG ROAD",
        ADDRESS3: "NAVRANGPURA, Ahmedabad, Gujarat - 380009",
        STATE: "Gujarat",
        GSTN: "24AAHCP1419N1ZA",
        PAN_NO: "AAHCP1419N",
        STATE_CODE: "24",
      },
      {
        CA_CODES: "CA-7",
        CA_NAME: "SIMPATICO E-SOLUTION PRIVATE LIMITED",
        ADDRESS1: "F.NO.301, RATTAN VIHAR,",
        ADDRESS2: "Gurugram, Gurugram East",
        ADDRESS3: "Haryana, 122001",
        STATE: "Haryana",
        GSTN: "06ABBCS7807A1ZO",
        PAN_NO: "ABBCS7807A",
        STATE_CODE: "06",
      },
      {
        CA_CODES: "OTHERS",
        CA_NAME: "",
        ADDRESS1: "",
        ADDRESS2: "",
        ADDRESS3: "",
        STATE: "",
        GSTN: "",
        STATE_CODE: "",
        PAN_NO: ""
      },
    ];
  }

  GetBillToAddressByCA_CODES(CA_CODES: string) {
    const address = this.GetAllCA_Address();
    if (address) {
      return address.find((f) => f.CA_CODES === CA_CODES);
    }
    return null;
  }

  GetSiteAddressBySiteID(PPOB_LOCATION: string) {
    const address = this.getAllNameAsSiteListCollection();
    if (address) {
      return address.find((f) => f.PPOB_LOCATION === PPOB_LOCATION);
    }
    return null;
  }

  GetSiteCodeBySiteID(PPOB_LOCATION: string) {
    const address = this.getAllNameAsSiteListCollection();
    if (address) {
      const addr = address.find((f) => f.PPOB_LOCATION === PPOB_LOCATION);
      if (addr) {
        return [
          ...this.APOB_AddressDetails()
            .filter((f) => f.State.toLowerCase() === addr.States.toLowerCase())
            .map((i) => {
              return { text: i.APOB, checked: true };
            }),
          { text: "Other", checked: false },
        ];
      }
    }
    return null;
  }

  APOB_AddressDetails() {
    return [
      {
        APOB: "KAR1",
        DoorNo_PremisesNo: "SY no 524/2, 525/3, 526/3,",
        FloorNo: "",
        BuildingPremiseName: "R.K.V DEVELOPERS",
        AreaStreetRoadName: "Madivala and Thattanahalli Village, Attibele",
        SubLocalityLocality: "Anekal Taluk,",
        Landmark: "Bengaluru Urban,  ",
        State: "Karnataka",
        City: "Bengaluru",
        Pincode: "562107",
      },
      {
        APOB: "KAR2",
        DoorNo_PremisesNo: "12/P2 IT Sector",
        FloorNo: "",
        BuildingPremiseName: "Hitech, Defence and Aerospace Park",
        AreaStreetRoadName: "Defence and Aerospace Park",
        SubLocalityLocality: "Devanahalli",
        Landmark: "Bengaluru Urban,  ",
        State: "Karnataka",
        City: "Bengaluru",
        Pincode: "562149",
      },
      {
        APOB: "KAR3",
        DoorNo_PremisesNo: "Sy nos. 70/1, 70/2, 70/3 ",
        FloorNo: "",
        BuildingPremiseName: "Dobaspet Industrial Area",
        AreaStreetRoadName: "Minnapura Village Nelamangala Taluk,",
        SubLocalityLocality: "Thyamagondlu Hobli",
        Landmark: "Bengaluru Rural,  ",
        State: "Karnataka",
        City: "Bengaluru",
        Pincode: "562132",
      },
      {
        APOB: "KAR4",
        DoorNo_PremisesNo: "Building 2 Wh 2, 12/P2 IT Sector",
        FloorNo: "",
        BuildingPremiseName: "Dobaspet Industrial Area",
        AreaStreetRoadName: "Minnapura Village Nelamangala Taluk,",
        SubLocalityLocality: "Thyamagondlu Hobli",
        Landmark: "Bengaluru Rural,  ",
        State: "Karnataka",
        City: "Bengaluru",
        Pincode: "562132",
      },
      {
        APOB: "KAR5",
        DoorNo_PremisesNo:
          "Survey No. 171 of Marasandra village,Malur Taluk, Survey Nos. 43, 44 ,45, 46 of Madanahatti",
        FloorNo: "",
        BuildingPremiseName: "Malur Industrial Area, ",
        AreaStreetRoadName:
          "Venkatapura village and Survey Nos 118/1A,130/1,117,118/1B, 118/2, 119/1, 119/2, 120, 121,",
        SubLocalityLocality: "Madanahatti Village",
        Landmark: "Kolar",
        State: "Karnataka",
        City: "Bengaluru",
        Pincode: "563160",
      },
      {
        APOB: "MAHA 1",
        DoorNo_PremisesNo:
          "WAREHOUSE H, SURVEY NO. 35/4, 35/10, 37/2, 35/9, 43/1, 36/2,",
        FloorNo: "",
        BuildingPremiseName: "PRATHAMESH COMPLEX,",
        AreaStreetRoadName: "Saravali, Bhiwandi",
        SubLocalityLocality: "",
        Landmark: "",
        State: "Maharashtra",
        City: "Thane",
        Pincode: "421302",
      },
      {
        APOB: "MAHA2",
        DoorNo_PremisesNo: "Building No.WE-I",
        FloorNo: "",
        BuildingPremiseName: " Renaissance Industrial Smart City",
        AreaStreetRoadName: "Village Vashere,  Post Amane, Bhiwandi",
        SubLocalityLocality: "Taluka Bhiwandi",
        Landmark: "",
        State: "Maharashtra",
        City: "Thane",
        Pincode: "421302",
      },
      {
        APOB: "MAHA3",
        DoorNo_PremisesNo: "Godown no 171/1 and 157/2",
        FloorNo: "",
        BuildingPremiseName: "Shree Swami Krupa",
        AreaStreetRoadName: "Bhiwandi",
        SubLocalityLocality: "",
        Landmark: "opp Toll Logistics",
        State: "Maharashtra",
        City: "Thane",
        Pincode: "421302",
      },

      {
        APOB: "MAHA4",
        DoorNo_PremisesNo: "Building 5",
        FloorNo: "",
        BuildingPremiseName: " BGR Warehousing Complex",
        AreaStreetRoadName: "Bhiwandi",
        SubLocalityLocality: " Village Vahuli",
        Landmark: "Near Shiv Sagar Hotel",
        State: "Maharashtra",
        City: "Thane",
        Pincode: "421302",
      },
      {
        APOB: "MAHA5",
        DoorNo_PremisesNo: " Survey No 45, Hissa No 4A",
        FloorNo: "",
        BuildingPremiseName: "Royal Warehousing and Logistics LLP",
        AreaStreetRoadName: "Savad-Pise Road,  Bhiwandi",
        SubLocalityLocality: "Village Pise",
        Landmark: "Village Aamne Post,",
        State: "Maharashtra",
        City: "Thane",
        Pincode: "421302",
      },
      {
        APOB: "MAHA6",
        DoorNo_PremisesNo: "Building No. B01",
        FloorNo: "",
        BuildingPremiseName: "ESR Pune Estates Pvt Ltd",
        AreaStreetRoadName: "Chakan",
        SubLocalityLocality: " Village Ambethan, Tal - Khed,",
        Landmark: "",
        State: "Maharashtra",
        City: "Pune",
        Pincode: "410501",
      },
    ];
  }

  Delete_GST_Details(id: string) {
    return this.http.delete(this.api.server + `GST/delete/${id}`, {
      headers: this.headers,
    });
  }

  CheckLeadNoIsTaken(leadNo: string, id: string | null | undefined) {
    return this.http.get(
      this.api.server + `GST/CheckLeadNoIsTaken/${leadNo}/${id}?loader=false`,
      { headers: this.headers }
    );
  }

  AnnexureCumulativeMonth(BillTo: string) {
    return this.http.get(
      this.api.server + `GST/AnnexureCumulativeMonth/${BillTo}`,
      { headers: this.headers }
    );
  }

  DownloadData(data) {
    return this.http.post(this.api.server + `GST/download`, data, {
      headers: this.headers,
      responseType: "blob"
    });
  }
}
