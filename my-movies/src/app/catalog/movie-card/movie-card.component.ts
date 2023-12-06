import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from '../card/card-model.interface';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  @Input() item: CardModel | undefined;
  card: CardModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService
  ) {}
  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('id');
    this.card = this.catalogService.getCardById(cardId!);
  }
}
