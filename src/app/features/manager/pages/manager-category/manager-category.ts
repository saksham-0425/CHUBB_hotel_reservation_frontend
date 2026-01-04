import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../services/category';
import { ManagerService } from '../../services/manager';

@Component({
  selector: 'app-manager-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-category.html',
  styleUrls: ['./manager-category.css']
})
export class ManagerCategoriesComponent implements OnInit {

  categories: any[] = [];
  loading = true;
  errorMessage = '';

  editingCategoryId: number | null = null;
  editModel: any = {};

  constructor(
    private categoryService: CategoryService,
    private managerService: ManagerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const hotelId = localStorage.getItem('managerHotelId');

    if (!hotelId) {
      this.loadManagerHotelAndCategories();
    } else {
      this.loadCategories();
    }
  }

  loadManagerHotelAndCategories(): void {
    this.loading = true;

    this.managerService.getManagerHotel().subscribe({
      next: (hotel) => {
        localStorage.setItem('managerHotelId', hotel.id.toString());
        this.loadCategories();
      },
      error: () => {
        this.errorMessage = 'Failed to load manager hotel';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadCategories(): void {
    this.loading = true;
    this.errorMessage = '';

    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load categories';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  editCategory(category: any): void {
    this.editingCategoryId = category.id;
    this.editModel = { ...category };
  }

  cancelEdit(): void {
    this.editingCategoryId = null;
    this.editModel = {};
  }

  saveCategory(): void {
    if (!this.editingCategoryId) return;

    this.categoryService
      .updateCategory(this.editingCategoryId, this.editModel)
      .subscribe({
        next: () => {
          alert('Category updated');
          this.editingCategoryId = null;
          this.loadCategories();
        },
        error: () => {
          alert('Failed to update category');
        }
      });
  }
}
