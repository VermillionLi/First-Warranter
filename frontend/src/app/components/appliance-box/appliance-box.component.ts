import { Component, OnInit, Input} from '@angular/core';


export interface ApplianceItem {
    description: string;
    price: number,
}
@Component({
  selector: 'app-appliance-box',
  templateUrl: './appliance-box.component.html',
  styleUrls: ['./appliance-box.component.scss'],
})
export class ApplianceBoxComponent  implements OnInit {
    @Input() mainLabel: string = "Appliances and Systems";
    @Input() name!: string
    @Input() items: ApplianceItem[] = [];
    
  constructor() { }

  ngOnInit() {}

}
