import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://192.168.1.68:3000/category'; // Backend URL
  private categoriesSubject = new BehaviorSubject<any[]>([]);
  categories$: Observable<any[]> = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialCategories();
  }

  private loadInitialCategories(): void {
    this.http.get<any>(this.apiUrl).pipe( // Changez le type d'Observable ici
      tap(response => {
        console.log('Catégories chargées:', response); // Vérifiez ici
        this.categoriesSubject.next(response.data); // Accédez à `data`
      }),
      catchError(this.handleError<any[]>('loadInitialCategories', []))
    ).subscribe();
  }

  getCategories(): Observable<any[]> {
    return this.categories$;
  }

  addCategory(categoryForm: FormGroup): Observable<any> {
    const categoryData = categoryForm.value;
    return this.http.post<any>(this.apiUrl, categoryData).pipe(
      tap(newCategory => {
        const currentCategories = this.categoriesSubject.value;
        this.categoriesSubject.next([...currentCategories, newCategory]);
      }),
      catchError(this.handleError<any>('addCategory'))
    );
  }

  updateCategory(categoryForm: FormGroup): Observable<void> {
    const categoryData = categoryForm.value;
    return this.http.put<void>(`${this.apiUrl}/${categoryData.id}`, categoryData).pipe(
      tap(() => {
        const currentCategories = this.categoriesSubject.value.map(cat =>
          cat.id === categoryData.id ? categoryData : cat
        );
        this.categoriesSubject.next(currentCategories);
      }),
      catchError(this.handleError<void>('updateCategory'))
    );
  }

  deleteCategory(Id: string): Observable<void> { // Changez number en string
    return this.http.delete<void>(`${this.apiUrl}/${Id}`).pipe(
      tap(() => {
        const currentCategories = this.categoriesSubject.value.filter(
          cat => cat._id !== Id // Utilisez _id si nécessaire
        );
        this.categoriesSubject.next(currentCategories);
      }),
      catchError(this.handleError<void>('deleteCategory'))
    );
  }
  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
