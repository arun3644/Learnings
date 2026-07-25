import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as DashboardActions from '../../../../store/dashboard/dashboard.actions';
import { selectDashboardStats } from '../../../../store/dashboard/dashboard.selectors';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { StatsCardComponent } from '../../../../shared/components/stats-card/stats-card.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, CardComponent, StatsCardComponent],
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {
  stats$!: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.stats$ = this.store.select(selectDashboardStats);
    this.store.dispatch(DashboardActions.loadDashboardStats({ role: 'ADMIN', userId: 1 }));
  }
}
