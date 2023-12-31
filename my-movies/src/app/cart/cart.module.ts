import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CartComponent],
  imports: [CartRoutingModule, CommonModule, SharedModule],
})
export class CartModule {}
