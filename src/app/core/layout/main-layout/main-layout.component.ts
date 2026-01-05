import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div class="layout-container">
      <header class="main-header">
        <div class="container flex items-center justify-between h-full">
          <!-- Logo -->
          <div class="logo" (click)="navigateToHome()">
            <span class="brand-text">MARRIOTT</span>
            <span class="brand-sub">BONVOY</span>
          </div>

          <!-- Nav -->
          <nav class="main-nav hidden-mobile">
            <!-- Placeholder for functional nav items -->
          </nav>

          <!-- Actions -->
          <div class="header-actions flex items-center gap-md">
             <app-button variant="outline" class="btn-pill" (click)="navigateToLogin()">Sign In or Join</app-button>
          </div>
        </div>
      </header>

      <main class="main-content">
        <ng-content></ng-content>
      </main>
    </div>
  `,
  styles: [`
    .main-header {
      height: 72px;
      background: var(--color-surface);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid var(--color-border);
    }

    .container {
      max-width: 1400px; /* Marriott uses a wider container */
      padding: 0 32px;
    }

    .logo {
      font-weight: 800;
      font-size: 1.5rem;
      letter-spacing: -0.5px;
      display: flex;
      flex-direction: column;
      line-height: 0.8;
      color: var(--color-primary);
      cursor: pointer;
    }

    .brand-sub {
      font-size: 0.6rem;
      font-weight: 500;
      letter-spacing: 2px;
      color: var(--color-secondary);
      text-transform: uppercase;
      margin-top: 2px;
    }

    .nav-link {
      text-decoration: none;
      color: var(--color-text-main);
      font-weight: 500;
      margin: 0 16px;
      font-size: 0.9rem;
      transition: color 0.2s;
    }

    .nav-link:hover {
      color: var(--color-secondary);
    }

    .action-link {
      font-size: 0.85rem;
      color: var(--color-text-light);
    }

    .hidden-mobile {
      display: none;
    }

    @media (min-width: 900px) {
      .hidden-mobile {
        display: inline-block;
      }
    }

    .main-content {
      min-height: calc(100vh - 72px);
      background-color: var(--color-background);
    }
  `]
})
export class MainLayoutComponent {
  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/user/login']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
