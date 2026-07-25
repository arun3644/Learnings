import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface RoleContent {
  role: string;
  title: string;
  description: string;
  statCards: any[];
  quickActions: QuickAction[];
  features: string[];
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  action: string;
}

@Injectable({ providedIn: 'root' })
export class RoleContentService {
  private roleContents: { [role: string]: RoleContent } = {};
  private metadataLoaded = false;

  constructor(private api: ApiService) {
    this.loadRoleContents();
  }

  private loadRoleContents() {
    this.api.getMetadata<any>('dashboard').subscribe({
      next: (metadata) => {
        if (metadata.roleContents) {
          this.roleContents = metadata.roleContents;
          this.metadataLoaded = true;
        }
      },
      error: (err) => {
        console.error('Failed to load role contents from metadata:', err);
        this.roleContents = {
          'Patient': {
            role: 'Patient',
            title: 'Patient Dashboard',
            description: 'Book appointments and manage health',
            statCards: [],
            quickActions: [],
            features: []
          }
        };
        this.metadataLoaded = true;
      }
    });
  }

  getContentForRole(role: string | null): RoleContent {
    const content = this.roleContents[role || 'Patient'];
    return content || this.roleContents['Patient'] || {
      role: role || 'Patient',
      title: 'Dashboard',
      description: 'Overview',
      statCards: [],
      quickActions: [],
      features: []
    };
  }

  getQuickActionsForRole(role: string | null): QuickAction[] {
    const content = this.getContentForRole(role);
    return content.quickActions;
  }

  getStatCardsForRole(role: string | null): any[] {
    const content = this.getContentForRole(role);
    return content.statCards;
  }

  getFeaturesForRole(role: string | null): string[] {
    const content = this.getContentForRole(role);
    return content.features;
  }

  isMetadataLoaded(): boolean {
    return this.metadataLoaded;
  }
}
