import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>
  `,
})
export class AppComponent implements OnInit {
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.loadCountries();
  }
}
