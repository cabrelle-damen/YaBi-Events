import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category-service';

@Component({
  selector: 'app-invoice-category',
  templateUrl: './invoice-category.component.html',
  styleUrls: ['./invoice-category.component.css']
})
export class InvoiceCategoryComponent implements OnInit {
  categories: any[] = [];
  isAdmin$!: Observable<boolean>; // Role control

  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  saveCategory(): void {
    if (this.categoryForm.get('id')?.value) {
      this.categoryService.updateCategory(this.categoryForm).subscribe(() => {
        this.loadCategories();
        this.resetForm();
      });
    } else {
      this.categoryService.addCategory(this.categoryForm).subscribe(() => {
        this.loadCategories();
        this.resetForm();
      });
    }
  }

  editCategory(category: any): void {
    this.categoryForm.patchValue(category);
  }

  deleteCategory(category: any): void {
    this.categoryService.deleteCategory(category.id).subscribe(() => {
      this.loadCategories();
    });
  }

  resetForm(): void {
    this.categoryForm.reset();
  }
}
