import { Component, Input, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { CardModel } from '../catalog/card/card-model.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  subscription: Subscription | undefined;
  array: CardModel[] = [];
  isLoading = false;

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit(): void {
    this.array = this.cart.get();
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
  //remove when observ add
  remove(id: number | undefined, event: MouseEvent) {
    event.stopPropagation();

    if (!id) {
      return;
    }

    this.cart.remove(id);
    this.array = this.cart.get();
  }
}
