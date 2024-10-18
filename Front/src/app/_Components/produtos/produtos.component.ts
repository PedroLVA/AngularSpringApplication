import { Component, inject, LOCALE_ID, NgModule, OnInit, signal } from '@angular/core';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProduct } from '../../_Interfaces/IProduct';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { AuthService } from '../../_Services/auth.service';
import { IUserDetails } from '../../_Interfaces/IUserDetails';
import { CommonModule, CurrencyPipe, DatePipe, NgFor, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from "../shared/modal/modal.component";
import { PaginationComponent } from "../pagination/pagination.component";
import { IPagination } from '../../_Interfaces/IPagination';
import { FormsModule, NgModel } from '@angular/forms';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [SpinnerComponent, CurrencyPipe, RouterLink, ModalComponent, DatePipe, PaginationComponent, CommonModule, NgFor, FormsModule],
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
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  currentFilter: string = "";
  totalNumberOfProducts!: number;

  ngOnInit(): void {
    this.loadProducts(this.currentPage)

  }

  loadProducts(page: number): void {
    this.productService.getProducts(page, this.pageSize).subscribe({
      next: (response: IPagination) => {
        this.totalNumberOfProducts =response.totalElements;
        this.products.set(response.content);
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }

  //pagination

  nextPage(filter: string = ''): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadProductsPaginationFilter(this.currentPage + 1, filter);
    }
  }

  previousPage(filter: string = ''): void {
    if (this.currentPage > 0) {
      this.loadProductsPaginationFilter(this.currentPage - 1, filter);
    }
  }

  onPageSelected(page: number, filter: string = ''): void {
    this.loadProductsPaginationFilter(page, filter);
  }


  onDelete(id: string) {
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

  onEditClick(id: string) {
    this.router.navigate(['/editar/produto/', id], {
      replaceUrl: true
    })
  }

 

  //Filter do produto

  loadProductsPaginationFilter(page: number, filter: string = ''): void {
    this.productService.getProducts(page, this.pageSize, filter).subscribe({
      next: (response: IPagination) => {
        this.products.set(response.content);
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
       
      },
      error: (err) => console.error('Failed to load products', err.error)
    });
  }

  applyFilter(page: number, filter: string, nome: string): void {
    this.currentFilter = filter;
    this.filtrarPorNome = nome;
    this.loadProductsPaginationFilter(page, filter);
  }


  onApplyNumberPages(pageSize: number){
    if(pageSize < 1 || pageSize == null){
      this.toastrService.error("O número de items por página deve no mínimo 1!")
      return;
    }
    this.pageSize = pageSize;
    this.loadProducts(this.currentPage)
  }
  





}
