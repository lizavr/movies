import { NgModule } from '@angular/core';
import { MyCollectionComponent } from './my-collection.component';
import { MyCollectionRoutingModule } from './my-collection-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CatalogModule } from '../catalog/catalog.module';

@NgModule({
  declarations: [MyCollectionComponent],
  imports: [
    MyCollectionRoutingModule,
    CommonModule,
    SharedModule,
    ScrollingModule
  ],
})
export class MyCollectionModule {}
