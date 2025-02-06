import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { EmitEvent, EventBusService, Events } from '../../service/event-bus.service';
import { tap, catchError, } from 'rxjs/operators';

@Injectable()
export class OverlayRequestResponseInterceptor implements HttpInterceptor {

  constructor(private eventBus: EventBusService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any | null>> {
    const randomTime = this.getRandomIntInclusive(0, 1500);
    const started = Date.now();
    this.eventBus.emit(new EmitEvent(Events.httpRequest));
    return next
      .handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            if (req.url.includes("api/login"))
              this.eventBus.emit(new EmitEvent(Events.httpResponseLogin));
            else
              this.eventBus.emit(new EmitEvent(Events.httpResponse));
          }
        }),
        catchError((error) => {
          console.error('Http Request Error error in intercept');
          this.eventBus.emit(new EmitEvent(Events.httpResponse));
          return throwError(error.message);
        })
      );
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }
}
