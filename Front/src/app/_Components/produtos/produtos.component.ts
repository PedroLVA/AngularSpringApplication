import { Component, inject, OnInit, signal } from '@angular/core';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProduct } from '../../_Interfaces/IProduct';
import { ToastrService } from 'ngx-toastr';

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
  toastrService = inject(ToastrService);

  constructor(){
   
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) =>{
        this.products.set(response) ;
      },
      error: (err) => {
        this.toastrService.error("Houve um erro ao recuperar os produtos:\n" + err.error)
      }
      
    })
  }

}
