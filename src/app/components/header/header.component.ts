import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="container">
        <a routerLink="/countries" class="logo">
          <h1 class="logo-text">Where in the world?</h1>
        </a>
        <app-theme-switcher></app-theme-switcher>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        background-color: var(--color-elements);
        box-shadow: inset 0 -0.2rem 0.4rem 0 hsla(0, 0%, 0%, 0.06);
        transition: color 0.3s, background-color 0.3s;
      }

      .container {
        max-width: 144rem;
        width: 100%;
        margin: 0 auto;
        padding: 2.3rem 8rem 2.4rem 8.1rem;

        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo:link,
      .logo:visited {
        text-decoration: none;
        border-radius: 0.5rem;
        transition: all 0.3s;
      }

      .logo-text {
        font-size: 2.4rem;
        font-weight: 800;
        line-height: 3.274rem;
        color: var(--text-color);
      }

      /** QUERIES **/
      @media (max-width: 48em) {
        .container {
          padding: 3.75rem 2rem;
        }

        .logo-text {
          font-size: 1.75rem;
          line-height: 2.5rem;
        }
      }
    `,
  ],
})
export class HeaderComponent { }
