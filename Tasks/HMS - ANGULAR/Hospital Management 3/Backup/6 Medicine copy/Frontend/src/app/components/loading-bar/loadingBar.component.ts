import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  // <-- Add this import

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loadingBar.component.html',
})
export class LoadingBarComponent {
  @Input() isLoading = false;
}
