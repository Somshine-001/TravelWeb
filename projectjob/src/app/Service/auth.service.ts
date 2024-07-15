import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, user);
  }

  login(user: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

//   register(user: { username: string, email: string, password: string }): Observable<any> {
//     return this.http.post(`${this.baseUrl}/register`, user);
//   }
}