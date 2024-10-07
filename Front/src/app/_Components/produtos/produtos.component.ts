import { Component, inject, OnInit, signal } from '@angular/core';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProduct } from '../../_Interfaces/IProduct';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from "../shared/spinner/spinner.component";

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {
  
  products = signal<IProduct[] | undefined>(undefined);
  loading = signal<boolean>(false);
 
  productService = inject(ProdutosService);
  toastrService = inject(ToastrService);

  constructor(){
   
  }
  ngOnInit(): void {
    this.loading.set(true)
    this.productService.getAllProducts().subscribe({
      next: (response) =>{
        this.products.set(response) ;
        this.loading.set(false)
      },
      error: (err) => {
        this.toastrService.error("Houve um erro ao recuperar os produtos:\n" + err.error)
        this.loading.set(false)
      }
      
    })
  }

  onDelete(id: string){
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        const updatedProducts = this.products()?.filter(product => product.id !== id);
        this.products.set(updatedProducts);

        this.toastrService.success("Produto Deletado com sucesso!")
      },
      error: (err) => {
        this.toastrService.error("Erro ao deletar o produto")
      }
    })
  }

}
