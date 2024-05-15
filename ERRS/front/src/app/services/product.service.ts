import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private selectedProduct: any;
  
  private apiUrl = environment.apiUrl;  // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/add`, productData);
  }
  updateProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/update`, productData);
  }
  getProductList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/getproducts`);
  }
  getRecentProductList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/getrecentproducts`);
  }
  getSelectedProduct(): any {
    return this.selectedProduct;
  }
  buyProduct(merchendiseName:String, merchendiseCost:number, merchendiseId:number, employeeId:number): Observable<any> {
    const dataToSend = {merchendiseName, merchendiseCost,merchendiseId,employeeId};
    return this.http.post(`${this.apiUrl}/products/submitorder`, dataToSend);
  }

  getCountOfProducts():Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/products/getproductcount`);
  }

  deleteProduct(merchId:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/products/delete/${merchId}`);
  }
  editProduct(merchId:any):Observable<any[]>{
    return this.http.post<any[]>(`${this.apiUrl}/products/edit`,merchId);
  }
  setSelectedProduct(product: any): void {
    this.selectedProduct = product;
    console.log(this.selectedProduct);
  }
}
