import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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


  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.formGroup);
  }

  onCancel() {
    this.cancel.emit();
  }

  codeHidden(){
    this.isHidden = !this.isHidden;
  }

}

