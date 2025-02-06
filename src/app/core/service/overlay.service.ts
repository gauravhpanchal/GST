import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  showLoader$ = new Subject<boolean>();
  constructor() { }


  show() {
    this.showLoader$.next(true);
  }


  hide() {
    this.showLoader$.next(false);
  }
}
