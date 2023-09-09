import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
    private lang: string = 'en';

   //checkLanguage = new BehaviorSubject<string>('en');

   private subject: Subject<any> = new Subject<any>();

   constructor(private translate: TranslateService) { }

  registerObserver(observer: any) {
    return this.subject.subscribe(observer);
  }



  notifyObservers(data: any) {
    this.subject.next(data);
  }

  getLang(){
    return this.lang;
  }

  setLang(lang: string){
      this.lang = lang
  }


  currentLang: BehaviorSubject<string> = new BehaviorSubject('en');


  langChanged(lang: any) {
    const elEn = document.querySelector('#bootstrap-en');
    const elAr = document.querySelector('#bootstrap-ar');
    this.translate.use(lang)
    if (lang === 'ar') {
      // add bootstrap ar
      elEn && elEn.remove();

      this.generateLinkElement({
        id: 'bootstrap-ar',
        href: 'assets/vendor/bootstrap/bootstrap.rtl.min.css',
        dir: 'rtl',
        lang: 'ar',
      });

    } else {
      // en
      elAr && elAr.remove();
      this.generateLinkElement({
        id: 'bootstrap-en',
        href: 'assets/vendor/bootstrap/bootstrap.min.css',
        dir: 'ltr',
        lang: 'en',
      });
    }
    localStorage.setItem('lang', lang);
    this.currentLang.next(lang);
  }
  generateLinkElement(props: any) {
    const el = document.createElement('link');
    const htmlEl = document.getElementsByTagName('html')[0];
    // el.rel = 'stylesheet';
    // el.href = props.href;
    // el.id = props.id;
    // document.head.prepend(el);
    htmlEl.setAttribute('dir', props.dir);
    htmlEl.setAttribute('lang', props.lang);
    // this.loaderService.isLoading.next(false);
  }
}
