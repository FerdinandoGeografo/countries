import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

const routes: Routes = [
  {
    path: 'countries',
    component: CountriesPageComponent,
  },
  {
    path: 'countries/:name',
    component: CountryPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/countries',
  },
  {
    path: '**',
    redirectTo: '/countries',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
