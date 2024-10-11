import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule, CurrencyPipe } from '@angular/common';
import { IProduct } from '../../_Interfaces/IProduct';
import { ProdutosService } from '../../_Services/produtos.service';
import { IProductRegister } from '../../_Interfaces/IProductRegister';
import { switchMap } from 'rxjs';
import { ModalComponent } from "../shared/modal/modal.component";



@Component({
  selector: 'app-adicionar-produto',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, ModalComponent, CommonModule],
  templateUrl: './adicionar-produto.component.html',
  styleUrl: './adicionar-produto.component.scss'
})
export class AdicionarProdutoComponent {
  form: FormGroup;

  authService = inject(AuthService);
  toastService = inject(ToastrService);
  router = inject(Router);
  productService = inject(ProdutosService);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price_in_cents: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })

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

  addNewProduct() {

    if (this.form.valid) {
      const product: IProductRegister = this.form.value;
      product.price_in_cents = product.price_in_cents * 100; //tratamento para mandar ao banco como centavos
   
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
    this.toastService.error('O formulário é inválido, preencha antes de continuar.')

  }
}







