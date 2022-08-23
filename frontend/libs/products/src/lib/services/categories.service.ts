import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/category";
import { environment } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
    
  apiURLCategories = environment.apiURL + "categories";
  constructor(private http: HttpClient) {}

  //Get ALL Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURLCategories);
  }

  //Get One Category
  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
  }

  //Create Category
  createCategories(category: Category) {
    return this.http.post<Category>(this.apiURLCategories, category);
  }

  //Update Category
  updateCategory(category: Category) {
    return this.http.put<Category>(
      `${this.apiURLCategories}/${category._id}`,
      category
    );
  }

  //Delete Category
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`);
  }
}
