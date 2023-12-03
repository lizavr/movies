import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrl: './custom-carousel.component.scss',
})
export class CustomCarouselComponent implements OnInit {
  slides: any[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });

  constructor() {}

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: '../../../assets/img/velikolepnyy-vek-scaled.jpg',
      title: 'Magnificent Century',
      subtitle:
        'Popular Turkish historical drama series depicting the life of Sultan Suleiman the Magnificent and his court in the 16th century.',
    };
    this.slides[1] = {
      id: 1,
      src: '../../../assets/img/cherno-belaya-lyubov-scaled.jpg',
      title: 'Black and White Love',
      subtitle:
        'Turkish romantic drama series about the passionate but challenging relationship between a rebellious young woman and a wealthy businessman.',
    };
    this.slides[2] = {
      id: 2,
      src: '../../../assets/img/chernaya-lyubov.jpg',
      title: 'Black Love',
      subtitle:
        'Nihan, the daughter of a wealthy man on the brink of bankruptcy, and Kemal, the son of an ordinary barber, meet on a bus and fall in love at first sight, despite their differences and belonging to completely different worlds',
    };
  }
}
