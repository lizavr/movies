import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { CardModel } from '../catalog/card/card-model.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  subscription: Subscription | undefined;
  array: CardModel[] = [];

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.subscription = this.cart
      .getArrOfMovies()
      .subscribe((items) => items.forEach((item) => this.array.push(item)));
  }
}
