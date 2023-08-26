import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AboutHandcraftComponent } from './about-handcraft/about-handcraft.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { AboutDrososComponent } from './about-drosos/about-drosos.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { MapComponent } from './map/map.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component:HomeComponent},
  { path: "about", component:AboutComponent},
  { path: "about-handcraft", component:AboutHandcraftComponent},
  { path: "about-drosos", component:AboutDrososComponent},
  { path: "contact-us", component:ContactUsComponent},
  { path: "join-altas", component:JoinUsComponent},
  { path: "map", component:MapComponent},
  {path:"**",component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
