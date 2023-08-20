import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
    
  checkLang = '';
  

  constructor(private language:LanguageService){}


ngOnInit() {
  this.language.registerObserver(this.handleUpdate);
}

handleUpdate(data: any) { 
  this.checkLang =  data;
  
  const content = document.querySelectorAll('.footer');

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
