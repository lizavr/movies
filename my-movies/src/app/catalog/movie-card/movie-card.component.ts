import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CardModel } from '../card/card-model.interface';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit, OnDestroy {
  @ViewChild('imageElement') imageElement: ElementRef | undefined;
  @Input() item: CardModel | undefined;
  card: CardModel | undefined;
  subscription: Subscription | undefined;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.spinner.show('sp5');
    const cardId = this.route.snapshot.paramMap.get('id');

    this.subscription = this.catalogService
      .getCardById(cardId!)
      .subscribe((movie) => {
        this.card = movie;
        this.spinner.hide('sp5');
        this.isLoading = false;
      });
  }

  toggleFullScreen(): void {
    this.imageElement?.nativeElement.classList.toggle('full-screen');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
