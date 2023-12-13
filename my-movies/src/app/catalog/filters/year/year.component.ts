import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../catalog.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrl: './year.component.scss',
})
export class YearComponent implements OnInit {
  rangeValueStart = 0;
  rangeValueEnd = new Date().getFullYear();
  currentStart = this.rangeValueStart;
  currentEnd = this.rangeValueEnd;

  constructor(private catalog: CatalogService) {}
  ngOnInit(): void {
    this.catalog.getEarliestYear().subscribe((card) => {
      this.rangeValueStart = +card.release_date.slice(0, 4);
    });
  }

  updateStartValue(event: any): void {
    this.currentStart = event.target.value;
  }

  updateEndValue(event: any): void {
    this.currentEnd = event.target.value;
  }
}
