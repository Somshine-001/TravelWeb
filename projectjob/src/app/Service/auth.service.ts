import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private authUrl = 'http://localhost:8081/auth';


  constructor(private http: HttpClient, private router: Router) { }

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
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
  
}
interface LoginResponse {
  token:string;
  test: string;
}