import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CatalogService } from '../../catalog.service';
import { CardFilter } from '../../../core/types';
import { CardModel } from '../../card/card-model.interface';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrl: './year.component.scss',
})
export class YearComponent implements OnInit {
  @Output() yearsChanged = new EventEmitter<CardFilter>();

  rangeValueStart = 0;
  rangeValueEnd = new Date().getFullYear();
  currentStart = this.rangeValueStart;
  currentEnd = this.rangeValueEnd;

  constructor(private catalog: CatalogService) {}
  ngOnInit(): void {
    this.catalog.getEarliestYear().subscribe((card) => {
      this.rangeValueStart = +card.release_date.slice(0, 4);
      this.currentStart = this.rangeValueStart;
    });
  }

  updateStartValue(event: any): void {
    this.currentStart = +event.target.value;
    this.filter();
  }

  updateEndValue(event: any): void {
    this.currentEnd = +event.target.value;
    this.filter();
  }

  onStartYearInputChanged(event: any) {
    if (event.target.value.length < 4) {
      return;
    }
    this.currentStart = +event.target.value;
    this.filter();
  }

  onEndYearInputChanged(event: any) {
    console.log(event);

    if (event.target.value.length < 4) {
      return;
    }
    this.currentEnd = +event.target.value;
    this.filter();
  }

  filter() {
    this.yearsChanged.emit(
      (card: CardModel) =>
        +card.release_date.slice(0, 4) >= this.currentStart &&
        +card.release_date.slice(0, 4) <= this.currentEnd
    );
  }
}
