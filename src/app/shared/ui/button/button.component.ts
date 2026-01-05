import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [ngClass]="['btn', 'btn-' + variant, fullWidth ? 'w-full' : '']"
      [disabled]="disabled"
      (click)="onClick($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      font-family: var(--font-family-base);
      font-size: var(--font-size-base);
      font-weight: 600;
      border: 1px solid transparent;
      border-radius: var(--radius-pill);
      cursor: pointer;
      transition: all 0.2s ease;
      line-height: 1;
      text-decoration: none;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: var(--color-primary);
      color: var(--color-surface);
    }
    .btn-primary:hover:not(:disabled) {
      background-color: var(--color-primary-hover);
    }

    .btn-outline {
      background-color: transparent;
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
    .btn-outline:hover:not(:disabled) {
      background-color: rgba(0,0,0,0.04);
    }

    .btn-ghost {
      background-color: transparent;
      color: var(--color-primary);
    }
    .btn-ghost:hover:not(:disabled) {
      background-color: rgba(0,0,0,0.04);
    }

    .w-full { width: 100%; }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'outline' | 'ghost' = 'primary';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() type = 'button';

  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
