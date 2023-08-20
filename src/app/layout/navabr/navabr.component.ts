import { Component, HostListener, OnInit } from '@angular/core';   
import { TranslateService } from '@ngx-translate/core'; 
import { LanguageService } from './../../shared/services/language.service';

@Component({
  selector: 'app-navabr',
  templateUrl: './navabr.component.html',
  styleUrls: ['./navabr.component.scss']
})
export class NavabrComponent implements OnInit {
   
  isScrolled = false;
  checkedLang = '';

  enDiraction = {
    'direction': 'ltr'
  };

  arDiraction = {
    'direction': 'rtl'
  }


  @HostListener("window:scroll")
  
scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
}

  constructor( private translateService: TranslateService,
      private _LanguageService:LanguageService){

  }


  ngOnInit(): void { 
    this.checkedLang = 'en';
  }

  switchLanguage() {
    const currentLanguage = this.translateService.currentLang;
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    this.translateService.use(newLanguage);

    this._LanguageService.notifyObservers(newLanguage);
 
    if(newLanguage == 'en')
       this.checkedLang = 'en'
    else
       this.checkedLang = 'ar'
  }

 
  }

