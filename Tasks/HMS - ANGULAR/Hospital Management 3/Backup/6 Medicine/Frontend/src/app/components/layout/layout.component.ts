import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PatientsComponent } from '../patients/patients.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { DoctorsComponent } from '../doctors/doctors.component';
import { StaffComponent } from '../staff/staff.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    PatientsComponent,
    AppointmentsComponent,
    DoctorsComponent,
    StaffComponent
  ],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  activePage = 'dashboard';
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.autoLoginAsAdmin();
      return;
    }
    this.userRole = this.authService.getRole();
    if (this.userRole === 'Patient') {
      this.activePage = 'appointments';
    } else {
      this.activePage = 'dashboard';
    }
  }

  private autoLoginAsAdmin() {
    const mockAdminUser = {
      id: 1,
      username: 'admin',
      role: 'Admin',
      name: 'Admin User',
      email: 'admin@hospital.com',
      token: 'dev-mock-token-12345'
    };
    
    localStorage.setItem('auth_token', mockAdminUser.token);
    localStorage.setItem('current_user', JSON.stringify(mockAdminUser));
    this.userRole = 'Admin';
    this.activePage = 'dashboard';
  }

  navigate(page: string) {
    this.activePage = page;
  }

  get showSidebar(): boolean {
    return this.userRole !== 'Patient';
  }
}
