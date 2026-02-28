import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ServerMessages {
  [key: string]: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messageSource = new BehaviorSubject<ServerMessages | null>(null);

  messages$ = this.messageSource.asObservable();

  constructor() {}

  updateMessages(newMessages: ServerMessages) {
    this.messageSource.next(newMessages);
  }

  clearMessages() {
    this.messageSource.next(null);
  }
}
