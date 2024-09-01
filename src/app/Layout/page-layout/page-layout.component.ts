import { Component } from '@angular/core';
import { ThemeOptions } from '../../theme-options';
import { PermissionService } from '../../Service/permission.service';
import { AuthService } from '../../Service/auth.service';
import { EditDataService, Role, Tag } from '../../Service/editData.service';
import { Router } from '@angular/router';
import { AddDataService } from '../../Service/addData.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
})

export class PageLayoutComponent {
  isVisible = true;
  username: string | null = null;


  constructor(
    public global: ThemeOptions,
    private permissionService: PermissionService,
    private authService: AuthService,
  ) 
  {}

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.global.isLogin = true;
    }

    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    }
    this.username = this.permissionService.getName();
  }

  toggleMenu() {
      this.isVisible = !this.isVisible;
  }
  
  Logout() {
    this.authService.logout();
    window.location.href = '/home';  
  }
}
