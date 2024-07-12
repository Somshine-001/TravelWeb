
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})

export class RegisterPageComponent {
  

  username: string = '';
  email: string = '';
  password: string = '';
  
  constructor(private authService: AuthService,private router: Router) {
    
  } 
  
  saveUser() {
    const user = {username: this.username, email: this.email, password: this.password};
    this.authService.saveUser(user).subscribe((Response:any) => {
      console.log(Response);
      if (Response.message === 'User saved successfully') {
        this.router.navigate(['/login']); // นำไปยังหน้าล็อกอินหลังจากบันทึกสำเร็จ
        alert('สมัครสามชิกสำเร็จ');
      }
    }, (error: any) => {
      console.error(error);
      if (error.status === 400) {
        alert('มีผู้ใช้นี้อยู่แล้ว');
      } else if (error.status === 500) {
        alert('เกิดข้อผิดพลาดบางอย่าง');
      } else {
        alert('เกิดข้อผิดพลาดบางอย่าง');
      }
    });
  }

  ngOnInit(): void {
  }

}
