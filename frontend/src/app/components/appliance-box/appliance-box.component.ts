import {Component, OnInit, Input} from '@angular/core';
import {DataService, ServerMessages} from "../../services/data-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from '@angular/core';
import {ApplianceStateService} from "../../services/appliance-state-service";
import {IonItem, IonLabel, IonList, IonSpinner} from "@ionic/angular/standalone";
import {NgForOf, NgIf} from "@angular/common";

export interface ApplianceItem {
  name: string
  description: any;
  price: string,
}

@Component({
  selector: 'app-appliance-box',
  templateUrl: './appliance-box.component.html',
  styleUrls: ['./appliance-box.component.scss'],
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
    NgForOf,
    NgIf
  ],
})


export class ApplianceBoxComponent implements OnInit {
  @Input() mainLabel: string = "Appliances and Systems";
  @Input() name!: string
  @Input() items: ApplianceItem[] = [];
  protected isLoading: any;

  constructor(private dataService: DataService, private http: HttpClient, private appliance: ApplianceStateService) {
  }

  ngOnInit() {
    console.log("arrived at appliancebox")
    this.dataService.messages$.subscribe(dict => {
    this.populateItems(dict);
    console.log("please don't be empty: " + this.dataService.getMasterDict())
  });
  }

  populateItems(dict: ServerMessages) {
    Object.entries(dict).forEach(([key, value]) => {
      this.items.push({
        name: key,
        description: value, // or handle array properly
        price: 'loading...'
      });
    });
    this.handleNumbers()
  }


  handleNumbers() {
    const img_dict = this.dataService.getMasterDict()
    console.log("managed to get master dict: " + Object.keys(img_dict).length)
    for (const key in img_dict) {
      const input = key + ', ' + img_dict[key]
      console.log("this is input to ollama: " + input)
      const something = this.sendProcesses(key + ", " + img_dict[key])
      const item = this.items.find(i => i.name === key);
      Object.assign({name: item, description: img_dict[key], something});
    }
  }


  sendProcesses(description: string) {
    this.http.post<{price:number}>(`${environment.api_url}/api/calculate`, {description}).subscribe({
      next: (res) => {
        const parsedResponse = res.price
        console.log( parsedResponse);
        console.log("one of the prices has been calculated")
        return parsedResponse
      },
      error: (err) => {
        console.error('CALCULATION FAILED?!?!?!?!', err)
      }
    });
  }


}
