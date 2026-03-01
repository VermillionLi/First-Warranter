import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data-service";
import {diamond} from "ionicons/icons";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  providers: [DataService]
})
export class LoadingComponent  implements OnInit {
  constructor(private dataService: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.handleNumbers()
  }

  handleNumbers(){
    const img_dict = this.dataService.getMasterDict()
    for (const key in img_dict) {
        const something = this.sendProcesses(key + ", " + img_dict[key])

    }

  }



  sendProcesses(description:string){
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








