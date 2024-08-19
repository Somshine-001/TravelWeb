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

  isHidden = false;

  @Input () header!: string;
  @Input() expandedCard!: string | null;
  @Input() cardType!: string;
  @Input() communities!: any[];
  @Input() tags!: any[];

  @Output() toggleCard = new EventEmitter<string>();
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {

      this.communityForm = this.formBuilder.group({
      communityName: ['',[Validators.required, Validators.maxLength(50)]],
      communityDetail: [''],
      tel: [''],   
    });

    this.placeForm = this.formBuilder.group({
      placeName: ['', [Validators.required, Validators.maxLength(50)]],
      placeDetail: [''],
      tel: [''],
      latitude: [''],
      longitude: [''],
      communityName: ['', [Validators.required]],
      tagName: [''],
    });

    this.fpForm = this.formBuilder.group({
      fpName: ['', [Validators.required, Validators.maxLength(50)]],
      fpDetail: [''],
      communityName: ['', [Validators.required]],
      tagName: [''],
    });

    this.planForm = this.formBuilder.group({
      planName: ['', [Validators.required, Validators.maxLength(50)]],
      planDetail: [''],
      communityName: ['', [Validators.required]],
    });

    this.eventForm = this.formBuilder.group({
      eventName: ['', [Validators.required, Validators.maxLength(50)]],
      eventDetail: [''],
      communityName: ['', [Validators.required]],
      tagName: [''],
    });

    this.newsForm = this.formBuilder.group({
      newsName: ['', [Validators.required, Validators.maxLength(50)]],
      newsDetail: [''],
      communityName: ['', [Validators.required]],
    });
  }

  getFormGroup(cardType: string): FormGroup {
    switch (cardType) {
      case 'ชุมชน':
        return this.formGroup = this.communityForm;
      case 'แหล่งท่องเที่ยว':
        return this.formGroup = this.placeForm;
      case 'อาหารและผลิตภัณฑ์':
        return this.formGroup = this.fpForm;
      case 'แผนการท่องเที่ยว':
        return this.formGroup = this.planForm;
      case 'กิจกรรม':
        return this.formGroup = this.eventForm;
      case 'ข่าวประชาสัมพันธ์':
        return this.formGroup = this.newsForm;
      default:
        return this.formGroup = this.communityForm;
    }
  }
  getHeaderForm(cardType: string): any {
    switch (cardType) {
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
      default:
        return null;
    }
  }

  onToggleCard() {
    this.toggleCard.emit(this.cardType);
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
  
      console.log(this.formGroup.value);
      return;
    }
    this.save.emit(this.formGroup.value);
  }

  codeHidden(){
    this.isHidden = !this.isHidden;
  }

  

}
