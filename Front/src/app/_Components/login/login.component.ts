import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ilogin } from '../../_Interfaces/ilogin';
import { IUserToken } from '../../_Interfaces/IUserToken';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../_Interceptor/auth.interceptor';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLinkActive, ReactiveFormsModule, SpinnerComponent, CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // This allows multiple interceptors
    }
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  isSpinnerVisible: boolean = false;
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
    
    const loginBody: ilogin = this.form.value;
    if (this.form.valid) {
      this.isSpinnerVisible = true;
      this.authService.login(loginBody).subscribe({
        next: (response: IUserToken) => {
          this.toastService.success("Login realizado com sucesso!")
          this.router.navigate(['/home']);
          this.isSpinnerVisible = false;
        }
         ,
        error: (err) => {
          this.toastService.error("Erro ao fazer login: " + err.error);
          this.isSpinnerVisible = false;
        }
      });
    } else {
      console.log("Erro");
    }
  }

  get loginIsInvalid() {
    return this.form.controls['login'].touched && this.form.controls['login'].dirty && this.form.controls['login'].invalid;
  }

  get passwordIsInvalid() {
    return this.form.controls['password'].touched && this.form.controls['password'].dirty && this.form.controls['password'].invalid;
  }
  
}
