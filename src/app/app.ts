import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService, UserProfile } from './pages/services/user.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from './pages/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('projetAngular');

  currentUser: UserProfile | null = null;
  theme: 'light-theme' | 'dark-theme' = 'light-theme'; // ✅ variable pour ngClass

  constructor(
    private userService: UserService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Abonnement pour l'utilisateur courant
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;

      // Applique le thème de l'utilisateur si défini
      if (user) {
        this.themeService.setTheme(user.theme);
      }
    });

    // Abonnement au thème pour mise à jour réactive
    this.themeService.getTheme().subscribe(t => {
      this.theme = t === 'light' ? 'light-theme' : 'dark-theme';
    });
  }
}
