import { NgModule } from '@angular/core';
import { MyCollectionComponent } from './my-collection.component';
import { MovieCardModule } from '../movie-card/movie-card.module';
import { MyCollectionRoutingModule } from './my-collection-routing.module';

@NgModule({
  declarations: [MyCollectionComponent],
  imports: [MovieCardModule, MyCollectionRoutingModule],
})
export class MyCollectionModule {}
