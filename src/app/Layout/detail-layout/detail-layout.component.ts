import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeOptions } from '../../theme-options';
import { PermissionService } from '../../Service/permission.service';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-detail-layout',
  templateUrl: './detail-layout.component.html',
})
export class DetailLayoutComponent {

  triggerMain: string | null = null;
  username: string | null = null;

  constructor(
    public global: ThemeOptions,
    private permissionService: PermissionService,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    if(this.authService.isLoggedIn()) {
      this.global.isLogin = true;
    }

    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    }

    this.username = this.permissionService.getName();
  }

  isVisible = true;
    onTriggerMain(mainType: string) {
      switch (mainType) {
        case 'เกี่ยวกับเรา':
          return '/about';
        case 'ติดต่อเรา':
          return '/contact';
        default:
          return '';
      }
    }

  isActiveMain(mainType: string) {
    if (this.triggerMain === mainType) {
      return;
    }
  
    const triggeredMain = this.onTriggerMain(mainType);
    this.triggerMain = mainType;
    this.router.navigate([triggeredMain]);
  }

  // ปุ่มผู้ใช้
  showBox() {
    this.isVisible = !this.isVisible;
  }

  Logout() {
    this.authService.logout();
    window.location.href = '/home';  
  }

}
