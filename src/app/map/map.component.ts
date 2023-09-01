import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent  implements OnInit {
  filterOptions: any;
  filterModel: any;
  showList = 'search';
  checkLang = '';

  lat = 22.4064172;
  long = 69.0750171;
  zoom=15;

  markers = [
        {
            lat: 21.1594627,
            lng: 72.6822083,
            label: 'Surat'
        },
        {
            lat: 23.0204978,
            lng: 72.4396548,
            label: 'Ahmedabad'
        },
        {
            lat: 22.2736308,
            lng: 70.7512555,
            label: 'Rajkot'
        }
    ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private language:LanguageService,
    private render: Renderer2
  ) {
  }
  ngOnInit(): void {
    this.language.registerObserver(this.handleUpdate);
    window.scrollTo(0, 0);
    // this.onGetColorIndicator();
    this.onGetData();
    // const currentLat = this.activatedRoute.snapshot.queryParams.lat;
    // const currentLng = this.activatedRoute.snapshot.queryParams.lng;

    // this.center = {
    //   lat: currentLat ? +currentLat : 30.59199913,
    //   lng: currentLng ? +currentLng : 30.89999749
    // };

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

  onGetData() {
    this.activatedRoute.queryParams.subscribe(res => {
      this.filterOptions = res;
      if (this.filterOptions?.mainCraft || this.filterOptions?.subCraft || this.filterOptions?.city || this.filterOptions?.heritage) {
        this.filterModel = this.filterOptions;
        // this.onFilterOption();
        // this.onFilter();
        return;
      }
      // this.sourceData = res.users;
      // this.markers = this.sourceData.data.map(item => {
      //   const data = {
      //     _id: item._id,
      //     location: item.geoLocation,
      //     mainCraft: item.businessInfo.mainCraft,
      //   }
      //   return data
      // })
      // this.onMapInit()
    });
  }

}
