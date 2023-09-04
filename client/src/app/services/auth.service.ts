import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from 'src/model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  // Get users
  getUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/signup`)
  };

  // Create user
  createUser(auth: Auth): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.apiUrl}/signup`, auth, {
      headers: this.headers,
      observe: 'response'
    }).pipe(
      catchError(error => {
        console.error('Error creating user', error);
        throw error;
      })
    )
  };

  // Login api
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData, {
      headers: this.headers
    }).pipe(
      tap(res => {
        if(res && res.token) {
          localStorage.setItem('token', res.token);
        }
      }),
      catchError(err => {
        console.error('Error During login', err);
        throw err;
      })
    );
  };

  // check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Remove token when logout
  logout(): void {
    localStorage.removeItem('token');
  }

}
