import { Component, ElementRef, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../shared/services/language.service';
import { Subscription } from 'rxjs';
import { ParamsModel } from '../home/home.component';
import { HttpService } from '../shared/services/http.service';
import { SerializationUtility } from '../shared/utility/serialization.utility';
import * as _ from "lodash";
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { GallaryComponent } from '../gallary/gallary.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent  implements OnInit {
  langSubscription!: Subscription;
  filterModel: any = new ParamsModel();

  sourceData:any = [];

  filterOptions: any;
  resultes: any;
  showList = 'search';
  crafterDetails: boolean = false;

  map!: google.maps.Map ;
  center!: google.maps.LatLngLiteral;
  markers = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private language:LanguageService,
    public http: HttpService,
    private elementRef: ElementRef,
    public dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.langSubscription = this.language.currentLang.subscribe(res => {
      this.onGetData();
    });
    window.scrollTo(0, 0);
    this.center = {
      lat: 29.666666,
      lng: 30.5
    };

  }



  onGetData() {
    this.activatedRoute.queryParams.subscribe((res:any) => {
      this.filterOptions = res;
      if (this.filterOptions?.mainCraft || this.filterOptions?.subCraft || this.filterOptions?.city || this.filterOptions?.heritage) {
        this.filterModel = {
          ...this.filterOptions,
          pageNumber: 1
        };
        const queryString = SerializationUtility.ObjectToKeyValueString(this.filterModel);
        const url = `users/getFilterOption?${queryString}`;
        this.getFilterOption(url);
        this.onFilter();
        return;
      }else{
        this.getFilterOption('users/getFilterOption');
        this.onFilter();
      }
      this.sourceData = res.users;
      this.markers = this.sourceData?.map((item:any) => {
        const data = {
          _id: item._id,
          location: item.geoLocation,
          mainCraft: item.businessInfo.mainCraft,
        }
        return data
      })
      this.onMapInit()
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
      this.resultes = res;
    });
  }


  nextAndPrev(action? :string){
    if (action == 'next' && this.filterModel.pageNumber<this.pagesNumber) {
      this.filterModel.pageNumber = this.filterModel.pageNumber + 1;
      this.onFilter();
    }
    else if(action == 'prev' && this.filterModel.pageNumber>1){
      this.filterModel.pageNumber = this.filterModel.pageNumber - 1;
      this.onFilter();
    }
  }

  pagesNumber = 1;
  onFilter() {
    if(this.filterModel.mainCraft || this.filterModel.subCraft || this.filterModel.city || this.filterModel.heritage){
      this.filterModel = _(this.filterModel).omitBy(_.isUndefined).omitBy(_.isNull).value();
      const queryString = SerializationUtility.ObjectToKeyValueString(this.filterModel);
      const url = `users/getAll?${queryString}`;
      this.http.get(url).subscribe((res:any) =>{
        this.sourceData = res.data;
        this.pagesNumber = res.metaData.total;
        this.markers = this.sourceData.map((item:any) => {
          const data = {
            _id: item._id,
            location: item.geoLocation,
            mainCraft: item.businessInfo.mainCraft,
          }
          return data
        })
        this.onMapInit();
      });
    }else{
      const url = 'users/getAll';
      this.http.get(url).subscribe((res:any) =>{
        this.sourceData = res.data;
        this.pagesNumber = res.metaData.total;
        this.markers = this.sourceData.map((item:any) => {
          const data = {
            _id: item._id,
            location: item.geoLocation,
            mainCraft: item.businessInfo.mainCraft,
          }
          return data
        })
        this.onMapInit();
      });
    }
  }
  onResetAll() {
    this.markers=[];
    this.filterModel = new ParamsModel();
    this.getFilterOption('users/getFilterOption');
  }

  userDetailsInfo: any;
  onOpenUserDetails(user:any): void {
    this.crafterDetails = true;
    this.userDetailsInfo = user;
    const mapRefirect = {
      geoLocation: user.geoLocation,
      zoom: 18,
    };
    this.map.setCenter(mapRefirect.geoLocation);
    this.map.setZoom(mapRefirect.zoom);
  }

  closeUserDetails(): void {
    this.crafterDetails = false;
    this.userDetailsInfo = {};
    this.onMapInit();
  }


  filterObj: any;
  filtarationUrl:any;
  filter(event?:any){
    if(event){
      this.filterModel = new ParamsModel();
      this.filtarationUrl = `users/getFilterOption`;
    }else{
      this.filterModel = _(this.filterModel).omitBy(_.isUndefined).omitBy(_.isNull).value();
      const queryString = SerializationUtility.ObjectToKeyValueString(this.filterModel);
      this.filtarationUrl = `users/getFilterOption?${queryString}`;
    }
    this.http.get(this.filtarationUrl).subscribe((res: any) => {
      this.filterObj = res;
    });
  }


  onMapInit() {
    let loader = new Loader({
      apiKey: environment.googleApiKey
    });
    loader
      .load()
      .then(() => {
        const mapElement: HTMLElement = this.elementRef.nativeElement.querySelector('#map') as HTMLElement;

        this.map = new google.maps.Map(mapElement, {
          center: this.center,
          zoom: 8,
          mapTypeControl: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          disableDefaultUI: true,
          keyboardShortcuts: false,

          draggable: true,
          disableDoubleClickZoom: true,
          maxZoom: 20,
          minZoom: 0,
         // mapTypeId: environment.mapId
        });
        if(this.markers && this.markers.length >0){
          const markers = this.markers.map((item:any) => {
            const marker = new google.maps.Marker({
              position: item.location,
              icon: `./assets/images/herfs/${item.mainCraft.toLowerCase()}.png`
            });
            marker.addListener('click', () => {
              //this.openDialog(item._id);
            })
            return marker;
          });
          const map = this.map;
          new MarkerClusterer({map, markers});
        }

      })
  }

  onShowImagesModal() {
    this.dialog.open(GallaryComponent, {
      data: this.userDetailsInfo,
      hasBackdrop: true
    });
  }

}
