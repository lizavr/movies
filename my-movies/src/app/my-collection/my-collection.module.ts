import { NgModule } from '@angular/core';
import { MyCollectionComponent } from './my-collection.component';
import { MyCollectionRoutingModule } from './my-collection-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MyCollectionComponent],
  imports: [MyCollectionRoutingModule, CommonModule],
})
export class MyCollectionModule {}
