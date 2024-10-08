import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../_Services/auth.service';
import { IUserDetails } from '../../_Interfaces/IUserDetails';
import { Subscription } from 'rxjs';
import { IUserToken } from '../../_Interfaces/IUserToken';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  authService = inject(AuthService);
  userDetails: IUserDetails | null = null
  router = inject(Router);

  //Joao stuff
  userLogged = signal<boolean>(false);
  userRole!: string;
  login!: string;

  private userTokenSubscription: Subscription | undefined;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userToken: IUserToken = JSON.parse(storedUser);
      this.authService.setUserLogged(userToken);
    }
  
    this.userTokenSubscription = this.authService.userLoggedToken$.subscribe(userToken => {
      this.userLogged.set(true);
      if (userToken) {
        this.userRole = userToken.role;
        this.login = userToken.login
      } 
      else{
        this.userLogged.set(false);
      } 
    });
  }


  onExitClick(){
    this.authService.logout();
    this.userLogged.set(false);
    this.router.navigate(['/home']);
  }
}
