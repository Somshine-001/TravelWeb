import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../../Service/image.service';
import { AddDataService } from '../../Service/addData.service';
import { ToastrService } from 'ngx-toastr';
import { PublishService } from '../../Service/publish.service';
import { EditDataService } from '../../Service/editData.service';
import { MatDialog } from '@angular/material/dialog';
import { Image } from '../../Service/editData.service';
import { ImageSelectionDialogComponent } from '../../Dialog/image-selection-dialog/image-selection-dialog.component';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
})
export class AddcardComponent {
  formData!: FormData;

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

  images: Image[] = [];

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  image: any | null = null;
  name: string | null = null;

  isHidden = false;


  @Input() addFormType!: string;
  @Input() communities!: any[];
  @Input() tags!: any[];
  @Input() roles!: any[];
  @Input() provinces!: any[];

  @Output() cancel = new EventEmitter<string>();
  @Output() save = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private imageService: ImageService,
    private addDataService: AddDataService,
    private editDataService: EditDataService,
    private toastr: ToastrService,
    private publishService: PublishService,
    private dialog: MatDialog
  ) {

    this.communityForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.maxLength(50)]],
      address: [''],
      history: [''],
      detail: [''],
      culture: [''],
      tel: ['',[Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
      provinceName: ['', [Validators.required]],  
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
      tagName: ['', [Validators.required]],
    });

    this.fpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      detail: [''],
      ingredient: [''],
      step: [''],
      price: ['', [Validators.pattern('^[0-9]*$')]],
      communityName: ['', [Validators.required]],
      tagName: ['', [Validators.required]],
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
      tagName: ['', [Validators.required]],
    });

    this.newsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      detail: [''],
      communityName: ['', [Validators.required]],
    });

    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
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
    if (this.isPasswordMismatch()) {
      this.toastr.error('รหัสผ่านไม่ตรงกัน');
      return;
    }
  
    this.formGroup = this.getFormGroup();
    if (this.isFormInvalid()) {
      this.showFormErrors();
      return;
    }
  
    if (this.addFormType !== 'รูปภาพ') {
      this.save.emit(this.formGroup.value);
    }
  
    this.handleImageSave();
  }
  
  isPasswordMismatch(): boolean {
    return this.addFormType === 'สมาชิก' && 
           this.formGroup.value.password !== this.formGroup.value.confirmPassword;
  }
  
  isFormInvalid(): boolean {
    return this.formGroup.invalid && this.addFormType !== 'รูปภาพ';
  }
  
  showFormErrors() {
    this.formGroup.markAllAsTouched();
    let errorMessages = '';
  
    for (const controlName in this.formGroup.controls) {
      const control = this.formGroup.get(controlName);
      if (control?.invalid && (control.dirty || control.touched)) {
        errorMessages += `กรุณาตรวจสอบฟิลด์: ${controlName}\n`;
      }
    }
  
    alert('กรอกข้อมูลไม่ครบ หรือข้อมูลผิดประเภท\n' + (errorMessages || ''));
  }
  
  handleImageSave() {
    if (this.image && this.image.id) {
      this.publishImage(this.image.id);
    } else if (!this.image || this.image.id === null) {
      this.uploadImage();
    } else {
      this.toastr.error('No file selected');
    }
  }
  
  publishImage(imageId: string) {
    if (this.addFormType !== 'รูปภาพ') {
      this.publishService.imagePublish(this.addFormType + '_' + this.formGroup.value.name, imageId);
      window.location.reload();
    } else {
      this.toastr.error('กรุณาเลือกรูปภาพจากภายนอก');
      return;
    }
  }
  
  uploadImage() {
    this.formData = this.imageService.getFormData();
    const file = this.formData.get('file');
    
    if (file !== null) {
      console.log(file);
    }
  
    this.addDataService.save('image', this.formData).subscribe({
      next: (response: any) => {
        const imageId = response.imageId;
        this.publishImage(imageId);
        this.resetForm();
      },
      error: (error) => {
        console.error('Upload image failed:', error);
      }
    });
  }
  
  resetForm() {
    this.formGroup.reset();
    this.onCancel();
    window.location.reload();
  }

  imageDataUrl(image: Image): string {
    return `data:${image.imageType};base64,${image.imageData}`;
  }
  
  chooseImage() {
    if(this.addFormType !== 'รูปภาพ') {
      this.editDataService.getAll<Image>('image').subscribe(images => {
        const dialogRef = this.dialog.open(ImageSelectionDialogComponent, {
          width: '600px',
          data: images,
        });
    
        dialogRef.afterClosed().subscribe(selectedImage => {
          if (selectedImage.id) {
            this.imagePreview = this.imageDataUrl(selectedImage);
            this.image = selectedImage;
          } else {
            this.handleNoImageSelected(selectedImage);
          }
        });
      });
    }else {
      const dialogRef = this.dialog.open(ImageSelectionDialogComponent, {
        width: '600px',
        data: [],
      });

      dialogRef.afterClosed().subscribe(selectedImage => {
        this.handleNoImageSelected(selectedImage);
      });
    }
  }
  
  handleNoImageSelected(imageUrl: string) {
    this.formData = this.imageService.getFormData();
    const file = this.formData.get('file');
    
    if (file !== null) {
      console.log(file);
    }
  
    this.imagePreview = imageUrl;
  }
  

  removeImage() {
    this.selectedFile = null;
    this.imagePreview = null;
  }

}
