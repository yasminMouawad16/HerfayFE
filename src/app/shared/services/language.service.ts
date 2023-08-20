import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
 
export class LanguageService {

   //checkLanguage = new BehaviorSubject<string>('en');

   private subject: Subject<any> = new Subject<any>();


  registerObserver(observer: any) {
    return this.subject.subscribe(observer);
  }



  notifyObservers(data: any) {
    this.subject.next(data);
  }

}