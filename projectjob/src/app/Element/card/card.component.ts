import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',

})
export class CardComponent {

  @Input() header!: string;
  @Input() items!: any[];
  @Input() expandedCard!: string | null;
  @Input() cardType!: string;
  
  @Output() toggleCard = new EventEmitter<string>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  onToggleCard() {
    this.toggleCard.emit(this.cardType);
  }

  onToggleModal(item: any) {
    this.toggleModal.emit(item);
  }

  onDeleteItem(item: any) {
    this.deleteItem.emit(item);
  }
}
