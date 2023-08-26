import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LanguageService } from '../shared/services/language.service';
import { HttpService } from '../shared/services/http.service';
import * as _ from "lodash";
import {SerializationUtility} from "../shared/utility/serialization.utility";
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterModel: any = new ParamsModel();
  crafts = [];
  subCrafts = [];
  cities = [];
  heritages = [];
  center: any;

  disableSelect = new FormControl(false);
  checkLang = '';



  constructor(private language: LanguageService, public http: HttpService,private router: Router) { }


  ngOnInit() {
    this.language.registerObserver(this.handleUpdate);
    // this.http.get('users/getFilterOption').subscribe((res: any) => {
    //   this.crafts = res.mainCraft;
    //   this.subCrafts = res.subCraft;
    //   this.cities = res.city;
    //   this.heritages = res.heritage;
    // });
  }

  handleUpdate(data: any) {
    this.checkLang = data;

    const textBox = document.getElementById('textBox');

    if (this.checkLang == 'ar') {
      textBox!.style.direction = 'rtl';
      textBox!.style.paddingRight = '7%';
    }
    else if (this.checkLang == 'en') {
      textBox!.style.direction = 'ltr';
      textBox!.style.paddingLeft = '7%';
    }

  }

  onFilterOption(){
    this.filterModel = _(this.filterModel).omitBy(_.isUndefined).omitBy(_.isNull).value();
    const queryString = SerializationUtility.ObjectToKeyValueString(this.filterModel);
    const url = `users/getFilterOption?${queryString}`;
    this.getFilterOption(url);
  }

  getFilterOption(url: any) {
    this.http.get(url).subscribe((res: any) => {
      this.crafts = res.mainCraft;
      this.subCrafts = res.subCraft;
      this.cities = res.city;
      this.heritages = res.heritage;
    });
  }
  search() {
    this.router.navigate(['/map'], {
      queryParams: {
        // lat: this.center?.lat || 30.033333,
        // lng: this.center?.lng || 31.233334,
        mainCraft: this.filterModel.mainCraft,
        subCraft: this.filterModel.subCraft,
        city: this.filterModel.city,
        heritage: this.filterModel.heritage
      }
    });
  }


}
export class ParamsModel {
  mainCraft= null;
  city= null;
  heritage= null;
  subCraft= null;
}
