import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  { path: '', component: HomeModule },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./catalog/catalog.module').then((m) => m.CatalogModule),
  },
  {
    path: 'collection',
    loadChildren: () =>
      import('./my-collection/my-collection.module').then(
        (m) => m.MyCollectionModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then(
        (m) => m.CartModule
      ),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
