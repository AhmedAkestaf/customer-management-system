import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  template: `
    <div class="empty-state">
      <i [class]="'bi ' + icon" style="font-size: 4rem; color: #ccc;"></i>
      <h3 class="mt-3">{{ title }}</h3>
      <p class="text-muted">{{ message }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
    }
  `]
})
export class EmptyState {
  @Input() icon = 'bi-inbox';
  @Input() title = 'No data found';
  @Input() message = 'There is no data to display at the moment.';
}
