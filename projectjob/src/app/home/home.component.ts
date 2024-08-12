import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  // standalone: true,
  // imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  token: string | null = null;
  message: string = '';
  test: string | null = null;

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.token = localStorage.getItem('authToken');
    }
    this.message = 'Login to see token';
  }
  
}
