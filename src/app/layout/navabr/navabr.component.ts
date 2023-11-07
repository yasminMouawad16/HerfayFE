import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './../../shared/services/language.service';
import { HomeComponent } from 'src/app/home/home.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navabr',
  templateUrl: './navabr.component.html',
  styleUrls: ['./navabr.component.scss']
})
export class NavabrComponent implements OnInit {
  currentLang ='';
  langSubscription!: Subscription;

  isScrolled = false;
  isCollapsed = false;
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

  constructor(
    private translateService: TranslateService,
    private _LanguageService:LanguageService,
    private homeComponent:HomeComponent
    ){

  }


  ngOnInit(): void {
    this.langSubscription = this._LanguageService.currentLang.subscribe(res => {
      this.currentLang = res;
    });
    //this.checkedLang = 'en';
  }

  changeLanguage() {
    const lang = this.currentLang == 'ar' ? 'en' : 'ar'
    this.currentLang = lang
    this._LanguageService.langChanged(lang);
  }

  switchLanguage() {
    const currentLanguage = this.translateService.currentLang;
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    this.translateService.use(newLanguage);

    this._LanguageService.notifyObservers(newLanguage);

    if(newLanguage == 'en'){
       this.checkedLang = 'en';
      this._LanguageService.setLang(this.checkedLang);
    }
    else{
       this.checkedLang = 'ar';
       this._LanguageService.setLang(this.checkedLang);
    }
    this.homeComponent.getFilterOption('users/getFilterOption');
  }


  }

