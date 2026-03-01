import {Component, OnInit, Input} from '@angular/core';
import {DataService} from "../../services/data-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from '@angular/core';
import {ApplianceStateService} from "../../services/appliance-state-service";

export interface ApplianceItem {
  name: string
  description: any;
  price: string,
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
    //const img_dict = this.dataService.getMasterDict()
    const img_dict = { "HVAC": "Central heating and cooling system with a modern five blade wooden ceiling fan in good condition", "Electrical": "Residential electrical system with recessed ceiling lighting and wall outlets in good condition", "Plumbing": "Standard home plumbing system with water heater and fixtures in good condition", "Oven": "Built in stainless steel wall oven in good condition", "Microwave": "Built in stainless steel microwave oven in good condition", "Fridge": "Stainless steel refrigerator in kitchen area in good condition", "Dishwasher": "Built in stainless steel dishwasher in good condition", "Stove": "Kitchen cooktop with standard burners in good condition", "Washer": "Standard top or front load washing machine in good condition", "Dryer": "Standard electric or gas clothes dryer in good condition" } //rmove once done testing
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
