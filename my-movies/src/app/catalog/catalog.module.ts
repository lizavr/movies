import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { MovieCardModule } from '../movie-card/movie-card.module';
import { CatalogRoutingModule } from './catalog-routing.module';

@NgModule({
  declarations:[CatalogComponent],
  imports:[MovieCardModule, CatalogRoutingModule]
})
export class CatalogModule{}
