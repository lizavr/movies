import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { CardModel } from '../catalog/card/card-model.interface';
import { Router } from '@angular/router';
import { CatalogService } from '../catalog/catalog.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  array: CardModel[] = [];
  isLoading = false;

  constructor(private cart: CartService, private router: Router, private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.subscription = this.cart.movies.subscribe((updatedMovies) => this.array = updatedMovies);
  }

  goToMovieCard(id: number | undefined) {
    if (!id) {
      return;
    }
    this.router.navigate(['/catalog', id]);
  }

  totalPrice() {
    return this.array.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  }

  remove(id: number | undefined, event: MouseEvent) {
    event.stopPropagation();

    if (!id) {
      return;
    }

    this.cart.remove(id);
  }

  onClearClick() {
    this.cart.clear();
  }

  onPayClick() {
    this.cart.pay();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
