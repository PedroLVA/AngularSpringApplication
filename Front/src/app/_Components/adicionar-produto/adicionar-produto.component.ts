import { Component, inject } from '@angular/core';
import { ILogin } from '../../_Interfaces/ilogin';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IUserToken } from '../../_Interfaces/IUserToken';

@Component({
  selector: 'app-adicionar-produto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adicionar-produto.component.html',
  styleUrl: './adicionar-produto.component.scss'
})
export class AdicionarProdutoComponent {

  form: FormGroup;

  authService = inject(AuthService)
  toastService = inject(ToastrService);
  router = inject(Router)

  constructor(){
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })


  }

  onSubmit() {
    const loginBody: ILogin = this.form.value;
    if (this.form.valid) {
      this.authService.login(loginBody).subscribe({
        next: (response: IUserToken) => {
          this.toastService.success("Login realizado com sucesso!")
          this.router.navigate(['/home']);
        }
         ,
        error: (err) => {
          this.toastService.error("Erro ao fazer login: " + err.error);
        }
      });
    } else {
      console.log("Erro");
    }
  }
}
