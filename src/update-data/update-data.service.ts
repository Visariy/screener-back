import { Injectable } from "@nestjs/common";
import { startWith, Subject } from "rxjs";
import { DistributorService } from "../distributor/distributor.service";

@Injectable()
export class UpdateDataService {

  constructor(private distributorService: DistributorService) {}

  private dataUpdated = new Subject<any>();

  getDataUpdated() {
    if(this.distributorService.allThickness.length > 0) {
      return this.dataUpdated.asObservable().pipe(startWith({ data: this.distributorService.getData() }))
    }
  }

  updateData(newData: any) {
    this.dataUpdated.next({data: newData})
  }
}
