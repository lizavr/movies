import { Component, Input } from '@angular/core';
import { CardModel } from '../card/card-model.interface';

@Component({
  selector: 'app-cards-row',
  templateUrl: './cards-row.component.html',
  styleUrl: './cards-row.component.scss'
})
export class CardsRowComponent {
  @Input() items: CardModel[] | undefined;
}
