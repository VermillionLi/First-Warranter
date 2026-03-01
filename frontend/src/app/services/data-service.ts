import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface ServerMessages {
  [key: string]: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private masterDict: ServerMessages = {};

  private messageSource = new BehaviorSubject<ServerMessages>({});
  messages$ = this.messageSource.asObservable();

  public setIncomingMessage(newMessages: ServerMessages) {
    // TEMP: stops if receives "complete"
    console.log(newMessages)
    this.masterDict = newMessages
    this.messageSource.next(this.masterDict);
  }

  public getMasterDict(){
    return this.masterDict
  }

  public resetData() {
    this.masterDict = {};
    this.messageSource.next({});
  }
}
