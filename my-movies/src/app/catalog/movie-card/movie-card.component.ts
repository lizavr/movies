import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CardModel } from '../card/card-model.interface';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../cart/cart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit, OnDestroy {
  @ViewChild('imageElement') imageElement: ElementRef | undefined;
  card: CardModel | undefined;
  catalogSubscription: Subscription | undefined;
  cartSubscription: Subscription | undefined;
  movieUpdatedSubscription: Subscription | undefined;
  isLoading = false;
  isEditMode = false;
  isAdmin = false;

  title: string = '';
  description: string = '';
  language: string = '';
  release: string = '';

  myFormEdit = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
    language: new FormControl(null),
    release: new FormControl(null),
  });

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.spinner.show('sp5');
    const cardId = this.route.snapshot.paramMap.get('id');

    this.catalogSubscription = this.catalogService
      .getCardById(cardId!)
      .subscribe((movie) => {
        this.card = movie;
        this.setEditValues(movie);
        this.spinner.hide('sp5');
        this.isLoading = false;
      });
    this.cartSubscription = this.cart.movies.subscribe((cards: CardModel[]) => {
      if (this.card) {
        this.card.isInCart = cards.some(
          (cartItem) => cartItem.id === this.card?.id
        );
      }
    });
    this.movieUpdatedSubscription = this.catalogService.movieUpdated.subscribe(
      (updatedMovie) => {
        if (updatedMovie && updatedMovie.id === this.card?.id) {
          this.card = updatedMovie;
          this.setEditValues(this.card);
        }
      }
    );
    this.isAdmin = this.authService.isAdmin();
  }

  toggleFullScreen(): void {
    this.imageElement?.nativeElement.classList.toggle('full-screen');
  }

  addToCart(card: CardModel | undefined) {
    if (!card) {
      return;
    }
    this.cart.add(card);
  }

  removeFromCart(card: CardModel | undefined) {
    if (!card) {
      return;
    }
    this.cart.remove(card.id);
  }

  onEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onSave() {
    if (!this.card) {
      return;
    }
    this.catalogService.update(this.card.id, this.title, this.description, this.language, this.release);
    this.isEditMode = !this.isEditMode;
  }

  onCancel() {
    this.setEditValues(this.card);
    this.isEditMode = !this.isEditMode;
  }

  setEditValues(card: CardModel | undefined) {
    this.title = card?.title ?? '';
    this.description = card?.overview ?? '';
    this.release = card?.release_date ?? '';
    this.language = card?.original_language ?? '';
  }

  ngOnDestroy(): void {
    this.catalogSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }
}
