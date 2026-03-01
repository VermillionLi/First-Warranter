import {Component, OnInit, Input} from '@angular/core';
import {DataService} from "../../services/data-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from '@angular/core';
import {ApplianceStateService} from "../../services/appliance-state-service";

export interface ApplianceItem {
  name: string
  description: string;
  price: number,
}

@Component({
  selector: 'app-appliance-box',
  templateUrl: './appliance-box.component.html',
  styleUrls: ['./appliance-box.component.scss'],
})


export class ApplianceBoxComponent implements OnInit {
  @Input() mainLabel: string = "Appliances and Systems";
  @Input() name!: string
  @Input() items: ApplianceItem[] = [];

  constructor(private dataService: DataService, private http: HttpClient, private appliance: ApplianceStateService, private ApplianceItem: ApplianceItem) {
  }

  ngOnInit() {
    this.initiateNumbers()
  }

  initiateNumbers() {
    const img_dict = this.dataService.getMasterDict()
    for (const key in img_dict) {

      this.items.push(this.ApplianceItem = {name: key, description: img_dict[key], price: "loading..."})
    }
    this.handleNumbers()

  }

  handleNumbers() {
    const img_dict = this.dataService.getMasterDict()
    for (const key in img_dict) {
      const something = this.sendProcesses(key + ", " + img_dict[key])
      const item = this.items.find(i => i.name === key);
      Object.assign({name: item, description: img_dict[key], something});
    }
  }


  sendProcesses(description: string) {
    type uploadResponse = {
      body: string
    }
    this.http.post<uploadResponse>(`${environment.api_url}/api/calculate`, description).subscribe({
      next: (res) => {
        const parsedResponse = JSON.parse(res.body);
        console.log(`${res.body} files uploaded. Response:`, parsedResponse);
        //Stephanie update value of whatever to the uhhh thing idk
        return parsedResponse
      },
      error: (err) => {
        console.error('CALCULATION FAILED?!?!?!?!', err)
      }
    });
  }

}
