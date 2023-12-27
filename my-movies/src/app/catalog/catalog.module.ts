import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CommonModule } from '@angular/common';
import { AngularSplitModule } from 'angular-split';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FiltersModule } from './filters/filters.module';
import { CardsRowComponent } from './cards-row/cards-row.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CatalogComponent, CardsRowComponent, MovieCardComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    AngularSplitModule,
    HttpClientModule,
    NgxSpinnerModule,
    ScrollingModule,
    FiltersModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class CatalogModule {}
