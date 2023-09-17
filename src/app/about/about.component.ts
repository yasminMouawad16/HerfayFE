import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 100,
    navText: ['', '',''],

      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 3
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
    nav: false,
    rtl: localStorage.getItem('lang') == 'ar' ? true : false
  }

  imagesCrafts :any[] = [
      'assets/images/Shabab.png',
      'assets/images/Maskgroup.png',
      'assets/images/Kendaka.png',
      'assets/images/Shabab.png',
      'assets/images/Maskgroup.png',
      'assets/images/Kendaka.png',
  ]


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
