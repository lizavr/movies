import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { CarouselModule } from '@coreui/angular';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomCarouselComponent } from './carousel/custom-carousel.component';

@NgModule({
  declarations: [HomeComponent, CustomCarouselComponent],
  imports: [CarouselModule, HomeRoutingModule, BrowserAnimationsModule],
})
export class HomeModule {}
