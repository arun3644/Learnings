import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as DashboardActions from '../../../../store/dashboard/dashboard.actions';
import { selectDashboardStats, selectDashboardLoading } from '../../../../store/dashboard/dashboard.selectors';
import { StatsCardComponent } from '../../../../shared/components/stats-card/stats-card.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, CardComponent, LoaderComponent],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  stats$!: Observable<any>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.stats$ = this.store.select(selectDashboardStats);
    this.loading$ = this.store.select(selectDashboardLoading);
    this.store.dispatch(DashboardActions.loadDashboardStats({ role: 'ADMIN', userId: 1 }));
  }
}
