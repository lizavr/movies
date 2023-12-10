import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModel } from './card/card-model.interface';
import { Router } from '@angular/router';
import { CatalogService } from './catalog.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit, OnDestroy {
  isLoading = false;
  cards: CardModel[] = [];
  subscription: Subscription | undefined;

  constructor(private router: Router, private catalogService: CatalogService, private spinner:NgxSpinnerService) {}

  ngOnInit() {
    this.isLoading = true;
    this.spinner.show('sp5');
    this.subscription = this.catalogService
      .getAllCards()
      .subscribe((cards: CardModel[]) => {
        this.cards = cards;
        this.spinner.hide('sp5');
        this.isLoading = false;
      });
  }

  onCardClick(id: string) {
    this.router.navigate(['/catalog', id]);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
