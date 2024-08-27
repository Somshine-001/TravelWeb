
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeOptions } from '../../theme-options';
import { PermissionService } from '../../Service/permission.service';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent{

  triggerMenu: string | null = null;
  triggerMain: string | null = null;
  username: string | null = null;

  constructor(
    public global: ThemeOptions,
    private permissionService: PermissionService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {

    if(this.authService.isLoggedIn()) {
      this.global.isLogin = true;
    }

    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    }
    this.isActiveMain('Great Trip');

    this.username = this.permissionService.getName();
  }

    isVisible = true;
    onTriggerMain(mainType: string) {
      switch (mainType) {
        case 'Great Trip':
          return '/home';
        case 'เกี่ยวกับเรา':
          return '/about';
        case 'ติดต่อเรา':
          return '/contact';
        default:
          return '/home';
      }
    }

    onTriggerMenu(type: string): string {
      switch (type) {
        case 'ชุมชน':
          return '/community';
        case 'แหล่งท่องเที่ยว':
          return '/place';
        case 'อาหารและผลิตภัณฑ์':
          return '/fp';
        case 'แผนการท่องเที่ยว':
          return '/plan';
        case 'กิจกรรม':
          return '/event';
        case 'ข่าวประชาสัมพันธ์':
          return '/news';
        default:
          return '';
      }
    }
    
    isActiveMenu(type: string) {
      if (this.triggerMenu === type) {
        return;
      }
      const triggeredMenu = this.onTriggerMenu(type);
      this.triggerMenu = type;
      this.triggerMain = null;
      this.router.navigate([triggeredMenu]);
    }
    
    isActiveMain(mainType: string) {
      if (this.triggerMain === mainType) {
        return;
      }
    
      const triggeredMain = this.onTriggerMain(mainType);
      this.triggerMain = mainType;
      this.triggerMenu = null;
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




