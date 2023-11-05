import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private API_URL = 'https://restcountries.com/v2/all';

  private countriesSubject = new BehaviorSubject<Country[]>([]);
  private countries$ = this.countriesSubject.asObservable();

  private filterSubject = new BehaviorSubject<{
    query?: string;
    region?: string;
  }>({});
  private filter$ = this.filterSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private isLoading$ = this.isLoadingSubject.asObservable();

  private filteredCountries$ = combineLatest([
    this.route.queryParams,
    this.countries$,
  ]).pipe(
    tap(([{ query, region }]) =>
      this.filterSubject.next({ query: query || '', region: region || '' })
    ),
    map(([{ query, region }, countries]) => {
      return countries.filter(
        (country) =>
          (!query ||
            country.name.toLowerCase().includes(query.toLowerCase())) &&
          (!region || country.region === region)
      );
    })
  );

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  loadCountries() {
    this.isLoadingSubject.next(true);
    this.http
      .get<Country[]>(this.API_URL)
      .pipe(tap(() => this.isLoadingSubject.next(false)))
      .subscribe((countries) => this.countriesSubject.next(countries));
  }

  getAllCountries() {
    return this.countriesSubject.asObservable();
  }

  getCountries() {
    return this.filteredCountries$;
  }

  getLastFilters() {
    return this.filter$;
  }

  getIsLoading() {
    return this.isLoading$;
  }
}
