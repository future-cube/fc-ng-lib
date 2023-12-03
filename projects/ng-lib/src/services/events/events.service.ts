import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

const ServiceName = 'Events Service';

export interface IEventsService {
  publish(event: string, eventObject?: any): any;
  subscribe(event: string): Observable<any>;
  subscribe(event: string, callback: (value: any) => void): Subscription;
}
@Injectable({ providedIn: 'root' })
export class FcEventsService implements IEventsService {
  private events: { [propName: string]: any } = {};

  constructor() {}

  public subscribe(event: string): Observable<any>;
  public subscribe(event: string, callback: (value: any) => void): Subscription;
  public subscribe(event: string, callback?: (value: any) => void, error?: (error: any) => void, complete?: () => void): any {
    if (!event) {
      throw new Error(`[${ServiceName}] => Subscription method must get event name.`);
    }

    if (this.events[event] === undefined) {
      this.events[event] = new Subject<any>();
    }

    if (typeof callback !== 'function') {
      return this.events[event].asObservable();
    } else {
      return this.events[event].asObservable().subscribe(callback, error, complete);
    }
  }

  public publish(event: string, eventObject?: any): any {
    if (!event) {
      throw new Error(`[${ServiceName}] => Publish method must get event name.`);
    } else if (!this.events[event]) {
      return;
    }

    this.events[event].next(eventObject);
  }
}

interface ISubscribe {
  (event: string): Observable<any>;
  (event: string, callback: (value: any) => void): Subscription;
}
