import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  currentTheme: 'light' | 'dark' = 'light';

  constructor(private themeService: ThemeService) {
    // Abonne le composant pour recevoir les changements de thème
    this.themeService.getTheme().subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
}
