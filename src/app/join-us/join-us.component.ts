import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss'],
  animations: [
    trigger('contentAnimation', [
      state('hidden', style({
        with: '0',
        height:'0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        width: '*', 
        height:'*',
        opacity: '1',
        overflow: 'auto'
      })),
      transition('hidden <=> visible', animate('300ms ease-in-out'))
    ]),
  ]
})
export class JoinUsComponent implements OnInit{


  carfterVisible = true;
  registerVisible = false;

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


toggleCrafter() {  
  if(this.carfterVisible){
    this.registerVisible = false;
  }
  else{
    this.carfterVisible = true;
    this.registerVisible = false;
  }
}

toggleRegister() { 
  if(this.registerVisible){
    this.carfterVisible = false;
  }
  else{
    this.registerVisible = true;
    this.carfterVisible = false;
  }
}
  

}
