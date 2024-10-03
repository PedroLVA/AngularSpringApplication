import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../_Services/auth.service';
import { IUserDetails } from '../../_Interfaces/IUserDetails';
import { Subscription } from 'rxjs';
import { IUserToken } from '../../_Interfaces/IUserToken';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  userDetails: IUserDetails | null = null

 

  //Joao stuff
  userLogged = signal<boolean>(false);;
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
      else{
        this.userLogged.set(false);
      } 
    });
  }







}
