import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BinPackingComponent } from './components/bin-packing/bin-packing.component';
import {RouterModule, Routes} from "@angular/router";

let homePageUrl = 'bin-packing';
const appRoutes: Routes = [
  {path: '', redirectTo: homePageUrl, pathMatch: 'full'},
  {path: 'bin-packing', component: BinPackingComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BinPackingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {onSameUrlNavigation: 'reload'},
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
