import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TranslateService } from '@ngx-translate/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavabrComponent } from './layout/navabr/navabr.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { WhyAtlasComponent } from './home/why-atlas/why-atlas.component';
import { SpotLightComponent } from './home/spot-light/spot-light.component';
import { HowToUseComponent } from './home/how-to-use/how-to-use.component';
import {HowToUseAboutComponent} from './about/how-to-use/how-to-use.component';
import { AboutHandcraftComponent } from './about-handcraft/about-handcraft.component';
import { AboutDrososComponent } from './about-drosos/about-drosos.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { MapComponent } from './map/map.component';
import { HttpService } from './shared/services/http.service';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavabrComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent,
    WhyAtlasComponent,
    SpotLightComponent,
    HowToUseComponent,
    HowToUseAboutComponent,
    AboutHandcraftComponent,
    AboutDrososComponent,
    ContactUsComponent,
    JoinUsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    HomeComponent,
    TranslateService,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
