import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../services/theme.service';

interface Task {
  name: string;
  status: 'En cours' | 'Terminée' | 'Urgente';
}

interface UserProfile {
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

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent {
  users: UserProfile[] = [];
  currentUser: UserProfile | null = null;
  editableUser: UserProfile | null = null;

  newTaskName = '';
  newTaskStatus: Task['status'] = 'En cours';
  selectedUserId: string | null = null;

  constructor(private themeService: ThemeService) {
    this.loadUsers();
    this.loadCurrentUser();
    if (this.currentUser) {
      this.selectedUserId = this.currentUser.id;
      this.themeService.setTheme(this.currentUser.theme);
    }
  }

  // --- Profils ---
  loadUsers() {
    const saved = localStorage.getItem('users');
    this.users = saved ? JSON.parse(saved) : [];
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  loadCurrentUser() {
    const id = localStorage.getItem('currentUserId');
    if (id) this.selectUser(id);
  }

  selectUser(id: string) {
    const user = this.users.find(u => u.id === id) || null;
    this.currentUser = user;
    this.editableUser = user ? { ...user } : null;
    this.selectedUserId = id;
    localStorage.setItem('currentUserId', id);

    if (user) this.themeService.setTheme(user.theme);
  }

  createUser(nom: string, prenom: string, pseudo: string, email: string) {
    const id = Date.now().toString();
    const user: UserProfile = {
      id, nom, prenom, pseudo, email,
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
    if (this.currentUser?.id === id) {
      this.currentUser = null;
      this.editableUser = null;
      this.selectedUserId = null;
      localStorage.removeItem('currentUserId');
    }
    this.saveUsers();
  }

  // --- Tâches ---
  addTask() {
    if (!this.currentUser || !this.newTaskName.trim()) return;
    this.currentUser.taches.push({ name: this.newTaskName.trim(), status: this.newTaskStatus });
    this.newTaskName = '';
    this.newTaskStatus = 'En cours';
    this.syncEditableUser();
    this.saveUsers();
  }

  removeTask(index: number) {
    if (!this.currentUser) return;
    this.currentUser.taches.splice(index, 1);
    this.syncEditableUser();
    this.saveUsers();
  }

  changeTaskStatus(index: number) {
    if (!this.currentUser) return;
    const order: Task['status'][] = ['En cours', 'Terminée', 'Urgente'];
    const currentIndex = order.indexOf(this.currentUser.taches[index].status);
    this.currentUser.taches[index].status = order[(currentIndex + 1) % order.length];
    this.syncEditableUser();
    this.saveUsers();
  }

  // --- Avatar ---
  onAvatarSelected(event: Event) {
    if (!this.currentUser || !this.editableUser) return;
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const avatarDataUrl = reader.result as string;
      this.currentUser!.avatar = avatarDataUrl;
      this.editableUser!.avatar = avatarDataUrl;
      this.saveUsers();
    };
    reader.readAsDataURL(file);
  }

  // --- Synchronisation editableUser <-> currentUser ---
  syncEditableUser() {
    if (this.currentUser) this.editableUser = { ...this.currentUser };
  }

  applyChanges() {
    if (!this.currentUser || !this.editableUser) return;
    Object.assign(this.currentUser, this.editableUser);
    this.saveUsers();
    this.themeService.setTheme(this.currentUser.theme);
  }

  // --- Thème ---
  toggleTheme() {
    if (!this.currentUser) return;
    this.currentUser.theme = this.currentUser.theme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(this.currentUser.theme);
    this.syncEditableUser();
    this.saveUsers();
  }

  // --- Tri des tâches ---
  sortTasksByStatus() {
    if (!this.currentUser) return;
    this.currentUser.taches.sort((a, b) => a.status.localeCompare(b.status));
    this.syncEditableUser();
  }

  sortTasksByName() {
    if (!this.currentUser) return;
    this.currentUser.taches.sort((a, b) => a.name.localeCompare(b.name));
    this.syncEditableUser();
  }

  // --- Styles badges ---
  getBadgeClass(status: Task['status'] | undefined) {
    switch (status) {
      case 'Terminée': return 'bg-success';
      case 'En cours': return 'bg-warning';
      case 'Urgente': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
