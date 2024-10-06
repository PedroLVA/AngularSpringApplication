import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../_Interfaces/IProduct';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProductRegister } from '../../_Interfaces/IProductRegister';



@Component({
  selector: 'app-adicionar-produto',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './adicionar-produto.component.html',
  styleUrl: './adicionar-produto.component.scss'
})
export class AdicionarProdutoComponent {
  form: FormGroup;

  authService = inject(AuthService);
  toastService = inject(ToastrService);
  router = inject(Router);
  productService = inject(ProdutosService);
  

  constructor(){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price_in_cents: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })


  }

  onSubmit() {
  }

  addNewProduct(){
    
      const product: IProductRegister = this.form.value;

      if (product.price_in_cents) {
        product.price_in_cents = product.price_in_cents * 100;
      }

      this.productService.addProduct(product).subscribe({
        next: () => {
            this.toastService.success('Produto adicionado com sucesso!');
            this.form.reset();
        },
        error: (erro) => {
            this.toastService.error('Erro ao adicionar produto!' + erro.error);
        }
    });
  }




 
}
