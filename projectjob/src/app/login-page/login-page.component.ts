import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
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
      this.toastr.error('กรุณากรอกข้อมูลให้ครบ','', {
      });
      return;
    }
    const user = {username: this.loginForm.value.username, password: this.loginForm.value.password};
    this.authService.login(user).subscribe((Response:any) => {
      if (Response.message === "Login Successful") {
        
      }this.router.navigate(['/']);
      
    },
    (error: any) => {
      console.error(error);
      if (error.status === 400) {
        this.toastr.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', '', {
          timeOut: 1000
        });
        return;
      }
      alert('ระบบกำลังปิกปรับปรุงข้อมูล');
      }
    );
  } 

}
