import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  ServicesPageEvent: EventEmitter<any> = new EventEmitter<any>();
  headerEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  /**
   * a function that sends an event from services page on creating or deleting services and also on terminating the process
   * @param services the list of services updated
   */
  emitServicesChangedFromServicespage(services: any) {
    this.ServicesPageEvent.emit(services);
  }

  /**
   * a function that sends an event on creating or deleting services and also on terminating the process from the header general button
   * @param state (on/off/done)
   */
  emitServicesChangedFromHeaderMenu(state: string){
    this.headerEvent.emit(state);
  }
}
