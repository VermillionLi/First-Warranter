import {Component, OnInit, Input} from '@angular/core';
import {DataService, ServerMessages} from "../../services/data-service";
import {CommonModule} from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from '@angular/core';
import {ApplianceStateService} from "../../services/appliance-state-service";
import {IonItem, IonLabel, IonList, IonSpinner} from "@ionic/angular/standalone";
import {NgForOf, NgIf} from "@angular/common";
import { map } from 'rxjs/operators';


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
    CommonModule
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


  async handleNumbers() {
    const img_dict = this.dataService.getMasterDict()
    console.log("managed to get master dict: " + Object.keys(img_dict).length)

    let totalPrice = 0;
    for (const key in img_dict) {
      const input = key + ', ' + img_dict[key]
      console.log("this is input to ollama: " + input)

      this.sendProcesses(key + ", " + img_dict[key]).subscribe(price => {
        console.log("received price: " + price)
        const item = this.items.find(i => i.name === key)
        if (item){
          item.price = price.toString()
            totalPrice += price;
        }
    });   
    //   const something = this.sendProcesses(key + ", " + img_dict[key])
    //   const item = this.items.find(i => i.name === key)
    //   if (item){
    //     item.price = something
    //   }
    //   Object.assign({name: item, description: img_dict[key], something});
    }

    this.items.push({
      name: "🟩Total Estimated Cost",
      description: "",
      price: totalPrice.toString()
    })
  }


  sendProcesses(description: string) {
  return this.http
    .post<{ price: number }>(
      `${environment.api_url}/api/calculate`,
      { description }
    )
    .pipe(map(res => res.price));
}


}
