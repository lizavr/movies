import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModel } from './card/card-model.interface';
import { Router } from '@angular/router';
import { CatalogService } from './catalog.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewEncapsulation } from '@angular/core';
import { CardFilter } from '../core/types';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CatalogComponent implements OnInit, OnDestroy {
  isLoading = false;
  cards: CardModel[][] = [];
  subscription: Subscription | undefined;
  panelFilter: CardFilter | undefined;
  searchFilter: CardFilter | undefined;

  constructor(
    private router: Router,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.spinner.show('sp5');
    this.subscription = this.catalogService
      .getAllCards()
      .subscribe((cards: CardModel[]) => {
        this.cards = this.createRows(cards);
        this.spinner.hide('sp5');
        this.isLoading = false;
      });
  }

  onFiltersChanged(cardFilter: CardFilter) {
    this.panelFilter = cardFilter;
    this.filterMovies();
  }

  onSearchStringChanged(event: any) {
    this.searchFilter = (card: CardModel) =>
      card.title.toLowerCase().includes(event.target.value.toLowerCase());
    this.filterMovies();
  }

  filterMovies() {
    const filters: CardFilter[] = [];
    if (this.panelFilter) {
      filters.push(this.panelFilter);
    }
    if (this.searchFilter) {
      filters.push(this.searchFilter);
    }

    this.subscription?.unsubscribe();
    this.subscription = this.catalogService
      .getAllCards(filters)
      .subscribe((cards: CardModel[]) => {
        this.cards = this.createRows(cards);
      });
  }

  createRows(cards: CardModel[]): CardModel[][] {
    const itemsPerRow = 4;
    const result: CardModel[][] = [];
    for (let i = 0; i < cards.length; i += itemsPerRow) {
      const chunk = cards.slice(i, i + itemsPerRow);
      result.push(chunk);
    }
    return result;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
