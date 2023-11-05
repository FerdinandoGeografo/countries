import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
  );
  private theme$ = this.themeSubject.asObservable().pipe(
    tap((theme) => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }

      localStorage.setItem('theme', theme);
    })
  );

  constructor() {}

  getTheme() {
    return this.theme$;
  }

  switchTheme() {
    this.themeSubject.next(
      this.themeSubject.getValue() === 'dark' ? 'light' : 'dark'
    );
  }
}
