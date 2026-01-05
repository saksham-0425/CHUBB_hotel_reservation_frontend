import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="card" [ngClass]="className">
      <ng-content></ng-content>
    </div>
  `,
    styles: [`
    .card {
      background-color: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-card);
      transition: box-shadow 0.3s ease;
    }
    
    .card:hover {
      box-shadow: var(--shadow-floating);
    }
  `]
})
export class CardComponent {
    @Input() className = '';
}
