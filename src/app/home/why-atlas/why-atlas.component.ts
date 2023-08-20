import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-why-atlas',
  templateUrl: './why-atlas.component.html',
  styleUrls: ['./why-atlas.component.scss']
})
export class WhyAtlasComponent implements OnInit{

  checkLang = '';
  
  constructor(private language:LanguageService){}


ngOnInit() {
  this.language.registerObserver(this.handleUpdate);
}

handleUpdate(data: any) { 
  this.checkLang =  data;
  
  const contentID = document.getElementById('contentID');
  const ImgIcon = document.querySelectorAll(".imgIcon"); 

  if(this.checkLang == 'ar'){
    contentID!.style.direction = 'rtl';
    contentID!.style.paddingRight = '7%';
    contentID!.style.paddingLeft = '0';
    
    
    ImgIcon.forEach(image => {
      image.classList.add('imgIcon'); 
    });
  
  }
  else if(this.checkLang == 'en'){
    contentID!.style.direction = 'ltr';
    contentID!.style.paddingLeft = '7%';
  }
}


}
