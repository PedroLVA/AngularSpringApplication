import { Component, inject, OnInit, signal } from '@angular/core';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProduct } from '../../_Interfaces/IProduct';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {
  
  products = signal<IProduct[] | undefined>(undefined);
 
  productService = inject(ProdutosService);

  constructor(){
   
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) =>{
        this.products.set(response) ;
        console.log("Requisição deu certo: ", response);
      }
    })
  }

}
