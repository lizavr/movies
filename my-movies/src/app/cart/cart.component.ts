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
    this.isLoading = true;
    this.subscription = this.cart.getArrOfMovies().subscribe((items) => {
      items.forEach((item) => this.array.push(item));
      this.isLoading = false;
    });
  }

  goToMovieCard(id: number | undefined) {
    if (!id) {
      return;
    }
    this.router.navigate(['/catalog', id]);
  }
}
