import { Component, Input } from '@angular/core';
import { CardModel } from './card-model.interface';
import { Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { delay, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item: CardModel | undefined;
  @Input() hasActions: boolean = false;
  addToCartAnimation: boolean = false;

  constructor(
    private router: Router,
    private cart: CartService,
    private authService: AuthService
  ) {}

  getReleaseYear() {
    return this.item?.release_date.slice(0, 4);
  }

  onCardClick(id: string | undefined) {
    if (!id) {
      return;
    }
    this.router.navigate(['/catalog', id]);
  }

  addToCart(event: Event) {
    event.stopPropagation();
    if (!this.authService.user.value) {
      this.router.navigate(['/auth/login']);
      return;
    }
    if (!this.item) {
      return;
    }
    this.addToCartAnimation = true;
    this.cart.add(this.item);
    of(null)
      .pipe(delay(1500))
      .subscribe(() => {
        this.addToCartAnimation = false;
      });
  }

  removeFromCart(event: Event) {
    event.stopPropagation();
    if (!this.item) {
      return;
    }
    this.cart.remove(this.item.id);
  }
}
