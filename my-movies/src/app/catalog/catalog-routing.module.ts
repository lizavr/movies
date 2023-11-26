import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    // canActivate: [AuthGuard],
    // children: [
    //   { path: '', component: RecipeStartComponent },
    //   { path: 'new', component: RecipeEditComponent },
    //   {
    //     path: ':id',
    //     component: RecipeDetailComponent,
    //     resolve: [RecipesResolverService]
    //   },
    //   {
    //     path: ':id/edit',
    //     component: RecipeEditComponent,
    //     resolve: [RecipesResolverService]
    //   }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
