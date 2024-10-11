import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html'
})
export class TripModalComponent {

  @Input() tripData!: any
  @Output() close = new EventEmitter<void>()


  onClose(): void {
    this.close.emit()
  }

}
