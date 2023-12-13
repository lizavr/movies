import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FiltersComponent } from './filters.component';
import { YearComponent } from './year/year.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [YearComponent, FiltersComponent],
  imports: [CommonModule, MatSliderModule],
  exports: [FiltersComponent]
})
export class FiltersModule {}
