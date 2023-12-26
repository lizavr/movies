import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardModel } from '../catalog/card/card-model.interface';
import { MyCollectionService } from './my-collection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrl: './my-collection.component.scss'
})
export class MyCollectionComponent implements OnInit, OnDestroy{
  subscription: Subscription | undefined;
  collection: CardModel[] = [];
  isLoading = false;

  constructor(private myCollectionService: MyCollectionService) {}

  ngOnInit(): void {
    this.subscription = this.myCollectionService.movies.subscribe((updatedMovies) => this.collection = updatedMovies);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
