import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CurrencyPipe } from '@angular/common';



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
  

  constructor(){
    this.form = new FormGroup({
      product: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })


  }

  onSubmit() {
    console.log(this.form.value)
  }

  //gpt


  formatCurrency() {
    const value = this.form.get('price')?.value;
    if (value) {
      const formattedValue = this.formatToCurrency(value);
      this.form.get('price')?.setValue(formattedValue);
    }
  }

  // Method to remove formatting when input is focused
  removeCurrencyFormatting() {
    const value = this.form.get('price')?.value;
    if (value) {
      const numericValue = value.replace(/[^\d.-]/g, ''); // Remove formatting
      this.form.get('price')?.setValue(numericValue);
    }
  }

  // Method to update the value with formatting on input
  updateValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const numericValue = inputElement.value.replace(/[^\d.-]/g, ''); // Clean the input
    this.form.get('price')?.setValue(numericValue);
  }

  // Helper method to format a number to currency
  private formatToCurrency(value: string): string {
    const numberValue = parseFloat(value);
    return isNaN(numberValue) ? '' : numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
