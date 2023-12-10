import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { AngularSplitModule } from 'angular-split';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [CatalogComponent, CardComponent, MovieCardComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    AngularSplitModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
})
export class CatalogModule {}
