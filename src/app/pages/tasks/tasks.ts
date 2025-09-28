import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../services/task.service';

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
  newTaskStatus = 'En cours'; // valeur par défaut

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTaskName.trim()) {
      this.taskService.addTaskWithStatus(this.newTaskName.trim(), this.newTaskStatus);
      this.newTaskName = '';
      this.newTaskStatus = 'En cours'; // reset après ajout
    }
  }

  removeTask(index: number) {
    this.taskService.removeTask(index);
  }

  changeStatus(index: number) {
    this.taskService.changeStatus(index);
  }

  getBadgeClass(status: string) {
    if (status === "Terminée") return 'bg-success';
    if (status === "En cours") return 'bg-warning';
    if (status === "Urgente") return 'bg-danger';
    return 'bg-secondary';
  }
}
