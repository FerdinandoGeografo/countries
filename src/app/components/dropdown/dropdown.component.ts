import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown',
  template: `
    <div class="dropdown-wrapper">
      <div
        class="select-wrapper"
        tabindex="0"
        (click)="toggleDropdown()"
        (keydown.enter)="toggleDropdown()"
      >
        <span class="select-label">
          {{ selectedOption || 'Filter by Region' }}
        </span>
        <fa-icon
          class="select-caret"
          [ngClass]="isOpen ? 'caret-down' : ''"
          [icon]="faChevDown"
        >
        </fa-icon>
      </div>

      <div class="menu" [ngClass]="{ open: isOpen }">
        <ul class="dropdown">
          <ng-container *ngFor="let option of options">
            <li
              class="option"
              tabindex="0"
              [ngClass]="{ 'selected-option': option === selectedOption }"
              (click)="onSelectOption(option)"
              (keydown.enter)="onSelectOption(option)"
            >
              {{ option }}
            </li>
          </ng-container>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  faChevDown = faChevronDown;

  options: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  selectedOption: string = '';

  constructor(
    private elementRef: ElementRef<HTMLDivElement>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    document.addEventListener('click', this.onOutsideClick.bind(this));

    const region = this.route.snapshot.queryParamMap.get('region');
    if (!region) return;

    if (this.options.includes(region)) this.selectedOption = region;
  }

  onOutsideClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onSelectOption(opt: string) {
    this.selectedOption = this.selectedOption === opt ? '' : opt;
    this.isOpen = false;

    this.router.navigate(['/countries'], {
      queryParams: { region: this.selectedOption },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onOutsideClick.bind(this));
  }
}
