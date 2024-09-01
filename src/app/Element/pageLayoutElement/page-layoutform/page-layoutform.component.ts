import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddDataService } from '../../../Service/addData.service';
import { EditDataService, Role, Tag } from '../../../Service/editData.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';

@Component({
  selector: 'app-page-layoutform',
  templateUrl: './page-layoutform.component.html',

})
export class PageLayoutformComponent {
  roles: any[] = [];

  formGroup!: FormGroup;
  addUserForm!: FormGroup;
  addTagForm!: FormGroup;

  @Input() header!: string;
  @Input() formName!: string;

  @Output() save= new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();


  constructor(private formBuilder: FormBuilder,  private editDataService: EditDataService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.editDataService.getAll<Role>('role').subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        if (error.status === 403) {
          alert('Session หมดอายุ');
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    })

    

  }

  onSave() {
    this.save.emit(this.formGroup);
    this.getFormGroup(this.formName).reset();
    this.onCancel();
  }

  onCancel() {
    this.cancel.emit();
  }
  getFormGroup(formName: string): FormGroup {
    switch (formName) {
      case 'role':
        return this.formGroup = this.addUserForm;
      case 'tag':
        return this.formGroup = this.addTagForm;
      default:
        return this.formGroup;
    }
  }

}
