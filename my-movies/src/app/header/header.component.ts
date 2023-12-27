import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemsCount: number = 0;
  isOpen = false;
  isAuthenticated = false;
  userSub: Subscription | undefined;
  cartSubscription: Subscription | undefined;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.isAdmin = this.authService.isAdmin();
    });

    this.cartSubscription = this.cartService.movies.subscribe((movies) => {
      this.cartItemsCount = movies.length;
    });

    if (localStorage.getItem('userData')) {
      this.isAuthenticated = true;
    }
  }

  logOut(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
