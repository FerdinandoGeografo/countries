import { Component } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-country-page',
  template: `
    <section class="section-country">
      <div class="container">
        <a
          [routerLink]="['/countries']"
          [queryParams]="(filters$ | async) || {}"
          class="cta-back"
        >
          <fa-icon class="back-icon" [icon]="faArrLeft"></fa-icon>
          <span>Back</span>
        </a>

        <ng-container
          *ngIf="(isLoading$ | async) || false; else countryTemplate"
        >
          <div class="country-wrapper">
            <div class="img-skeleton skeleton"></div>

            <div class="country-details">
              <div class="country-name skeleton"></div>

              <div class="details-wrapper">
                <div class="country-detail skeleton"></div>
                <div class="country-detail skeleton"></div>
                <div class="country-detail skeleton"></div>
                <div class="country-detail skeleton"></div>
                <div class="country-detail skeleton"></div>
                <div class="country-detail skeleton"></div>
                <div class="country-detail skeleton"></div>
                <div class="country-detail skeleton"></div>
              </div>
              <div class="country-borders">
                <div class="border-label skeleton"></div>
                <ul class="borders-list">
                  <li>
                    <div class="border-cta skeleton"></div>
                  </li>
                  <li>
                    <div class="border-cta skeleton"></div>
                  </li>
                  <li>
                    <div class="border-cta skeleton"></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ng-container>

        <ng-template #countryTemplate>
          <ng-container
            *ngIf="country$ | async as country; else noCountryTemplate"
          >
            <div class="country-wrapper">
              <img
                [src]="country.flag"
                [alt]="'Flag image of ' + country.name"
              />

              <div class="country-details">
                <h2 class="country-name">{{ country.name }}</h2>

                <div class="details-wrapper">
                  <p class="country-detail">
                    <strong class="label">Native Name: </strong>
                    {{ country.nativeName }}
                  </p>
                  <p class="country-detail">
                    <strong class="label">Population: </strong>
                    {{ country.population.toLocaleString() }}
                  </p>
                  <p class="country-detail">
                    <strong class="label">Region: </strong>
                    {{ country.region }}
                  </p>
                  <p class="country-detail">
                    <strong class="label">Sub Region: </strong>
                    {{ country.subregion }}
                  </p>
                  <p class="country-detail top">
                    <strong class="label">Capital: </strong>
                    {{ country.capital || '-' }}
                  </p>
                  <p
                    class="country-detail"
                    *ngIf="country.topLevelDomain.length > 0"
                  >
                    <strong class="label"> Top Level Domain: </strong>
                    {{ (country.topLevelDomain || []).join(', ') }}
                  </p>
                  <p
                    class="country-detail"
                    *ngIf="currencies$ | async as currencies"
                  >
                    <strong class="label"> Currencies: </strong>
                    {{ currencies }}
                  </p>
                  <p
                    class="country-detail"
                    *ngIf="languages$ | async as languages"
                  >
                    <strong class="label"> Languages: </strong>
                    {{ languages }}
                  </p>
                </div>
                <div class="country-borders" *ngIf="borders$ | async as border">
                  <strong class="border-label"> Border Countries: </strong>
                  <ul class="borders-list">
                    <li *ngFor="let border of borders$ | async">
                      <a
                        [routerLink]="['/countries', border]"
                        class="border-cta"
                      >
                        <span>{{ border }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ng-container>
        </ng-template>

        <ng-template #noCountryTemplate>
          <div class="not-found-wrapper">
            <h2 class="not-found-title">Country Not Found</h2>
            <p class="not-found-description">
              No country with this name was found, please enter a valid name.
            </p>
          </div>
        </ng-template>
      </div>
    </section>
  `,
  styleUrls: ['./country-page.component.css'],
})
export class CountryPageComponent {
  faArrLeft = faArrowLeft;

  countries$ = this.countriesService.getAllCountries();

  country$ = combineLatest([this.countries$, this.route.params]).pipe(
    map(([countries, { name }]) =>
      countries.find(
        (country) => country.name.toLowerCase() === name?.toLowerCase()
      )
    )
  );

  currencies$ = this.country$.pipe(
    map((country) => (country?.currencies || []).map((c) => c.name).join(', '))
  );

  languages$ = this.country$.pipe(
    map((country) => (country?.languages || []).map((l) => l.name).join(', '))
  );

  borders$ = combineLatest([
    this.country$.pipe(map((country) => country?.borders)),
    this.countries$,
  ]).pipe(
    map(([borders, countries]) => {
      if (!borders) return null;
      return countries
        .filter((c) => borders?.includes(c.alpha3Code))
        .map((c) => c.name);
    })
  );

  filters$ = this.countriesService.getLastFilters();

  isLoading$ = this.countriesService.getIsLoading();

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute
  ) {}
}
