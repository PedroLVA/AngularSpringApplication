import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../_Interfaces/IProduct';
import { IProductRegister } from '../_Interfaces/IProductRegister';
import { IProductEdit } from '../_Interfaces/IProductEdit';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiURL: string = "http://localhost:8080/product"

  private http = inject(HttpClient);

  constructor() { }

  getAllProducts(sort: string = ''): Observable<IProduct[]> {
    // If the sort parameter is not provided, do not append it to the query
    const queryParam = sort ? `?sort=${sort}` : '';
    return this.http.get<IProduct[]>(`${this.apiURL}${queryParam}`);
  }
  

  getProductById(id: string): Observable<IProduct>{
    return this.http.get<IProduct>(`${this.apiURL}/${id}`)
  }

  addProduct(product: IProductRegister): Observable<IProductRegister> {
    return this.http.post<any>(this.apiURL, product);
  }

  editProduct(product: IProductEdit): Observable<IProductEdit>{
    return this.http.put<any>(this.apiURL, product);
  }

  deleteProduct(id: string){
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
  
}
