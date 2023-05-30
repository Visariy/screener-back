import { Controller, Sse } from '@nestjs/common';
import { interval, Observable, of, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { asksData, bidsData } from "./sort-coin/sort-coin.service";
import { SortCoinService } from "./sort-coin/sort-coin.service";

interface allData {
  name: string;
  thickness: number;
  procent: number;
  amount: number;
  type: string;
}

@Controller('hello')
export class AppController {
  constructor(private sortCoinService: SortCoinService) {}

  @Sse('sse')
  sse(): Observable<allData[]> {
    if(this.sortCoinService.allAsksArray.length && this.sortCoinService.allBidsArray.length > 0) {
      const asksThickness = this.sortCoinService.allAsksArray;
      const bidsThickness = this.sortCoinService.allBidsArray;
      const allThickness = asksThickness.concat(bidsThickness);
      return of(allThickness);
    }
  }
}
