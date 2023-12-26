import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.cartSubscription = this.cartService.movies.subscribe((movies) => {
      this.cartItemsCount = movies.length;
    });

    if (localStorage.getItem('userData')) {
      this.isAuthenticated = true;
      this.router.navigate(['/collection']);
    }
  }

  logOut(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
