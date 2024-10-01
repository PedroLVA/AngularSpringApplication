import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../../_Interfaces/ilogin';
import { AuthService } from '../../_Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;

  authService = inject(AuthService)
  toastService = inject(ToastrService);

  constructor(){
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    const loginBody: ILogin = this.form.value;
    if (this.form.valid) {
      console.log(loginBody);
      this.authService.login(loginBody).subscribe({
        next: () => 
          this.toastService.success("Requisição realizada com sucesso"),
        error: (err) => {
          this.toastService.error("Requisição realizada com sucesso");
        }
      });
    } else {
      console.log("Erro");
    }
  }
  
}
