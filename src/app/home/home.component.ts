import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { LanguageService } from '../shared/services/language.service'; 



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {


  disableSelect = new FormControl(false);
  checkLang = '';

   

  constructor(private language:LanguageService){}


ngOnInit() {
  this.language.registerObserver(this.handleUpdate);
}

handleUpdate(data: any) { 
  this.checkLang =  data;
  
  const textBox = document.getElementById('textBox');

  if(this.checkLang == 'ar'){
     textBox!.style.direction = 'rtl';
     textBox!.style.paddingRight = '7%';
  }
  else if(this.checkLang == 'en'){
    textBox!.style.direction = 'ltr';
    textBox!.style.paddingLeft = '7%';
  }
 
}

 
 

}
