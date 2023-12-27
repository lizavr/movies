import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModel } from './card/card-model.interface';
import { CatalogService } from './catalog.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewEncapsulation } from '@angular/core';
import { CardFilter } from '../core/types';
import { CartService } from '../cart/cart.service';
import { MyCollectionService } from '../my-collection/my-collection.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CatalogComponent implements OnInit, OnDestroy {
  isLoading = false;
  cards: CardModel[][] = [];
  cartItems: CardModel[] = [];
  myCollectionItems: CardModel[] = [];
  catalogServiceSubscription: Subscription | undefined;
  cartServiceSubscription: Subscription | undefined;
  myCollectionServiceSubscription: Subscription | undefined;
  movieUpdatedSubscription: Subscription | undefined;
  panelFilters: CardFilter[] | undefined;
  searchFilter: CardFilter | undefined;

  constructor(
    private catalogService: CatalogService,
    private cartService: CartService,
    private myCollectionService: MyCollectionService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.spinner.show('sp5');
    this.cartServiceSubscription = this.catalogService
      .getAllCards()
      .subscribe((cards: CardModel[]) => {
        this.updateCards(cards);
        this.spinner.hide('sp5');
        this.isLoading = false;
      });
    this.cartServiceSubscription = this.cartService.movies.subscribe(
      (cards: CardModel[]) => {
        this.cartItems = cards;
        this.updateIsInCart();
      }
    );
    this.myCollectionServiceSubscription =
      this.myCollectionService.movies.subscribe((cards: CardModel[]) => {
        this.myCollectionItems = cards;
        this.updateCollectionItems();
      });
    this.movieUpdatedSubscription = this.catalogService.movieUpdated.subscribe(
      (updatedMovie) => {
        if (updatedMovie) {
          const movieToUpdate = this.cards
            .flat()
            .find((item) => item.id === updatedMovie.id);
          if (movieToUpdate) {
            movieToUpdate.title = updatedMovie.title;
            movieToUpdate.overview = updatedMovie.overview;
            movieToUpdate.original_language = updatedMovie.original_language;
            movieToUpdate.release_date = updatedMovie.release_date;
          }
        }
      }
    );
  }

  onFiltersChanged(cardFilters: CardFilter[]) {
    this.panelFilters = cardFilters;
    this.filterMovies();
  }

  onSearchStringChanged(event: any) {
    this.searchFilter = (card: CardModel) =>
      card.title.toLowerCase().includes(event.target.value.toLowerCase());
    this.filterMovies();
  }

  filterMovies() {
    const filters: CardFilter[] = [];
    if (this.panelFilters) {
      filters.push(...this.panelFilters);
    }
    if (this.searchFilter) {
      filters.push(this.searchFilter);
    }

    this.catalogServiceSubscription?.unsubscribe();
    this.cartServiceSubscription = this.catalogService
      .getAllCards(filters)
      .subscribe((cards: CardModel[]) => {
        this.updateCards(cards);
      });
  }

  updateCards(cards: CardModel[]) {
    this.cards = this.createRows(cards);
    this.updateIsInCart();
    this.updateCollectionItems();
  }

  updateIsInCart() {
    this.cards.flat().forEach((item) => {
      item.isInCart = this.cartItems.some(
        (cartItem) => item.id === cartItem.id
      );
    });
  }

  updateCollectionItems() {
    this.cards.flat().forEach((item) => {
      item.isInCollection = this.myCollectionItems.some(
        (collectionItem) => item.id === collectionItem.id
      );
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
    this.catalogServiceSubscription?.unsubscribe();
    this.cartServiceSubscription?.unsubscribe();
    this.myCollectionServiceSubscription?.unsubscribe();
    this.movieUpdatedSubscription?.unsubscribe();
  }
}
