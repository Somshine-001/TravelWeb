import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
})
export class AddcardComponent {

  formGroup!: FormGroup;
  communityForm!: FormGroup;
  placeForm!: FormGroup;
  fpForm!: FormGroup;
  planForm!: FormGroup;
  eventForm!: FormGroup;
  newsForm!: FormGroup;
  addTagForm!: FormGroup;
  addUserForm!: FormGroup;

  isHidden = false;

  @Input () header!: string;
  @Input() addFormType!: string;
  @Input() communities!: any[];
  @Input() tags!: any[];
  @Input() roles!: any[];

  @Output() cancel = new EventEmitter<string>();
  @Output() save = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {

      this.communityForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.maxLength(50)]],
      detail: [''],
      tel: ['',[Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]*$')]],   
    });

    this.placeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      detail: [''],
      tel: [''],
      latitude: [''],
      longitude: [''],
      communityName: ['', [Validators.required]],
      tagName: [''],
    });

    this.fpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      detail: [''],
      communityName: ['', [Validators.required]],
      tagName: [''],
    });

    this.planForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      detail: [''],
      communityName: ['', [Validators.required]],
    });

    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      detail: [''],
      communityName: ['', [Validators.required]],
      tagName: [''],
    });

    this.newsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      detail: [''],
      communityName: ['', [Validators.required]],
    });

    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.addTagForm = this.formBuilder.group({
      tagName: ['', Validators.required],
    });
  }

  getFormGroup(): FormGroup {
    switch (this.addFormType) {
      case 'ชุมชน':
        return this.formGroup = this.communityForm;
      case 'แหล่งท่องเที่ยว':
        return this.formGroup = this.placeForm;
      case 'อาหารและผลิตภัณฑ์':
        return this.formGroup = this.fpForm;
      case 'แผนการท่องเที่ยว':
        return this.formGroup = this.planForm;
      case 'กิจกรรมสรรทนาการ':
        return this.formGroup = this.eventForm;
      case 'ข่าวประชาสัมพันธ์':
        return this.formGroup = this.newsForm;
      case 'สมาชิก':
        return this.formGroup = this.addUserForm;
      case 'หมวดหมู่':
        return this.formGroup = this.addTagForm;
      default:
        return this.formGroup = this.communityForm;
    }
  }
  getHeaderForm(): any {
    switch (this.addFormType) {
      case 'ชุมชน':
        return 'community';
      case 'แหล่งท่องเที่ยว':
        return 'place';
      case 'อาหารและผลิตภัณฑ์':
        return 'fp';
      case 'แผนการท่องเที่ยว':
        return 'plan';
      case 'กิจกรรมสรรทนาการ':
        return 'event';
      case 'ข่าวประชาสัมพันธ์':
        return 'news';
      case 'สมาชิก':
        return 'user';
      case 'หมวดหมู่':
        return 'tag';
      default:
        return null;
    }
  }

  onCancel() {
    this.cancel.emit(this.addFormType);
  }

  onSave() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      let errorMessages = '';
  
      // ตรวจสอบข้อผิดพลาดสำหรับแต่ละฟิลด์
      for (const controlName in this.formGroup.controls) {
        if (this.formGroup.controls.hasOwnProperty(controlName)) {
          const control = this.formGroup.get(controlName);
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
      return;
    }
    this.save.emit(this.formGroup.value);
    this.formGroup.reset();
    this.onCancel();
  }

  codeHidden(){
    this.isHidden = !this.isHidden;
  }

  

}
