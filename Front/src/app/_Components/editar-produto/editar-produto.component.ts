import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProductRegister } from '../../_Interfaces/IProductRegister';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.scss'
})
export class EditarProdutoComponent {
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
