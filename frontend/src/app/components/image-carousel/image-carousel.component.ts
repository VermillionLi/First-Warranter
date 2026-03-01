import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Swiper, SwiperSlide } from 'swiper/react';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageCarouselComponent  implements OnInit {
  // TODO: save uploaded files and use them here
  images = [
    'assets/hqdefault.jpg',
    'assets/catbutton.png',
    'assets/dotted-structure.png'
  ];

  constructor() { }

  ngOnInit() {}

}
