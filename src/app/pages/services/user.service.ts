import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
export class UserService {
  private users: UserProfile[] = [];
  private currentUserId: string | null = null;

  public currentUser$ = new BehaviorSubject<UserProfile | null>(null);

  constructor() {
    this.loadUsers();
    this.loadCurrentUser();
  }

  // --- Utilisateurs ---
  private loadUsers() {
    const saved = localStorage.getItem('users');
    this.users = saved ? JSON.parse(saved) : [];
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private loadCurrentUser() {
    const id = localStorage.getItem('currentUserId');
    this.currentUserId = id;
    if (id) {
      const user = this.users.find(u => u.id === id) || null;
      this.currentUser$.next(user);
    }
  }

  getUsers(): UserProfile[] {
    return this.users;
  }

  selectUser(id: string) {
    this.currentUserId = id;
    localStorage.setItem('currentUserId', id);
    const user = this.users.find(u => u.id === id) || null;
    this.currentUser$.next(user);
  }

  createUser(nom: string, prenom: string, pseudo: string, email: string) {
    const id = Date.now().toString();
    const user: UserProfile = {
      id,
      nom,
      prenom,
      pseudo,
      email,
      dateInscription: new Date().toISOString(),
      taches: [],
      theme: 'light'
    };
    this.users.push(user);
    this.saveUsers();
    this.selectUser(id);
  }

  deleteUser(id: string) {
    this.users = this.users.filter(u => u.id !== id);
    if (this.currentUserId === id) {
      this.currentUserId = null;
      localStorage.removeItem('currentUserId');
      this.currentUser$.next(null);
    }
    this.saveUsers();
  }

  // --- Tâches ---
  addTask(task: Task) {
    if (!this.currentUserId) return;
    const user = this.users.find(u => u.id === this.currentUserId);
    if (user) {
      user.taches.push(task);
      this.saveUsers();
      this.currentUser$.next(user);
    }
  }

  removeTask(index: number) {
    if (!this.currentUserId) return;
    const user = this.users.find(u => u.id === this.currentUserId);
    if (user) {
      user.taches.splice(index, 1);
      this.saveUsers();
      this.currentUser$.next(user);
    }
  }

  changeTaskStatus(index: number) {
    if (!this.currentUserId) return;
    const user = this.users.find(u => u.id === this.currentUserId);
    if (!user) return;
    const statusOrder: Task['status'][] = ['En cours', 'Terminée', 'Urgente'];
    const currentIndex = statusOrder.indexOf(user.taches[index].status);
    user.taches[index].status = statusOrder[(currentIndex + 1) % statusOrder.length];
    this.saveUsers();
    this.currentUser$.next(user);
  }

  // --- Thème ---
  toggleTheme() {
    if (!this.currentUserId) return;
    const user = this.users.find(u => u.id === this.currentUserId);
    if (user) {
      user.theme = user.theme === 'light' ? 'dark' : 'light';
      this.saveUsers();
      this.currentUser$.next(user);
    }
  }

  getCurrentUser(): UserProfile | null {
    return this.users.find(u => u.id === this.currentUserId) || null;
  }
  // Sauvegarde l'utilisateur courant après modification
saveCurrentUserChanges(updatedUser: UserProfile) {
  if (!this.currentUserId) return;
  const userIndex = this.users.findIndex(u => u.id === this.currentUserId);
  if (userIndex !== -1) {
    // Remplace l'ancien objet par le nouvel objet mis à jour
    this.users[userIndex] = { ...updatedUser };
    this.saveUsers();
    this.currentUser$.next(this.users[userIndex]);
  }
}

}
