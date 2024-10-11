import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EditDataService } from '../../../Service/editData.service';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
})
export class EditformComponent {

  isHidden = false;

  @Input() formGroup!: FormGroup;
  @Input() planForm!: FormGroup;

  @Input() formType!: string;
  @Input() communities!: any[];
  @Input() tags!: any[];
  @Input() provinces!: any[];
  @Input() users!: any[];
  @Input() roles!: any[];
  
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private formBuild: FormBuilder,
    private editDataService: EditDataService,
  ) {}

  onSave() {
    if(this.formType === 'แหล่งท่องเที่ยว') {
      this.formGroup.value.map = this.formGroup.value.map.replace(/.*src="([^"]+)".*/, '$1');
      console.log(this.formGroup.value.map);
    }
    this.save.emit(this.formGroup);
  }

  onCancel() {
    this.cancel.emit();
  }

  codeHidden(){
    this.isHidden = !this.isHidden;
  }

  get plansArray(): FormArray {
    return this.formGroup.get('plans') as FormArray;
  }

  addPlan(): void {
    const planIndex = this.plansArray.length;
    const newPlan = this.formBuild.group({
      name: [`วันที่ ${planIndex + 1}`],
      planDetail: this.formBuild.array([]) // สร้าง FormArray สำหรับ PlanDetail
    });
    this.plansArray.push(newPlan);
    this.addPlanDetail(planIndex);
  }
  
  removePlan(planIndex: number): void {
    const planId = this.plansArray.at(planIndex).get('id')?.value; // ดึง ID ของ Plan ที่จะลบ
    if (planId) {
      this.editDataService.delete('plan', planId).subscribe(() => {
        this.plansArray.removeAt(planIndex); // ลบจาก FormArray
      });
    } else {
      this.plansArray.removeAt(planIndex); // หากไม่มี ID ให้ลบออกจาก FormArray เลย
    }
  }
  
  getPlanDetailArray(planIndex: number): FormArray {
    return this.plansArray.at(planIndex).get('planDetail') as FormArray;
  }

  addPlanDetail(planIndex: number): void {
    const newPlanDetail = this.formBuild.group({
      time: [''],
      describe: ['']
    });
    this.getPlanDetailArray(planIndex).push(newPlanDetail);
  }

}

