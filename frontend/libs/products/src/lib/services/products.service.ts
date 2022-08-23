import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@env/environment";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  apiURLProducts = environment.apiURL + "products";
  constructor(private http: HttpClient) {}

  //Get ALL Products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  //Get One Product
  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  //Create Product
  createProducts(productData: FormData) {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  //Update Product
  updateProduct(productFormData: FormData, productId: string) {
    return this.http.put<Product>(
      `${this.apiURLProducts}/${productId}`,
      productFormData
    );
  }

  //Delete Product
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }
}
