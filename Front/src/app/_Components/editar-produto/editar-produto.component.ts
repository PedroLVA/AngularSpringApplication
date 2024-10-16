import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProductRegister } from '../../_Interfaces/IProductRegister';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { IProduct } from '../../_Interfaces/IProduct';
import { IProductEdit } from '../../_Interfaces/IProductEdit';
import { ICategory } from '../../_Interfaces/ICategory';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, CommonModule],
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
  categories = signal<ICategory[]>([]);

  constructor(){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      priceInCents: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    })


  }
  ngOnInit(): void {
    this.productService.getProductsCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        console.log(data)
      }
    })
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
            price_in_cents: product.priceInCents / 100,
            description: product.description,
            category: product.category
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
        id: this.foundProduct?.id,
        name: this.form.value.name,
        priceInCents:  this.form.value.priceInCents * 100,
        description: this.form.value.description,
        category: this.form.value.category,
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

  get nameIsInvalid() {
    return this.form.controls['name'].touched && this.form.controls['name'].dirty && this.form.controls['name'].invalid;
  }

  get priceIsInvalid() {
    return this.form.controls['price_in_cents'].touched && this.form.controls['price_in_cents'].dirty && this.form.controls['price_in_cents'].invalid;
  }

  get descricaoIsInvalid() {
    return this.form.controls['description'].touched && this.form.controls['description'].dirty && this.form.controls['description'].invalid;
  }

  
}
