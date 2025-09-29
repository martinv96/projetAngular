import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../services/task.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  newTaskName = '';
  newTaskStatus: Task['status'] = 'En cours'; // valeur par défaut

  constructor(private taskService: TaskService, private themeService: ThemeService) {
    this.loadTasks();

    // Applique le thème du user actuel dès le chargement
    const currentUser = this.taskService.getCurrentUser();
    if (currentUser) {
      this.themeService.setTheme(currentUser.theme);
    }
  }

  loadTasks() {
    this.tasks = this.taskService.getCurrentUser()?.taches || [];
  }

  addTask() {
    if (!this.newTaskName.trim()) return;
    this.taskService.addTask({ name: this.newTaskName.trim(), status: this.newTaskStatus });
    this.newTaskName = '';
    this.newTaskStatus = 'En cours';
    this.loadTasks(); // met à jour la liste
  }

  removeTask(index: number) {
    this.taskService.removeTask(index);
    this.loadTasks();
  }

  changeStatus(index: number) {
    this.taskService.changeTaskStatus(index);
    this.loadTasks();
  }

  getBadgeClass(status: Task['status']) {
    if (status === 'Terminée') return 'bg-success';
    if (status === 'En cours') return 'bg-warning';
    if (status === 'Urgente') return 'bg-danger';
    return 'bg-secondary';
  }
}
