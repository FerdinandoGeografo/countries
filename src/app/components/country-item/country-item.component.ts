import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country-item',
  template: `
    <ng-container *ngIf="country; else loadingTemplate">
      <div
        class="country-card"
        [routerLink]="['/countries', country.name]"
        tabindex="0"
        (keydown.enter)="goToCountry()"
      >
        <img
          class="country-img"
          [src]="country.flags.png"
          [alt]="'Flag image of ' + country.name"
          loading="lazy"
        />
        <div class="country-text-box">
          <h2 class="country-name">{{ country.name }}</h2>

          <div class="country-details">
            <p class="country-detail">
              <strong class="label">Population: </strong>
              {{ country.population.toLocaleString() }}
            </p>
            <p class="country-detail">
              <strong class="label">Region: </strong>
              {{ country.region }}
            </p>
            <p class="country-detail" *ngIf="!!country.capital">
              <strong class="label">Capital: </strong>
              {{ country.capital }}
            </p>
          </div>
        </div>
      </div>
    </ng-container>

    <ng-template #loadingTemplate>
      <div class="country-card">
        <div class="country-img skeleton"></div>
        <div class="country-text-box">
          <div class="country-name skeleton"></div>
          <div class="country-details">
            <div class="country-detail skeleton"></div>
            <div class="country-detail skeleton"></div>
            <div class="country-detail skeleton"></div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .country-card {
        box-shadow: 0 0 0.7rem 0.2rem hsla(0, 0%, 0%, 0.03);
        background-color: var(--color-elements);
        color: var(--text-color);
        min-height: 33.6rem;
        height: 100%;
        border-radius: 0.5rem;
        cursor: pointer;

        transition: all 0.3s;
      }

      .country-card:hover,
      .country-card:focus {
        transform: translateY(-1rem);
      }

      .country-img {
        border-radius: 0.5rem 0.5rem 0 0;
        max-width: 26.4rem;
        width: 100%;
        height: 16rem;
        margin-bottom: 2.4rem;
      }

      .country-text-box {
        padding: 0 2.4rem 2.4rem 2.4rem;
      }

      .country-name {
        font-size: 1.8rem;
        font-weight: 800;
        line-height: 2.6rem;
        margin-bottom: 1.6rem;
      }

      .country-name.skeleton {
        border-radius: 2rem;
        height: 2.6rem;
        width: 100%;
      }

      .country-details {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
      }

      .country-detail {
        font-weight: 300;
        line-height: 1.6rem;
      }

      .country-detail.skeleton {
        border-radius: 2rem;
        height: 1.6rem;
        width: 80%;
      }

      .label {
        font-weight: 600;
      }

      /** QUERIES **/
      @media (max-width: 77.5em) {
        .country-img {
          max-width: 100%;
        }
      }

      @media (max-width: 64em) {
        .country-card {
          min-height: 35rem;
        }

        .country-img {
          height: 20rem;
        }

        .country-text-box {
          padding-bottom: 2rem;
        }
      }

      @media (max-width: 48em) {
        .country-card {
          min-height: 42rem;
        }

        .country-img {
          max-width: 37.5rem;
          height: 20rem;
          margin-bottom: 3rem;
        }

        .country-text-box {
          padding: 0 3rem 2rem 3rem;
        }

        .country-name {
          font-size: 2.25rem;
          line-height: 3.25rem;
        }

        .country-details {
          gap: 1rem;
        }

        .country-detail {
          font-size: 1.75rem;
          line-height: 2rem;
        }
      }

      @media (max-width: 40em) {
        .country-img {
          max-width: 40rem;
          height: 25rem;
        }
      }

      @media (max-width: 27em) {
        .country-img {
          max-width: 33.375rem;
          height: 20rem;
        }
      }
    `,
  ],
})
export class CountryItemComponent {
  @Input() country?: Country;

  constructor(private router: Router) { }

  goToCountry() {
    if (this.country) this.router.navigate(['countries', this.country.name]);
  }
}
