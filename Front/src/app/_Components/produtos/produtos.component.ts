import { Component, inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProduct } from '../../_Interfaces/IProduct';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { AuthService } from '../../_Services/auth.service';
import { IUserDetails } from '../../_Interfaces/IUserDetails';
import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from "../shared/modal/modal.component";

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [SpinnerComponent, CurrencyPipe, RouterLink, ModalComponent, DatePipe],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {
  
  products = signal<IProduct[] | undefined>(undefined);
  loading = signal<boolean>(false);
  router = inject(Router);
  productService = inject(ProdutosService);
  toastrService = inject(ToastrService);
  authService = inject(AuthService);
  userDetails: IUserDetails | null = this.authService.getUserDetails();
  isModalVisible = false;
  productIdToDelete: string | null = null;
  productNameToDelete: string | null = null;
  filtrarPorNome: string = "Filtrar por...";


  ngOnInit(): void {
    console.log(this.userDetails)
    this.loading.set(true)
    this.productService.getAllProducts().subscribe({
      next: (response) =>{
        this.products.set(response) ;
        this.loading.set(false)
        console.log(this.products());
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

  openModal(productId: string, productName: string) {
    this.productIdToDelete = productId; 
    this.productNameToDelete = productName;
    this.isModalVisible = true; 
  }

  closeModal() {
    this.isModalVisible = false;
    this.productIdToDelete = null;
  }
  
  onEditClick(id: string){
    this.router.navigate(['/editar/produto/', id], {
      replaceUrl: true
    })
  }

  get productCount(): number {
    return this.products()?.length || 0;
  }

  //Filter do produto

  loadProducts(filter: string = ''): void {
    this.productService.getAllProducts(filter).subscribe({
      next: (response) => {
        this.products.set(response);
      },
      error: (err) => {
        this.toastrService.error("Houve um erro ao recuperar os produtos:\n" + err.error);
      }
    });
  }

  applyFilter(filter: string, nome: string): void {
    // Call loadProducts with the selected filter
    this.filtrarPorNome = nome;
    this.loadProducts(filter);
  }

}
