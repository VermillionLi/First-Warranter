import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule,
    ImageUploadComponent,
  ]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
