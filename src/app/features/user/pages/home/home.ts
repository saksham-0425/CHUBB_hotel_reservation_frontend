import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../../shared/ui/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) { }

  handleSearch(city: string) {
    if (city) {
      this.router.navigate(['/user/search'], { queryParams: { city } });
    }
  }
}
