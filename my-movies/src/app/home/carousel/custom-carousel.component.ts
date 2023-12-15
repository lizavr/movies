import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrl: './custom-carousel.component.scss',
})
export class CustomCarouselComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  isDataLoaded: boolean = false;

  slides: any[] = [];

  constructor(private catalogService: CatalogService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.catalogService
      .getPopularMovies()
      .subscribe((cards) => {
        for (let i = 0; i < 10; i++) {
          this.slides[i] = {
            id: cards[i].id,
            src: `https://image.tmdb.org/t/p/w1280${cards[i].backdrop_path}`,
            title: cards[i].title,
            subtitle: cards[i].overview,
          };
        }
        this.isDataLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onCardClick(id: string | undefined) {
    if (!id) {
      return;
    }
    this.router.navigate(['/catalog', id]);
  }
}
