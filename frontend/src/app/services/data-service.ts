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
  private savedPreviews: any[] = [];

  private messageSource = new BehaviorSubject<ServerMessages>({});
  messages$ = this.messageSource.asObservable();

  public setIncomingMessage(newMessages: ServerMessages) {
    // TEMP: stops if receives "complete"
    console.log(newMessages)
    this.masterDict = newMessages
    this.messageSource.next(this.masterDict);
  }

  setPreviews(previews: any[]) {
    this.savedPreviews = previews;
  }

  public getMasterDict(){
    return this.masterDict
  }

  getPreviews() {
    return this.savedPreviews;
  }

  public resetData() {
    this.masterDict = {};
    this.messageSource.next({});
  }
}
