import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme$ = new BehaviorSubject<'light' | 'dark'>('light');

  constructor() {
    const saved = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
    if (saved) {
      this.theme$.next(saved);
      this.applyTheme(saved);
    }
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme$.next(theme);
    localStorage.setItem('app-theme', theme);
    this.applyTheme(theme);
  }

  getTheme() {
    return this.theme$.asObservable();
  }

  private applyTheme(theme: 'light' | 'dark') {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.body.classList.toggle('light-theme', theme === 'light');
  }
}
