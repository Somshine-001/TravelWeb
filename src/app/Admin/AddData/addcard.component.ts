import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../../Service/image.service';
import { AddDataService } from '../../Service/addData.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
})
export class AddcardComponent {

  formGroup!: FormGroup;
  communityForm!: FormGroup;
  placeForm!: FormGroup;
  fpForm!: FormGroup;
  tripForm!: FormGroup;
  eventForm!: FormGroup;
  newsForm!: FormGroup;
  addTagForm!: FormGroup;
  addUserForm!: FormGroup;
  imageForm!: FormGroup;

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  name: string | null = null;

  isHidden = false;

  @Input () header!: string;
  @Input() addFormType!: string;
  @Input() communities!: any[];
  @Input() tags!: any[];
  @Input() roles!: any[];
  @Input() provinces!: any[];

  @Output() cancel = new EventEmitter<string>();
  @Output() save = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private imageService: ImageService, private addDataService: AddDataService, private toastr: ToastrService) {

      this.communityForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.maxLength(50)]],
      address: [''],
      history: [''],
      detail: [''],
      culture: [''],
      tel: ['',[Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
      provinceName: [''],  
    });

    this.placeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      detail: [''],
      tel: [''],
      latitude: [''],
      longitude: [''],
      days: [''],
      time: [''],
      communityName: ['', [Validators.required]],
      tagName: [''],
    });

    this.fpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      detail: [''],
      ingredient: [''],
      step: [''],
      price: ['', [Validators.pattern('^[0-9]*$')]],
      communityName: ['', [Validators.required]],
      tagName: [''],
    });

    this.tripForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      detail: [''],
      communityName: ['', [Validators.required]],
      plans: this.formBuilder.array([])
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
      name: ['', Validators.required],
    });

    this.imageForm = this.formBuilder.group({
      file: [null],
    });

  }

  // Trips
  get plans(): FormArray {
    return this.tripForm.get('plans') as FormArray;
  }

  addPlan() {
    const planIndex = this.plans.length;
    const planGroup = this.formBuilder.group({
      name: [`วันที่ ${planIndex + 1}`],
      planDetail: this.formBuilder.array([])
    });
    this.plans.push(planGroup);
    this.addPlanDetail(planIndex);
  }

  //Plans
  removePlan(index: number) {
    this.plans.removeAt(index);
  }

  getPlanDetailArray(index: number): FormArray {
    return this.plans.at(index).get('planDetail') as FormArray;
  }

  addPlanDetail(planIndex: number) {
    const planDetailGroup = this.formBuilder.group({
      time: ['', Validators.required],
      describe: ['', Validators.required]
    });
    this.getPlanDetailArray(planIndex).push(planDetailGroup);
  }

  removePlanDetail(planIndex: number, detailIndex: number) {
    this.getPlanDetailArray(planIndex).removeAt(detailIndex);
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
        return this.formGroup = this.tripForm;
      case 'กิจกรรมสรรทนาการ':
        return this.formGroup = this.eventForm;
      case 'ข่าวประชาสัมพันธ์':
        return this.formGroup = this.newsForm;
      case 'สมาชิก':
        return this.formGroup = this.addUserForm;
      case 'หมวดหมู่':
        return this.formGroup = this.addTagForm;
      case 'รูปภาพ':
        return this.formGroup = this.imageForm;
      default:
        return this.formGroup = this.imageForm;
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
        return 'trip';
      case 'กิจกรรมสรรทนาการ':
        return 'event';
      case 'ข่าวประชาสัมพันธ์':
        return 'news';
      case 'สมาชิก':
        return 'user';
      case 'หมวดหมู่':
        return 'tag';
      case 'รูปภาพ':
        return 'image';
      default:
        return null;
    }
  }

  onCancel() {
    this.cancel.emit(this.addFormType);
  }

  onSave() {
    const formData = new FormData();
    const fileInput = this.selectedFile;
    if (fileInput) {
      this.imageService.resizeAndOptimizeImage(fileInput, 1000, 1000).then((blob)=> {
        formData.append('file', blob, fileInput.name); // เพิ่ม Blob ลงใน FormData
        console.log(formData.get('file'));
        this.addDataService.save('image', formData).subscribe(() => {
          this.toastr.success('อัปโหลดรูปภาพเสร็จสิ้น');
        })
      }).catch(error => {
        console.error('Resize and optimize image failed:', error);
      });
    } else {
      // ไม่มีไฟล์ที่เลือก
      console.error('No file selected');
    }

    if (this.formGroup.invalid && this.addFormType !== 'รูปภาพ') {
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
    if (this.addFormType !== 'รูปภาพ') {
      console.log(this.formGroup.value);
      this.save.emit(this.formGroup.value);
    }
    this.formGroup.reset();
    this.onCancel();
  }

  codeHidden(){
    this.isHidden = !this.isHidden;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      this.imageService.resizeAndOptimizeImage(file, 800, 800, 0.8)
        .then(blob => {
          // Create a URL for the optimized image
          const optimizedImageURL = URL.createObjectURL(blob);
          
          // Update image preview
          this.imagePreview = optimizedImageURL;

          // You can now use the blob to upload it or save it
          console.log('Optimized image ready for upload:', blob);
        })
        .catch(error => {
          console.error('Error optimizing image:', error);
        });
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  submitForm() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      // เรียกใช้งานการอัปโหลดผ่าน service
      console.log('Image uploaded', formData.get('image'));
    }
  }


}
