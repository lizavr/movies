import { Component, OnInit } from '@angular/core';
import { CardModel } from './card/card-model.interface';
import { Router } from '@angular/router';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  cards: CardModel[] = [];

  constructor(private router: Router, private catalogService: CatalogService) {}

  ngOnInit() {
    this.cards = this.catalogService.getAllCards();
  }

  onCardClick(id: string) {
    this.router.navigate(['/catalog', id]);
  }
}
