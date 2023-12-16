import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FiltersComponent } from './filters.component';
import { YearComponent } from './year/year.component';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [YearComponent, RatingComponent, FiltersComponent],
  imports: [CommonModule, MatSliderModule, FormsModule],
  exports: [FiltersComponent],
})
export class FiltersModule {}
