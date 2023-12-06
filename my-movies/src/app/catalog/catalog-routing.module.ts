import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

const routes: Routes = [
  {
    path: 'catalog',
    children: [
      { path: '', component: CatalogComponent },
      { path: ':id', component: MovieCardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
