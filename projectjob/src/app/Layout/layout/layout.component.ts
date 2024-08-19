
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeOptions } from '../../theme-options';
import { PermissionService } from '../../Service/permission.service';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent{

  constructor(private observer: BreakpointObserver,public global: ThemeOptions,private permissionService: PermissionService, private authService: AuthService) {}

  ngOnInit() {

    if(this.authService.isLoggedIn()) {
      this.global.isLogin = true;
    }

    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    } 
  }

    isVisible = true;

    // ปุ่มผู้ใช้
    showBox() {
      this.isVisible = !this.isVisible;
    }

    Logout() {
      this.authService.logout();
      window.location.href = '/home';  
    }
}




