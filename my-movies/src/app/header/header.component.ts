import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOpen = false;
  isAuthenticated = false;
  private userSub: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
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
