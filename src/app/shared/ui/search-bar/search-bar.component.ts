import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <div class="search-container">
      <div class="search-field flex-grow">
        <label>DESTINATION</label>
        <input type="text" 
               placeholder="Where can we take you?" 
               [(ngModel)]="city"
               (keyup.enter)="onSearch()">
      </div>
      
      <div class="divider"></div>
      
      <div class="search-field">
        <label>DATES</label>
        <input type="text" placeholder="Check-in — Check-out">
      </div>
      
      <div class="divider"></div>
      
      <div class="search-field">
        <label>ROOMS & GUESTS</label>
        <input type="text" placeholder="1 Room: 1 Adult">
      </div>

      <div class="action">
         <app-button variant="primary" (click)="onSearch()">Find Hotels</app-button>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      display: flex;
      align-items: center;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      padding: 8px;
      box-shadow: var(--shadow-floating);
      max-width: 960px;
      margin: 0 auto;
    }

    .search-field {
      padding: 8px 16px;
      display: flex;
      flex-direction: column;
    }

    .flex-grow {
      flex: 1;
    }

    label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: var(--color-text-light);
      margin-bottom: 4px;
    }

    input {
      border: none;
      outline: none;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-text-main);
      width: 100%;
      font-family: var(--font-family-base);
    }

    input::placeholder {
      color: #999;
      font-weight: 400;
    }

    .divider {
      width: 1px;
      height: 40px;
      background-color: var(--color-border);
      margin: 0 8px;
    }

    .action {
      padding-left: 16px;
    }
  `]
})
export class SearchBarComponent {
  city = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.city);
  }
}
