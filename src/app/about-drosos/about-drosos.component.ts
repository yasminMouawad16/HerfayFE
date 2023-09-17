import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-about-drosos',
  templateUrl: './about-drosos.component.html',
  styleUrls: ['./about-drosos.component.scss']
})
export class AboutDrososComponent implements OnInit{

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


  customOptionsSlider2: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 100,
    navText: ['', '',''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 5
      },
      740: {
        items: 7
      },
      940: {
        items: 9
      }
    },
    nav: false,
    rtl: localStorage.getItem('lang') == 'ar' ? true : false
  }

  imagesCrafts :any[] = [
      {id:1, img:'assets/images/Group-4109.png'},
      {id:2, img:'assets/images/Group-4110.png'},
      {id:3, img:'assets/images/Group4111.png'},
      {id:4, img:'assets/images/Group-4109.png'},
      {id:5, img:'assets/images/Group-4110.png'},
      {id:6, img:'assets/images/Group4111.png'},
  ];

  sppurtedProjects :any[] = [
    {id:1, img:'assets/images/1661441682logo 3.png'},
    {id:2, img:'assets/images/Mask group (1).png'},
    {id:3, img:'assets/images/0626202204483762b7e5254b3be.svg'},
    {id:4, img:'assets/images/Mask group (2).png'},
    {id:5, img:'assets/images/Mask group.svg'},
    {id:6, img:'assets/images/logo-1 2.svg'},
    {id:7, img:'assets/images/logo 4.svg'},
    {id:8, img:'assets/images/1661441682logo 3.png'},
  ];



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
