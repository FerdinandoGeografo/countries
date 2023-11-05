import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FooterComponent } from './components/footer/footer.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountryItemComponent } from './components/country-item/country-item.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryPageComponent,
    CountriesPageComponent,
    HeaderComponent,
    SearchBarComponent,
    DropdownComponent,
    FooterComponent,
    CountriesListComponent,
    CountryItemComponent,
    ThemeSwitcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
