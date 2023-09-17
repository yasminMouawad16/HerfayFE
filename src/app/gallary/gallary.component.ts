import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss']
})
export class GallaryComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 100,
    navText: ['', '',''],
    items: 1,
    nav: false
  }
imagesGallary:any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public _sanitizer: DomSanitizer,
    public http: HttpService,
    )
    {}
  ngOnInit(): void {
    this.http.get(`users/getUserImages/${this.data.index}`).subscribe((res: any) => {
      this.imagesGallary = res.data.files;
    });
  }
}
