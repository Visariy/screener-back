import { Controller, Sse } from '@nestjs/common';
import { UpdateDataService } from "./update-data/update-data.service";
import { Observable } from "rxjs";

interface allData {
  name: string;
  thickness: number;
  procent: number;
  amount: number;
  type: string;
}

@Controller('coinData')
export class AppController {
  constructor(private updateDataService: UpdateDataService ) {}

  @Sse('sse')
  sse(): Observable<allData> {
    return this.updateDataService.getDataUpdated();
  }
}
