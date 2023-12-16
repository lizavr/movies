import { Component, EventEmitter, Output } from '@angular/core';
import { CardFilter } from '../../core/types';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Output() filtersChanged = new EventEmitter<CardFilter[]>();
  yearFilter: CardFilter | undefined;
  ratingFilter: CardFilter | undefined;

  onYearChanged(eventYear: CardFilter) {
    this.yearFilter = eventYear;
    this.onAllFiltersChanged();
  }

  onRatingChanged(eventRating: CardFilter) {
    this.ratingFilter = eventRating;
    this.onAllFiltersChanged();
  }

  onAllFiltersChanged() {
    const filtersArray = [];
    if (this.yearFilter) {
      filtersArray.push(this.yearFilter);
    }
    if (this.ratingFilter) {
      filtersArray.push(this.ratingFilter);
    }
    this.filtersChanged.emit(filtersArray);
  }
}
