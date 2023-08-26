import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent  implements OnInit {
  filterOptions: any;
  filterModel: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private render: Renderer2
  ) {
  }

  ngOnInit(): void {
    //window.scrollTo(0, 0);
    // this.onGetColorIndicator();
    this.onGetData();
    // const currentLat = this.activatedRoute.snapshot.queryParams.lat;
    // const currentLng = this.activatedRoute.snapshot.queryParams.lng;

    // this.center = {
    //   lat: currentLat ? +currentLat : 30.59199913,
    //   lng: currentLng ? +currentLng : 30.89999749
    // };

  }

  onGetData() {
    this.activatedRoute.queryParams.subscribe(res => {
      this.filterOptions = res;
      if (this.filterOptions?.mainCraft || this.filterOptions?.product || this.filterOptions?.city || this.filterOptions?.heritage) {
        this.filterModel.mainCraft = this.filterOptions.mainCraft;
        this.filterModel.product = this.filterOptions.product;
        this.filterModel.governorate = this.filterOptions.location;
        this.filterModel.heritage = this.filterOptions.heritage;
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
