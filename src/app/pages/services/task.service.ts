import { Injectable } from '@angular/core';

export interface Task {
  name: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasks: Task[] = [];

  constructor() {
    // Charger les tâches depuis localStorage si elles existent
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
    } else {
      // Tâches par défaut
      this.tasks = [
        { name: "Acheter du café", status: "Terminée" },
        { name: "Répondre aux e-mails", status: "En cours" },
        { name: "Terminer le projet Angular", status: "Urgente" }
      ];
      this.saveTasks();
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks() {
    return this.tasks;
  }

  addTaskWithStatus(name: string, status: string) {
    this.tasks.push({ name, status });
    this.saveTasks();
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  changeStatus(index: number) {
    const statusOrder = ["En cours", "Terminée", "Urgente"];
    const currentIndex = statusOrder.indexOf(this.tasks[index].status);
    this.tasks[index].status = statusOrder[(currentIndex + 1) % statusOrder.length];
    this.saveTasks();
  }
}
