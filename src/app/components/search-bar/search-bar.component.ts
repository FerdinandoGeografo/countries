import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="search-bar-wrapper">
      <fa-icon class="search-icon" [icon]="faSearch"></fa-icon>
      <input
        #searchInput
        class="search-bar-input"
        type="text"
        placeholder="Search for a country..."
      />
    </div>
  `,
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', { static: true })
  searchInput?: ElementRef<HTMLInputElement>;

  faSearch = faMagnifyingGlass;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchInput!.nativeElement.value =
      this.route.snapshot.queryParamMap.get('query') || '';
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput!.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        map((event) => (event.target as HTMLInputElement).value),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.router.navigate(['/countries'], {
          queryParams: { query },
          queryParamsHandling: 'merge',
        });
      });
  }
}
