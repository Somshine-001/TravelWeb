
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

  currentPath: string;
  triggerMenu: string | null = null;

  constructor(
    private observer: BreakpointObserver,
    public global: ThemeOptions,
    private permissionService: PermissionService,
    private authService: AuthService,
    private router: Router
    ) {
      this.currentPath = window.location.pathname;
    }

  ngOnInit() {

    if(this.authService.isLoggedIn()) {
      this.global.isLogin = true;
    }

    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    }

    this.isActiveMenu('หน้าหลัก');
  }

    isVisible = true;

    onTriggerMenu(type: string): string {
      switch (type) {
        case 'หน้าหลัก':
          return '/home';
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
          return '/home';
      }
    }
    
    isActiveMenu(type: string) {
      const triggeredMenu = this.onTriggerMenu(type);
      this.triggerMenu = (this.triggerMenu === triggeredMenu) ? null : triggeredMenu;
      
      this.router.navigate([triggeredMenu]);
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




