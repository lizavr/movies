import { Component, EventEmitter, Output } from '@angular/core';
import { CardFilter } from '../../../core/types';
import { CardModel } from '../../card/card-model.interface';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  @Output() ratingChanged = new EventEmitter<CardFilter>();

  values = ['all', '9+', '8+', '7+', '6+', '5+', '4+'];
  selectedValue = 'all';

  onRatingChanged() {
    this.ratingChanged.emit((card: CardModel) => {
      if (this.selectedValue === 'all') {
        return true;
      }
      return card.vote_average >= +this.selectedValue.slice(0, 1);
    });
  }
}
