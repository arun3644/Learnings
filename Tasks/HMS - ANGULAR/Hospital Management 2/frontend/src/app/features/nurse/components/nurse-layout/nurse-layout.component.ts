import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../../../../layouts/main-layout/main-layout.component';

@Component({
  selector: 'app-nurse-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MainLayoutComponent],
  templateUrl: './nurse-layout.component.html'
})
export class NurseLayoutComponent {}
