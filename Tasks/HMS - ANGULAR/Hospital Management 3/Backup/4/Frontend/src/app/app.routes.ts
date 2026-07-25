import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'app', component: LayoutComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
