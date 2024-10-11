import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ThemeOptions } from '../theme-options';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private authUrl = 'http://localhost:8081/auth';


  constructor
  (
    private http: HttpClient,
    public global: ThemeOptions
  ) { }

  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/init`, user);
  }

  login(user: { username: string, password: string }): Observable<any> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, user)
    .pipe(
      tap(response => {
        if (response && response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  private saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
  
}
interface LoginResponse {
  token:string;
}