import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Service/auth.service';
import { ThemeOptions } from '../../../theme-options';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent  {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private global: ThemeOptions
  ) { }

  ngOnInit(): void {
    if (this.global.isLogin) {
      window.location.href = '/';
    }
    this.loginForm = this.formBuilder.group({
      username: ['',
        [
        Validators.required
        ]
      ],
      password: ['',
        [
        Validators.required
        ]
      ],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastr.error('กรุณากรอกข้อมูลให้ครบ', '', {
      });
      return;
    }
  
    const user = {username: this.loginForm.value.username, password: this.loginForm.value.password};
    this.authService.login(user).subscribe({
      next: (response) => {
        window.location.href = '/';
      },
      error: (error) => {
        if (error.message === "Http failure response for http://localhost:8081/auth/login: 400 OK") {
          this.toastr.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', '', {
            timeOut: 3000,
          });
        }else{
          this.toastr.error('เกิดข้อผิดพลาดกับ Server', '', {
            timeOut: 3000,
          });
        }
      }
    }); 
  }
}
