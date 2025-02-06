import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService, Events } from '../service/event-bus.service';
import { OverlayService } from '../service/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {
  showHideLoaderSub: Subscription;
  httpRequestSub: Subscription;
  httpResponseSub: Subscription;
  httpLoginResponseSub: Subscription;
  enabled = false;
  queue = new Array();
  timerId: number | null = null;
  timerHideId: number | null = null;
  @Input() delay = 0;

  constructor(private eventBus: EventBusService, private overlayService: OverlayService) {
    this.showHideLoaderSub = this.overlayService.showLoader$.subscribe((res: boolean) => {
      this.enabled = res;
    })

  }

  ngOnInit(): void {
    // Handle request
    this.httpRequestSub = this.eventBus.on(Events.httpRequest, (() => {
      this.queue.push(1);
      if (this.queue.length === 1) {
        // Only show if we have an item in the queue after the delay time
        setTimeout(() => {
          if (this.queue.length) {
            this.enabled = true;
          }
        }, this.delay);
      }
    }));

    // Handle response
    this.httpResponseSub = this.eventBus.on(Events.httpResponse, (() => {
      this.queue.pop();
      if (this.queue.length === 0) {
        // Since we don't know if another XHR request will be made, pause before
        // hiding the overlay. If another XHR request comes in then the overlay
        // will stay visible which prevents a flicker
        setTimeout(() => {
          // Make sure queue is still 0 since a new XHR request may have come in
          // while timer was running
          if (this.queue.length === 0) {
            this.enabled = false;
          }
        }, 1000);
      }
    }));

    this.httpLoginResponseSub = this.eventBus.on(Events.httpResponseLogin, (() => {
      this.queue.pop();
      if (this.queue.length === 0) {
        // Since we don't know if another XHR request will be made, pause before
        // hiding the overlay. If another XHR request comes in then the overlay
        // will stay visible which prevents a flicker
        setTimeout(() => {
          // Make sure queue is still 0 since a new XHR request may have come in
          // while timer was running
          if (this.queue.length === 0) {
            this.enabled = false;
          }
        }, 6000);
      }
    }));
  }
  ngOnDestroy() {
    this.httpRequestSub.unsubscribe();
    this.httpResponseSub.unsubscribe();
    this.httpLoginResponseSub.unsubscribe();

    if (this.showHideLoaderSub) {
      this.showHideLoaderSub.unsubscribe();
    }
  }
}
