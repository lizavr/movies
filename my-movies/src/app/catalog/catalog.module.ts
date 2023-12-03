import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { MovieCardModule } from '../movie-card/movie-card.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CatalogComponent, CardComponent],
  imports: [CommonModule, MovieCardModule, CatalogRoutingModule],
})
export class CatalogModule {}
