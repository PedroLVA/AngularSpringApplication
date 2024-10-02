import { Component, inject } from '@angular/core';
import { ProdutosService } from '../../_Services/produtos.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

  productService = inject(ProdutosService);

  constructor(){
    this.productService.getAllProducts().subscribe({
      next: (response) =>{
        console.log("Requisição deu certo: ", response);
      }
    })
  }

}
