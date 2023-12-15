import { Component, Input } from '@angular/core';
import { CardModel } from './card-model.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item: CardModel | undefined;

  constructor(private router: Router){}

  getReleaseYear() {
    return this.item?.release_date.slice(0, 4);
  }

  onCardClick(id: string | undefined) {
    if (!id) {
      return;
    }
    this.router.navigate(['/catalog', id]);
  }
}
