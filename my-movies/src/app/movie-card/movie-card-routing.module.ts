import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MovieCardComponent } from './movie-card.component';

const routes: Routes = [
  {
    path: ':id',
    component: MovieCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieCardRoutingModule {}
