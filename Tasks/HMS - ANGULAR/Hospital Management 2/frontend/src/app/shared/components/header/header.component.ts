import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../store/auth/auth.actions';
import { selectUser } from '../../../store/auth/auth.selectors';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser$!: Observable<User | null>;
  showUserMenu = false;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(selectUser);
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.showUserMenu = false;
  }

  navigateToProfile(): void {
    this.showUserMenu = false;
    // Navigate based on user role
  }
}
