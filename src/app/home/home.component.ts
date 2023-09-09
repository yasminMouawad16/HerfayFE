import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LanguageService } from '../shared/services/language.service';
import { HttpService } from '../shared/services/http.service';
import * as _ from "lodash";
import {SerializationUtility} from "../shared/utility/serialization.utility";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



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
  langSubscription!: Subscription;


  constructor(
    private language: LanguageService,
    public http: HttpService,
    private router: Router,
    ) { }


  ngOnInit() {
    this.langSubscription = this.language.currentLang.subscribe(res => {
      this.http.get('users/getFilterOption').subscribe((res: any) => {
        this.crafts = res.mainCraft;
        this.subCrafts = res.subCraft;
        this.cities = res.city;
        this.heritages = res.heritage;
      });
    });
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
        governorate: this.filterModel.governorate,
        heritage: this.filterModel.heritage
      }
    });
  }


}
export class ParamsModel {
  mainCraft= null;
  product= null;
  governorate= null;
  heritage= null;
  search= null;
  rawMaterial= null;
  type= null;
  market= null;
  employmentSize= null;
  subCraft= null;
  village= null;
  pageNumber = 1;
  perPage = 50;
}
