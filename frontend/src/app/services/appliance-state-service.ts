import { Injectable } from '@angular/core';
import {
  ApplianceBoxComponent,
  ApplianceItem
} from "../components/appliance-box/appliance-box.component";
@Injectable({ providedIn: 'root' })
export class ApplianceStateService {
  boxes: ApplianceBoxComponent[] = []

  // Update entire box items by box name
  updateBoxItemsByName(name: string, newItems: ApplianceItem[]) {
    const box = this.boxes.find(b => b.name === name);
    if (!box) return;
    box.items = newItems;
  }
}

