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
import { PaginationComponent } from "../pagination/pagination.component";
import { IPagination } from '../../_Interfaces/IPagination';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [SpinnerComponent, CurrencyPipe, RouterLink, ModalComponent, DatePipe, PaginationComponent],
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
  isModalVisible = signal<boolean>(false);
  productIdToDelete: string | null = null;
  productNameToDelete: string | null = null;
  filtrarPorNome: string = "Filtrar por...";


  ngOnInit(): void {
    this.productService.getProductsPagination(0, 11).subscribe({
      next: (response: IPagination ) => {
        this.products.set(response.content);
        
      },
      error: (err) => console.error('Failed to load products', err)
    });

  }



  onDelete(id: string){
    this.isModalVisible.set(false);
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
    console.log('Opening modal for:', productId, productName);  
    this.productIdToDelete = productId; 
    this.productNameToDelete = productName;
    this.isModalVisible.set(true); 
  }

  closeModal() {
    this.isModalVisible.set(false); 
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
    
    this.filtrarPorNome = nome;
    this.loadProducts(filter);
  }

  getCategoryName(productCategory: string){
    
  }

}
