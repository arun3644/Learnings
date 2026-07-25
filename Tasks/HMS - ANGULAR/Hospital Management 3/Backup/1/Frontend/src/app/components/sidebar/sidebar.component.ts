import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  @Input() activePage = 'dashboard';
  @Output() pageChange = new EventEmitter<string>();

  navItems: any[] = [];

  private rolePages: { [role: string]: string[] } = {
    Admin:     ['dashboard', 'appointments', 'patients', 'doctors', 'staff'],
    Doctor:    ['dashboard', 'appointments', 'patients'],
    Nurse:     ['dashboard', 'appointments', 'patients'],
    LabTech:   ['dashboard', 'appointments'],
    Pharma:    ['dashboard', 'appointments'],
    Patient:   ['appointments'],
    Reception: ['dashboard', 'appointments', 'patients'],
    Analyst:   ['dashboard', 'appointments', 'patients']
  };

  constructor(private api: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.api.getMetadata<{ nav: any[] }>('sidebar').subscribe({
      next: m => {
        const role = this.authService.getRole() || '';
        const allowedPages = this.rolePages[role] || ['dashboard'];
        if (m?.nav?.length) {
          this.navItems = m.nav.filter(item => allowedPages.includes(item.key));
        } else {
          console.error('Sidebar metadata invalid or missing nav:', m);
          this.navItems = [];
        }
      },
      error: err => {
        console.error('Failed to load sidebar metadata:', err);
        this.navItems = [];
      }
    });
  }

  navigate(key: string) {
    this.pageChange.emit(key);
  }
}
