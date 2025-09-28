import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { TasksComponent } from './pages/tasks/tasks';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'tasks', component: TasksComponent },
];
