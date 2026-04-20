import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard-component/dashboard-component.component';
import { HistoryComponent } from './history-component/history-component.component';
import { ProfileComponent } from './profile/profile.component';
import { Login } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth/auth.guard';
import { DataComponent } from './data/data.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

  
{
  path: 'data',
  loadComponent: () =>
    import('./data/data.component')
      .then(m => m.DataComponent),
  canActivate: [authGuard]
},


  { path: '**', redirectTo: 'login' }
];