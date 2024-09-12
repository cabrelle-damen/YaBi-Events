import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/modele/category.model';
import { CategoryService } from 'src/app/services/category-service';

@Component({
  selector: 'app-invoice-category',
  templateUrl: './invoice-category.component.html',
  styleUrls: ['./invoice-category.component.css']
})
export class InvoiceCategoryComponent implements OnInit {
  categories: any[] = [];
  isAdmin$!: Observable<boolean>; 

  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: categories => {
        if (Array.isArray(categories)) {
          this.categories = categories;
          console.log('Catégories chargées:', this.categories); // Vérifiez ici
        } else {
          console.error('Les catégories ne sont pas un tableau:', categories);
          this.categories = []; // Réinitialisez en cas d'erreur
        }
      },
      error: err => {
        console.error('Erreur lors de la récupération des catégories:', err);
      }
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

  
  deleteCategory(category: any): void { // Utilisez 'any' pour plus de flexibilité
    console.log('Catégorie à supprimer:', category); // Affichez l'objet complet pour déboguer
  
    const categoryId = category._id; // Récupérez l'ID en utilisant `_id`
    
    if (categoryId) {
      this.categoryService.deleteCategory(categoryId).subscribe(() => {
        console.log('Catégorie supprimée avec succès');
        this.loadCategories(); // Rechargez les catégories après suppression
      }, error => {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      });
    } else {
      console.error('Identifiant de catégorie invalide.');
    }
  }
  
  

  resetForm(): void {
    this.categoryForm.reset();
  }
}
