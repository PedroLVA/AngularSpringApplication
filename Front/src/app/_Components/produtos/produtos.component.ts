import { Component, inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProduct } from '../../_Interfaces/IProduct';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { AuthService } from '../../_Services/auth.service';
import { IUserDetails } from '../../_Interfaces/IUserDetails';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [SpinnerComponent, CurrencyPipe],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {
  
  products = signal<IProduct[] | undefined>(undefined);
  loading = signal<boolean>(false);
 
  productService = inject(ProdutosService);
  toastrService = inject(ToastrService);
  authService = inject(AuthService);
  userDetails: IUserDetails | null = this.authService.getUserDetails();

  constructor(){
   
  }
  ngOnInit(): void {
    console.log(this.userDetails)
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
