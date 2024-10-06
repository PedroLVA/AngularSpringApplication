import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../_Interfaces/IProduct';
import { IProductRegister } from '../_Interfaces/IProductRegister';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiURL: string = "http://localhost:8080/product"

  private http = inject(HttpClient);

  constructor() { }

  getAllProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.apiURL)
  }

  addProduct(product: IProductRegister): Observable<IProductRegister> {
    return this.http.post<any>(this.apiURL, product);
  }
  
}
