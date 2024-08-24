import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
})
export class EditformComponent {

  isHidden = false;

  @Input() formGroup!: FormGroup | null;
  @Input() formType!: string;
  @Input() communities!: any[];
  @Input() tags!: any[];


  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.formGroup);
  }

  onCancel() {
    this.cancel.emit();
  }

  getFormType(formType: string): string {
    switch (formType) {
      case 'ชุมชน':
        return 'community';
      case 'แหล่งท่องเที่ยว':
        return 'place';
      case 'อาหารและผลิตภัณฑ์':
        return 'fp';
      case 'แผนการท่องเที่ยว':
        return 'plan';
      case 'กิจกรรม':
        return 'event';
      case 'ข่าวประชาสัมพันธ์':
        return 'news';
      case 'หมวดหมู่':
        return 'tag';
      default:
        return 'ไม่ทราบ';
    }   
  }


  codeHidden(){
    this.isHidden = !this.isHidden;
  }

}

