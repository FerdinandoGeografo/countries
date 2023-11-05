import { Component } from '@angular/core';
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons';
import { faMoon as faMoonSolid } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <ng-container *ngIf="theme$ | async as theme">
      <button class="switcher-btn" (click)="onSwitchTheme()">
        <fa-icon
          [ngClass]="{ solid: theme === 'dark' }"
          [icon]="theme === 'dark' ? faMoonSolid : faMoonReg"
        ></fa-icon>
        <span class="switcher-label">
          {{ theme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
        </span>
      </button>
    </ng-container>
  `,
  styles: [
    `
      .switcher-btn {
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 2.182rem;
        color: var(--text-color);
        display: flex;
        align-items: baseline;
        gap: 0.8rem;
        cursor: pointer;
        max-width: 10.8rem;
        width: 100%;
        border-radius: 0.5rem;

        transition: all 0.3s;
      }

      .switcher-btn:hover,
      .switcher-btn:focus {
        scale: 1.05;
      }

      fa-icon ::ng-deep svg {
        width: 1.4rem;
        height: 1.5rem;
        stroke: var(--text-color);
      }

      fa-icon.solid ::ng-deep svg path {
        fill: #fff;
        stroke: #fff;
      }

      /** QUERIES **/
      @media (max-width: 48em) {
        .switcher-btn {
          font-size: 1.5rem;
          line-height: 2.046rem;
          align-items: center;
        }

        fa-icon ::ng-deep svg {
          width: 2rem;
          height: 2rem;
        }
      }
    `,
  ],
})
export class ThemeSwitcherComponent {
  faMoonReg = faMoonRegular;
  faMoonSolid = faMoonSolid;

  theme$ = this.themeService.getTheme();

  constructor(private themeService: ThemeService) {}

  onSwitchTheme() {
    this.themeService.switchTheme();
  }
}
