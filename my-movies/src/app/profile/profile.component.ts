import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { MyCollectionService } from '../my-collection/my-collection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  collectionLength: number | null = null;
  subscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private myCollection: MyCollectionService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((response) => {
      this.user = response;
    });

    this.subscription = this.myCollection
      .get()
      .subscribe((movies) => (this.collectionLength = movies.length));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
