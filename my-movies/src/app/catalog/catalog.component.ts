import { Component, OnInit } from '@angular/core';
import { CardModel } from './card/card-model.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  cards: CardModel[] = [];

  ngOnInit() {
    console.log('fgjhgf');

    this.cards = [
      {
        url: '../../../assets/img/kocalı.jpg',
        title: 'Seven Husbands for Hürmüz',
        description: `This Turkish film is a comedy that revolves around the story of Hürmüz,
         a charming woman who, due to various circumstances, ends up marrying seven different men.
         Each husband has a unique personality, and they are unaware of each other\'s existence.
         The film unfolds in a humorous manner, showcasing the complications and hilarious situations that
         arise from this unconventional arrangement. Set against the vibrant backdrop of Istanbul, "7 Kocalı Hürmüz"
         is a delightful blend of cultural nuances and comedic elements, making it a standout in Turkish cinema.`,
      },
      {
        url: '../../../assets/img/behzat.jpg',
        title: 'Behzat Ç. Bir Ankara Polisiyesi',
        description: `This series is centered around Behzat Ç.,
        an unconventional and tenacious homicide detective in Ankara.
        Known for his rough demeanor and unorthodox methods,
        Behzat Ç. navigates the murky waters of crime and corruption in the city.
        The series is renowned for its gritty portrayal of urban crime, complex character arcs,
        and an unflinching look at the intricacies of law enforcement.
        It dives into both the personal and professional challenges faced by Behzat Ç. and his team,
        making it a gripping and realistic crime drama.`,
      },
      {
        url: '../../../assets/img/zamanlar.jpg',
        title: 'Once Upon a Time in Anatolia',
        description: `This Turkish film is a comedy that revolves around the story of Hürmüz,
         a charming woman who, due to various circumstances, ends up marrying seven different men.
         Each husband has a unique personality, and they are unaware of each other\'s existence.
         The film unfolds in a humorous manner, showcasing the complications and hilarious situations that
         arise from this unconventional arrangement. Set against the vibrant backdrop of Istanbul, "7 Kocalı Hürmüz"
         is a delightful blend of cultural nuances and comedic elements, making it a standout in Turkish cinema.`,
      },
      {
        url: '../../../assets/img/kocalı.jpg',
        title: 'Seven Husbands for Hürmüz',
        description: `This Turkish film is a comedy that revolves around the story of Hürmüz,
         a charming woman who, due to various circumstances, ends up marrying seven different men.
         Each husband has a unique personality, and they are unaware of each other\'s existence.
         The film unfolds in a humorous manner, showcasing the complications and hilarious situations that
         arise from this unconventional arrangement. Set against the vibrant backdrop of Istanbul, "7 Kocalı Hürmüz"
         is a delightful blend of cultural nuances and comedic elements, making it a standout in Turkish cinema.`,
      },
      {
        url: '../../../assets/img/behzat.jpg',
        title: 'Behzat Ç. Bir Ankara Polisiyesi',
        description: `This series is centered around Behzat Ç.,
        an unconventional and tenacious homicide detective in Ankara.
        Known for his rough demeanor and unorthodox methods,
        Behzat Ç. navigates the murky waters of crime and corruption in the city.
        The series is renowned for its gritty portrayal of urban crime, complex character arcs,
        and an unflinching look at the intricacies of law enforcement.
        It dives into both the personal and professional challenges faced by Behzat Ç. and his team,
        making it a gripping and realistic crime drama.`,
      },
      {
        url: '../../../assets/img/zamanlar.jpg',
        title: 'Once Upon a Time in Anatolia',
        description: `This Turkish film is a comedy that revolves around the story of Hürmüz,
         a charming woman who, due to various circumstances, ends up marrying seven different men.
         Each husband has a unique personality, and they are unaware of each other\'s existence.
         The film unfolds in a humorous manner, showcasing the complications and hilarious situations that
         arise from this unconventional arrangement. Set against the vibrant backdrop of Istanbul, "7 Kocalı Hürmüz"
         is a delightful blend of cultural nuances and comedic elements, making it a standout in Turkish cinema.`,
      },      {
        url: '../../../assets/img/kocalı.jpg',
        title: 'Seven Husbands for Hürmüz',
        description: `This Turkish film is a comedy that revolves around the story of Hürmüz,
         a charming woman who, due to various circumstances, ends up marrying seven different men.
         Each husband has a unique personality, and they are unaware of each other\'s existence.
         The film unfolds in a humorous manner, showcasing the complications and hilarious situations that
         arise from this unconventional arrangement. Set against the vibrant backdrop of Istanbul, "7 Kocalı Hürmüz"
         is a delightful blend of cultural nuances and comedic elements, making it a standout in Turkish cinema.`,
      },
      {
        url: '../../../assets/img/behzat.jpg',
        title: 'Behzat Ç. Bir Ankara Polisiyesi',
        description: `This series is centered around Behzat Ç.,
        an unconventional and tenacious homicide detective in Ankara.
        Known for his rough demeanor and unorthodox methods,
        Behzat Ç. navigates the murky waters of crime and corruption in the city.
        The series is renowned for its gritty portrayal of urban crime, complex character arcs,
        and an unflinching look at the intricacies of law enforcement.
        It dives into both the personal and professional challenges faced by Behzat Ç. and his team,
        making it a gripping and realistic crime drama.`,
      },
      {
        url: '../../../assets/img/zamanlar.jpg',
        title: 'Once Upon a Time in Anatolia',
        description: `This Turkish film is a comedy that revolves around the story of Hürmüz,
         a charming woman who, due to various circumstances, ends up marrying seven different men.
         Each husband has a unique personality, and they are unaware of each other\'s existence.
         The film unfolds in a humorous manner, showcasing the complications and hilarious situations that
         arise from this unconventional arrangement. Set against the vibrant backdrop of Istanbul, "7 Kocalı Hürmüz"
         is a delightful blend of cultural nuances and comedic elements, making it a standout in Turkish cinema.`,
      },
    ];
  }
}
