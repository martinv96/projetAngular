import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutComponent implements OnInit {
  themeClass: 'light' | 'dark' = 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // s'abonner aux changements de thème
    this.themeService.getTheme().subscribe(theme => {
      this.themeClass = theme;
    });
  }
}
