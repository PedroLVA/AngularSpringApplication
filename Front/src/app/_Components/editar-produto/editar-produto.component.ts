import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProductRegister } from '../../_Interfaces/IProductRegister';
import { CurrencyPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { IProduct } from '../../_Interfaces/IProduct';
import { IProductEdit } from '../../_Interfaces/IProductEdit';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.scss'
})
export class EditarProdutoComponent implements OnInit {
  form: FormGroup;

  authService = inject(AuthService);
  toastService = inject(ToastrService);
  router = inject(Router);
  productService = inject(ProdutosService);
  activatedRoute = inject(ActivatedRoute)

  foundProduct: IProduct | undefined;

  constructor(){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price_in_cents: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })


  }
  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            return this.productService.getProductById(id); // Fetch product by ID
        
          }
          return [];
        })
      )
      .subscribe({
        next: (product) => {
          this.foundProduct = product;
          product = product;

          this.form.patchValue({
            name: product.name,
            price_in_cents: product.price_in_cents / 100,
            description: product.description,
          });
          
          console.log('Product loaded:', product);  
        },
        error: (err) => {
          this.toastService.error("Error loading product: " + err.error)
        }
      });
  }

  onSubmit() {
    if(this.foundProduct){
      const product: IProductEdit = {
        id: this.foundProduct?.id, // Include the product ID in the object
        name: this.form.value.name,
        price_in_cents:  this.form.value.price_in_cents * 100,
        description: this.form.value.description,
      };

      this.productService.editProduct(product).subscribe({
        next: () => {
          this.toastService.success('Produto editado com sucesso!');
        },
        error: (erro) => {
          this.toastService.error('Erro ao editar produto!' + erro.error);
        }
      });
    }
    
  }

  
}
