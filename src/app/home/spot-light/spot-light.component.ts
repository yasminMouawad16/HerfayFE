import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-spot-light',
  templateUrl: './spot-light.component.html',
  styleUrls: ['./spot-light.component.scss']
})
export class SpotLightComponent implements OnInit{
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 100,
    navText: ['', '',''],
    items: 1,
    nav: false,
    rtl: localStorage.getItem('lang') == 'ar' ? true : true
  }
  checkLang = '';


  constructor(private language:LanguageService){}


ngOnInit() {
  this.language.registerObserver(this.handleUpdate);
}

handleUpdate(data: any) {
  this.checkLang =  data;

  const content = document.querySelectorAll('.content');

  if(this.checkLang == 'ar'){
    content.forEach(content => {
      content.classList.add('arDiraction');
      content.classList.remove('enDiraction');
    });
  }
  else if(this.checkLang == 'en'){
    content.forEach(content => {
      content.classList.remove('arDiraction');
      content.classList.add('enDiraction');
    });
  }

}




}
