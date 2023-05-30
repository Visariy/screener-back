import { Injectable, OnModuleInit } from "@nestjs/common";
import { BinanceService } from "../app.service";
import { OnEvent } from "@nestjs/event-emitter";


export interface asksData {
  name: string;
  amount: number;
  thickness: number;
  procent: number;
  type: string
}
export interface bidsData {
  name: string;
  amount: number;
  thickness: number;
  procent: number;
  type: string;
}

@Injectable()
export class SortCoinService{

  constructor() {}

  public allBidsArray: bidsData[] = [];
  public allAsksArray: asksData[] = [];

  @OnEvent('data.updated')
  handleUpdatedData(newData) {

    let infoArray = newData;

    this.allAsksArray.length = 0;
    this.allBidsArray.length = 0;

    let findProcent = (firstPrice, currentPrice) => {
      if(firstPrice > currentPrice) {
        return (firstPrice - currentPrice) / currentPrice * 100;
      } else if (currentPrice > firstPrice) {
        return (currentPrice - firstPrice) / firstPrice * 100;
      } else {
        return 0
      }
    }

    let findTotalMoney = (value: any[]): Array<any> => {
      return value.map(item => {
        let totalMoney = [];
        let maxPrice = item.reduce((price, amount) => {
          totalMoney.push(price * amount);
          return Math.max(...totalMoney);
        })
        if(item[0] * item[1] === maxPrice) {
          return [item[0], item[1], maxPrice];
        }
      })
    }

    let findThickness = (value: any[], maxPrice: number): Array<any> => {
      return value.find(item => {
        if(item[0] * item[1] === maxPrice) {
          return item
        }
      })
    }

    let customFixed = (num: number, n: number): number => {
      return Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
    }

    for (let key in infoArray) {
      let asksAndBids = infoArray[key]

      let asks = asksAndBids[0];
      console.log(asks[0]);
      let firstAskPrice = asks[0][0]

      let bids = asksAndBids[1];
      let firstBidPrice = bids[0][0]

      let asksPriceArray: any;
      asksPriceArray = findTotalMoney(asks);

      let maxAskPrice = Math.max(...asksPriceArray.map(x => x[2]));
      let bestAsk = findThickness(asksPriceArray, maxAskPrice);

      let coinName = key;

      let askAmount = Number(bestAsk[1]);
      askAmount = customFixed(askAmount, 0);

      let askThickness = maxAskPrice;
      askThickness = customFixed(askThickness, 0)

      let askProcent = findProcent(firstAskPrice, bestAsk[0]);
      askProcent = customFixed(askProcent, 2);

      let asksData: asksData = {
        name: coinName,
        thickness: askThickness,
        procent: askProcent,
        amount: askAmount,
        type: 'ask',
      }

      this.allAsksArray.push(asksData);

      let bidsPriceArray: any;
      bidsPriceArray = findTotalMoney(bids);

      let maxBidPrice = Math.max(...bidsPriceArray.map(x => x[2]));
      let bestBid = findThickness(bidsPriceArray, maxBidPrice);

      let bidAmount = Number(bestBid[1]);
      bidAmount = customFixed(bidAmount, 0);

      let bidThickness = maxBidPrice
      bidThickness = customFixed(bidThickness, 0);


      let bidProcent = findProcent(firstBidPrice, bestAsk[0]);
      bidProcent = customFixed(bidProcent, 3);


      let bidsData: bidsData = {
        name: coinName,
        thickness: bidThickness,
        procent: bidProcent,
        amount: bidAmount,
        type: 'bid'
      }

      this.allBidsArray.push(bidsData);

    }
  }
}

