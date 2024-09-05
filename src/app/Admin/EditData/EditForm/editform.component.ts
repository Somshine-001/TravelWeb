import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
})
export class EditformComponent {

  isHidden = false;

  @Input() formGroup!: FormGroup;
  @Input() formType!: string;
  @Input() communities!: any[];
  @Input() tags!: any[];
  @Input() provinces!: any[];
  @Input() users!: any[];
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private formBuild: FormBuilder) {}

  onSave() {
    this.save.emit(this.formGroup);
  }

  onCancel() {
    this.cancel.emit();
  }

  codeHidden(){
    this.isHidden = !this.isHidden;
  }

  get detailArray(): FormArray {
    return this.formGroup.get('detail') as FormArray;
  }

  addDetail() {
    this.detailArray.push(this.formBuild.group({
      time: [''],
      detail: ['']
    }));
  }

  removeDetail(index: number) {
    this.detailArray.removeAt(index);
  }

}

