import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  tasks: Task[];

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  getBadgeClass(status: string) {
    if (status === "Terminée") return 'bg-success';
    if (status === "En cours") return 'bg-warning';
    if (status === "Urgente") return 'bg-danger';
    return 'bg-secondary';
  }
}
