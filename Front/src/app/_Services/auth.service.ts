import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin } from '../_Interfaces/ilogin';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL: string = "http://localhost:8080/auth"

  http = inject(HttpClient)

  login(loginBody: ILogin): Observable<any> { 
    return this.http.post<any>(`${this.apiURL}/login`, loginBody).pipe(
      map((response) => {
        return response; // Optionally process the response here if needed
      })
    );
  }

  constructor() { }
}
