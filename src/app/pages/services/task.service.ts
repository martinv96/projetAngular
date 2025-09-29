import { Injectable } from '@angular/core';

export interface Task {
  name: string;
  status: 'En cours' | 'Terminée' | 'Urgente';
}

export interface UserProfile {
  id: string;
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  avatar?: string;
  dateInscription: string;
  taches: Task[];
  theme: 'light' | 'dark';
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private users: UserProfile[] = [];
  private currentUserId: string | null = null;

  constructor() {
    this.loadUsers();
  }

  // --- Gestion des utilisateurs ---
  getUsers(): UserProfile[] {
    return this.users;
  }

  getCurrentUser(): UserProfile | null {
    return this.users.find(u => u.id === this.currentUserId) || null;
  }

  selectUser(id: string) {
    this.currentUserId = id;
    localStorage.setItem('currentUserId', id);
  }

  createUser(user: UserProfile) {
    this.users.push(user);
    this.saveUsers();
    this.selectUser(user.id);
  }

  deleteUser(id: string) {
    this.users = this.users.filter(u => u.id !== id);
    if (this.currentUserId === id) this.currentUserId = null;
    this.saveUsers();
  }

  // --- Gestion des tâches ---
  addTask(task: Task) {
    const user = this.getCurrentUser();
    if (!user) return;
    user.taches.push(task);
    this.saveUsers();
  }

  removeTask(index: number) {
    const user = this.getCurrentUser();
    if (!user) return;
    user.taches.splice(index, 1);
    this.saveUsers();
  }

  changeTaskStatus(index: number) {
    const user = this.getCurrentUser();
    if (!user) return;
    const order: Task['status'][] = ['En cours', 'Terminée', 'Urgente'];
    const currentIndex = order.indexOf(user.taches[index].status);
    user.taches[index].status = order[(currentIndex + 1) % order.length];
    this.saveUsers();
  }

  // --- Persistance ---
  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private loadUsers() {
    const saved = localStorage.getItem('users');
    this.users = saved ? JSON.parse(saved) : [];
    this.currentUserId = localStorage.getItem('currentUserId');
  }
}
