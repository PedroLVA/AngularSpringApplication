import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUserToken } from '../_Interfaces/IUserToken';
import { IUserDetails } from '../_Interfaces/IUserDetails';
import { ilogin } from '../_Interfaces/ilogin';






@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL: string = "http://localhost:8080/auth"
  http = inject(HttpClient)

  private userLogged = new BehaviorSubject<IUserToken | null>(null);
  userLoggedToken$ = this.userLogged.asObservable();

  setUserLogged(userToken: IUserToken) {
    this.userLogged.next(userToken);
  }

  logout() {
    this.userLogged.next(null);
    localStorage.clear();
  }

  login(loginBody: ilogin): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, loginBody).pipe(
      map((response: IUserToken) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response));
          this.setUserLogged(response);
        }
        return response;
      })
    )
  }


  getUserDetails(): IUserDetails | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userToken: IUserToken = JSON.parse(user);
      return { login: userToken.login, role: userToken.role };
    }
    return null;
  }

  getToken(): string | null {
    const user = localStorage.getItem('user');
   
    if (user) {
      const userToken: IUserToken = JSON.parse(user);
      const token = userToken.token; 
      console.log("Retrieved token:", token);
      return token;

    }

    return null; // Re

  }
}
