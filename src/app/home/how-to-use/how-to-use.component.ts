import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss']
})
export class HowToUseComponent implements OnInit  {
  langSubscription!: Subscription;
  lang='';
  constructor(
    private language: LanguageService,
    ) { }

  ngOnInit() {
    this.langSubscription = this.language.currentLang.subscribe(res => {
      this.lang =res;
    });
  }
}
