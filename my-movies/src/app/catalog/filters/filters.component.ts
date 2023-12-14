import { Component, EventEmitter, Output } from '@angular/core';
import { CardFilter } from '../../core/types';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Output() filtersChanged = new EventEmitter<CardFilter>();

  onYearChanged(event: CardFilter) {
    this.filtersChanged.emit(event);
  }
}
