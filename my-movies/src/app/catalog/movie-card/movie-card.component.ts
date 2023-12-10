import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CardModel } from '../card/card-model.interface';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit, OnDestroy {
  @Input() item: CardModel | undefined;
  card: CardModel | undefined;
  subscription: Subscription | undefined;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const cardId = this.route.snapshot.paramMap.get('id');

    this.subscription = this.catalogService
      .getCardById(cardId!)
      .subscribe((movie) => {
        this.card = movie;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
