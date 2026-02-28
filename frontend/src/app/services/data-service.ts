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

  handleIncomingMessage(newMessages: ServerMessages) {
    // TEMP: stops if receives "complete"
    if (newMessages['status']?.includes('complete')) {
      console.log("Process Finished.");
      return;
    }

    Object.keys(newMessages).forEach(key => {
      if (this.masterDict[key]) {
        const combined = [...this.masterDict[key], ...newMessages[key]];
        this.masterDict[key] = Array.from(new Set(combined)); 
      } else {
        this.masterDict[key] = [...newMessages[key]];
      }
    });

    this.messageSource.next({ ...this.masterDict });
  }

  resetData() {
    this.masterDict = {};
    this.messageSource.next({});
  }
}
