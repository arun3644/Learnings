import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs();
      });
    this.breadcrumbs = this.createBreadcrumbs();
  }

  private createBreadcrumbs(): Breadcrumb[] {
    const url = this.router.url;
    const parts = url.split('/').filter(part => part);
    const breadcrumbs: Breadcrumb[] = [{ label: 'Home', url: '/' }];

    let currentUrl = '';
    parts.forEach(part => {
      currentUrl += `/${part}`;
      breadcrumbs.push({
        label: this.formatLabel(part),
        url: currentUrl
      });
    });

    return breadcrumbs;
  }

  private formatLabel(part: string): string {
    return part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
  }
}
