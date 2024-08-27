
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})

export class RegisterPageComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {} 

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['',
        [
        Validators.required,
        Validators.minLength(5)
        ]
      ],
      email: ['',
        [
        Validators.required,
        Validators.email
        ]
      ],
      password: ['',
        [
        Validators.required,
        Validators.minLength(6)
        ]
      ],
      confirmpassword: ['',
        [
        Validators.required
        ]
      ],
    // },{
    //   validator: this.MustMatch('password', 'confirmpassword')
    // }
    });
  }
  get f() { return this.registerForm.controls; }

  register() {
    if (this.registerForm.value.password !== this.registerForm.value.confirmpassword) {
      this.toastr.error('รหัสผ่านไม่ตรงกัน','', {
      });
      return;
    }if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      let errorMessages = '';
  
      // ตรวจสอบข้อผิดพลาดสำหรับแต่ละฟิลด์
      for (const controlName in this.registerForm.controls) {
        if (this.registerForm.controls.hasOwnProperty(controlName)) {
          const control = this.registerForm.get(controlName);
          if (control?.invalid && (control.dirty || control.touched)) {
            errorMessages += `กรุณาตรวจสอบฟิลด์: ${controlName}\n`;
          }
        }
      }
  
      // แสดงข้อความข้อผิดพลาด
      if (errorMessages) {
        alert('กรอกข้อมูลไม่ครบ หรือข้อมูลผิดประเภท\n' + errorMessages);
      } else {
        alert('กรอกข้อมูลไม่ครบ หรือข้อมูลผิดประเภท');
      }
  
      console.log(this.registerForm.value);
      return;
    }
    const user = {username: this.registerForm.value.username, email: this.registerForm.value.email, password: this.registerForm.value.password};
    this.authService.register(user).subscribe((Response:any) => {
      console.log(Response);
      if (Response.message === 'User registered successfully') {
        this.router.navigate(['/login']); // นำไปยังหน้าล็อกอินหลังจากบันทึกสำเร็จ
        alert('สมัครสามชิกสำเร็จ');
      }
    }, (error: any) => {
      console.error(error);
      if (error.badRequest) {
        this.toastr.error('มีผู้ใช้นี้อยู่แล้ว');
      }
      alert('ระบบกำลังปิดปรับปรุงข้อมูล');
    });
  }

}
