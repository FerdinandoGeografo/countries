import { Component } from '@angular/core';

@Component({
  selector: 'app-countries-page',
  template: `
    <section class="countries-section">
      <div class="container">
        <div class="countries-filter">
          <app-search-bar></app-search-bar>
          <app-dropdown></app-dropdown>
        </div>

        <app-countries-list></app-countries-list>
      </div>
    </section>
  `,
  styles: [
    `
      .countries-section {
        background-color: var(--bg-color);
        min-height: 100vh;
        transition: background-color 0.3s;
      }

      .container {
        margin: 0 auto;
        max-width: 144rem;
        width: 100%;
        padding: 4.8rem 8rem 4.5rem 8rem;
      }

      .countries-filter {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4.8rem;
      }

      /** QUERIES **/
      @media (max-width: 77.5em) {
        .container {
          padding-left: 6rem;
          padding-right: 6rem;
        }
      }

      @media (max-width: 64em) {
        .countries-filter {
          flex-direction: column;
          align-items: start;
          gap: 5rem;
        }
      }

      @media (max-width: 48em) {
        .container {
          padding: 3rem 2rem 8.125rem 2rem;
        }

        .countries-filter {
          margin-bottom: 5rem;
        }
      }
    `,
  ],
})
export class CountriesPageComponent {}
