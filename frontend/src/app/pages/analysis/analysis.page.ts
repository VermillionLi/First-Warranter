import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {HttpClient} from "@angular/common/http";
import {DataService} from "../../services/data-service";
import {Router} from "@angular/router";
import { ImageCarouselComponent } from 'src/app/components/image-carousel/image-carousel.component';
// import { LoadingComponent } from 'src/app/components/loading/loading.component';
// import {ApplianceBoxComponent} from "../../components/appliance-box/appliance-box.component";
import {constructOutline} from "ionicons/icons";
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import {ApplianceBoxComponent} from "../../components/appliance-box/appliance-box.component";
import {LoadingComponent} from "../../components/loading/loading.component";

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ImageCarouselComponent,
    // LoadingComponent, ApplianceBoxComponent,
    ImageUploadComponent, ApplianceBoxComponent, LoadingComponent
  ]
})
export class AnalysisPage implements OnInit {

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    console.log("test in analysis")
  }


}
