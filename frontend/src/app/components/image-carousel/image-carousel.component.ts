import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Swiper, SwiperSlide } from 'swiper/react';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageCarouselComponent  implements OnInit {
  @Input() images:any[] = [];

  constructor() { }

  ngOnInit() {console.log("carousel"); console.log(this.images)}

}
