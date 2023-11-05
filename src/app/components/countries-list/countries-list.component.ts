import { Component } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-countries-list',
  template: `
    <ul class="countries-list">
      <ng-container *ngIf="isLoading$ | async; else itemsTemplate">
        <li *ngFor="let _ of loadingEntries">
          <app-country-item></app-country-item>
        </li>
      </ng-container>

      <ng-template #itemsTemplate>
        <li *ngFor="let country of filteredCountries$ | async">
          <app-country-item [country]="country"></app-country-item>
        </li>
      </ng-template>
    </ul>
  `,
  styles: [
    `
      .countries-list {
        list-style-type: none;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        row-gap: 7.2rem;
        column-gap: 7.5rem;
      }

      /** QUERIES **/
      @media (max-width: 77.5em) {
        .countries-list {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 64em) {
        .countries-list {
          grid-template-columns: repeat(2, 1fr);
          row-gap: 5rem;
        }
      }

      @media (max-width: 48em) {
        .countries-list {
          padding: 0 4.75rem;
        }
      }

      @media (max-width: 40em) {
        .countries-list {
          grid-template-columns: 40rem;
          justify-content: center;
        }
      }

      @media (max-width: 27em) {
        .countries-list {
          grid-template-columns: 33.375rem;
          justify-content: center;
        }
      }
    `,
  ],
})
export class CountriesListComponent {
  filteredCountries$ = this.countriesService.getCountries();
  isLoading$ = this.countriesService.getIsLoading();

  loadingEntries = Array.from({ length: 8 });

  constructor(private countriesService: CountriesService) { }
}
