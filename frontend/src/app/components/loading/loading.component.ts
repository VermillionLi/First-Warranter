import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data-service";
import {diamond} from "ionicons/icons";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ApplianceItem} from "../appliance-box/appliance-box.component";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  providers: [DataService]
})
export class LoadingComponent  implements OnInit {
  constructor(private dataService: DataService, private http: HttpClient) {
  }

  ngOnInit() {

  }
}








