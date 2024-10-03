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

  //Joao stuff
  userLogged = signal<boolean>(false);
  userRole!: string;
  login!: string;

  private userTokenSubscription: Subscription | undefined;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userToken: IUserToken = JSON.parse(storedUser);
      this.authService.setUserLogged(userToken); // Update the BehaviorSubject with the stored token
    }
  
    this.userTokenSubscription = this.authService.userLoggedToken$.subscribe(userToken => {
      this.userLogged.set(true);
      if (userToken) {
        this.userRole = userToken.role;
        this.login = userToken.login
      } 
    });
  }


  onExitClick(){
    this.authService.logout();
    this.userLogged.set(false);
  }
}
