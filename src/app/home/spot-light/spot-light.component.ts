import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-spot-light',
  templateUrl: './spot-light.component.html',
  styleUrls: ['./spot-light.component.scss']
})
export class SpotLightComponent implements OnInit{

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
