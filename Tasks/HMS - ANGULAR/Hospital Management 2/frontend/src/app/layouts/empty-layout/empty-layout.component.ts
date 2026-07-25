import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empty-layout.component.html'
})
export class EmptyLayoutComponent {}
