import { Component, Input } from '@angular/core';
import { CardModel } from './card-model.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item: CardModel | undefined;

  getReleaseYear() {
    return this.item?.release_date.slice(0, 4);
  }
}
