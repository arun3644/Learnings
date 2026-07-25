import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../../../store/auth/auth.selectors';
import { User } from '../../../core/models/user.model';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  currentUser$!: Observable<User | null>;
  menuItems: MenuItem[] = [];
  isCollapsed = false;

  allMenuItems: MenuItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/admin/dashboard', roles: ['ADMIN'] },
    { label: 'Manage Doctors', icon: '👨‍⚕️', route: '/admin/doctors', roles: ['ADMIN'] },
    { label: 'Manage Patients', icon: '🏥', route: '/admin/patients', roles: ['ADMIN'] },
    { label: 'Manage Nurses', icon: '👩‍⚕️', route: '/admin/nurses', roles: ['ADMIN'] },
    { label: 'Appointments', icon: '📅', route: '/admin/appointments', roles: ['ADMIN'] },
    { label: 'Statistics', icon: '📈', route: '/admin/statistics', roles: ['ADMIN'] },
    
    { label: 'Dashboard', icon: '📊', route: '/doctor/dashboard', roles: ['DOCTOR'] },
    { label: 'Appointments', icon: '📅', route: '/doctor/appointments', roles: ['DOCTOR'] },
    { label: 'Time Slots', icon: '⏰', route: '/doctor/time-slots', roles: ['DOCTOR'] },
    { label: 'Patients', icon: '🏥', route: '/doctor/patients', roles: ['DOCTOR'] },
    { label: 'Today Schedule', icon: '📋', route: '/doctor/schedule', roles: ['DOCTOR'] },
    { label: 'Profile', icon: '👤', route: '/doctor/profile', roles: ['DOCTOR'] },
    
    { label: 'Dashboard', icon: '📊', route: '/patient/dashboard', roles: ['PATIENT'] },
    { label: 'Book Appointment', icon: '➕', route: '/patient/book', roles: ['PATIENT'] },
    { label: 'My Appointments', icon: '📅', route: '/patient/appointments', roles: ['PATIENT'] },
    { label: 'Doctors', icon: '👨‍⚕️', route: '/patient/doctors', roles: ['PATIENT'] },
    { label: 'History', icon: '📜', route: '/patient/history', roles: ['PATIENT'] },
    { label: 'Profile', icon: '👤', route: '/patient/profile', roles: ['PATIENT'] },
    
    { label: 'Dashboard', icon: '📊', route: '/nurse/dashboard', roles: ['NURSE'] },
    { label: 'Patient Care', icon: '🏥', route: '/nurse/patient-care', roles: ['NURSE'] },
    { label: 'Profile', icon: '👤', route: '/nurse/profile', roles: ['NURSE'] }
  ];

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(selectUser);
    this.currentUser$.subscribe(user => {
      if (user?.role) {
        this.menuItems = this.allMenuItems.filter(item => 
          item.roles.includes(user.role)
        );
      }
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
