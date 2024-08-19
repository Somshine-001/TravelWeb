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
  currentPath: string;
  tag: string = '';
  formType: string | null = null;

  tags: Tag[] = [];
  roles: Role[] = [];

  addUserForm!: FormGroup;
  addTagForm!: FormGroup;
  editTagForm!: FormGroup;
  formGroup!: FormGroup;

  constructor( public global: ThemeOptions,
    private permissionService: PermissionService,
    private authService: AuthService,
    private editDataService: EditDataService,
    private addDataService: AddDataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) 
    {
    this.currentPath = window.location.pathname;
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.global.isLogin = true;
    }

    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    }
  }

  getTitle() {
    if (this.currentPath === '/add') {
      return 'เพิ่มข้อมูล';
    } else if (this.currentPath === '/edit') {
      return 'แก้ไขข้อมูล';
    } else {
      return;
    }
  }

  toggleMenu() {
      this.isVisible = !this.isVisible;
  }

  openForm(type: string) {
    switch (type) {
      case 'เพิ่มผู้ใช้': return this.formType = 'role';
      case 'เพิ่มหมวดหมู่': return this.formType = 'tag';
      default: return this.formType = null;
    }
  }

  saveForm(formType: string, formGroup: FormGroup) {
    this.addDataService.save(formType, formGroup.value).subscribe({
    });
  }

  closeForm() {
    this.formType = null;
  }
}
