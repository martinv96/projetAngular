import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../services/task.service';
import { ThemeService } from '../services/theme.service';

interface CalendarDay {
  date: Date;
  label: number;
  inCurrentMonth: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  tasks: Task[] = [];

  // calendrier
  current: Date = new Date();
  currentYear: number = this.current.getFullYear();
  years: number[] = [];
  weeks: CalendarDay[][] = [];
  monthLabel = '';
  selectedDate: Date | null = null;

  weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // Thème
  currentTheme: 'light' | 'dark' = 'light';

  constructor(private taskService: TaskService, private themeService: ThemeService) {
    this.loadTasks();
    this.buildYears();
    this.buildCalendar(this.current);

    // Appliquer le thème courant
    const userTheme = this.taskService.getCurrentUser()?.theme || 'light';
    this.currentTheme = userTheme;
    this.themeService.setTheme(this.currentTheme);
  }

  // --- Gestion du thème ---
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(this.currentTheme);
  }

  // --- Gestion des tâches ---
  loadTasks() {
    this.tasks = this.taskService.getCurrentUser()?.taches || [];
  }

  getBadgeClass(status: Task['status']) {
    if (status === 'Terminée') return 'bg-success';
    if (status === 'En cours') return 'bg-warning';
    if (status === 'Urgente') return 'bg-danger';
    return 'bg-secondary';
  }

  // --- Calendar helpers ---
  private startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
  private endOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }
  private isSameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

  private buildCalendar(reference: Date) {
    const first = this.startOfMonth(reference);
    const last = this.endOfMonth(reference);
    this.monthLabel = reference.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - gridStart.getDay());

    const days: CalendarDay[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      days.push({
        date: d,
        label: d.getDate(),
        inCurrentMonth: d.getMonth() === reference.getMonth(),
        isToday: this.isSameDay(d, new Date())
      });
    }

    this.weeks = [];
    for (let w = 0; w < 6; w++) {
      this.weeks.push(days.slice(w * 7, w * 7 + 7));
    }
  }

  goPrevMonth() {
    this.current = new Date(this.current.getFullYear(), this.current.getMonth() - 1, 1);
    this.buildCalendar(this.current);
    this.currentYear = this.current.getFullYear();
  }

  goNextMonth() {
    this.current = new Date(this.current.getFullYear(), this.current.getMonth() + 1, 1);
    this.buildCalendar(this.current);
    this.currentYear = this.current.getFullYear();
  }

  goToday() {
    this.current = new Date();
    this.buildCalendar(this.current);
    this.selectedDate = new Date();
    this.currentYear = this.current.getFullYear();
  }

  selectDate(day: CalendarDay) {
    this.selectedDate = new Date(day.date);
    console.log('Date sélectionnée:', this.selectedDate.toISOString().slice(0,10));
  }

  isoDate(d: Date) { return d.toISOString().slice(0, 10); }

  private buildYears() {
    const startYear = this.current.getFullYear() - 10;
    const endYear = this.current.getFullYear() + 10;
    this.years = [];
    for (let y = startYear; y <= endYear; y++) this.years.push(y);
  }

  showYearDropdown = false;

  changeYear(year: number) {
    this.current.setFullYear(year);
    this.currentYear = year;
    this.buildCalendar(this.current);
  }
}
