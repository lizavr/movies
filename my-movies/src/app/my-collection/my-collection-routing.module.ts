import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyCollectionComponent } from './my-collection.component';

const routes: Routes = [
  {
    path: 'collection',
    component: MyCollectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCollectionRoutingModule {}
