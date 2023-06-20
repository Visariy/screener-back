import { HttpService } from "@nestjs/axios";
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from "@nestjs/event-emitter";
import { map } from 'rxjs/operators';

@Injectable()
export class BinanceService implements OnModuleInit {

  symbols = ['BTCUSDT', 'ETHUSDT', 'BCHUSDT', 'XRPUSDT', 'EOSUSDT', 'LTCUSDT',
    'TRXUSDT', 'ETCUSDT','LINKUSDT', 'XLMUSDT', 'ADAUSDT', 'XMRUSDT',
    'DASHUSDT', 'ZECUSDT', 'XTZUSDT', 'BNBUSDT', 'ATOMUSDT', 'ONTUSDT',
    'IOTAUSDT', 'BATUSDT', 'VETUSDT', 'NEOUSDT', 'QTUMUSDT', 'IOSTUSDT',
    'THETAUSDT', 'ALGOUSDT', 'ZILUSDT', 'KNCUSDT', 'ZRXUSDT', 'COMPUSDT',
    'OMGUSDT', 'DOGEUSDT', 'SXPUSDT', 'KAVAUSDT', 'BANDUSDT', 'RLCUSDT',
    'WAVESUSDT', 'MKRUSDT', 'SNXUSDT', 'DOTUSDT', 'YFIUSDT', 'BALUSDT',
    'CRVUSDT', 'TRBUSDT', 'RUNEUSDT', 'SUSHIUSDT', 'EGLDUSDT', 'SOLUSDT',
    'ICXUSDT', 'STORJUSDT', 'BLZUSDT', 'UNIUSDT', 'AVAXUSDT', 'FTMUSDT',
    'ENJUSDT', 'FLMUSDT', 'TOMOUSDT', 'RENUSDT', 'KSMUSDT', 'NEARUSDT',
    'AAVEUSDT', 'FILUSDT', 'RSRUSDT', 'LRCUSDT', 'MATICUSDT', 'OCEANUSDT',
    'BELUSDT', 'CTKUSDT', 'AXSUSDT', 'ALPHAUSDT', 'ZENUSDT', 'SKLUSDT',
    'GRTUSDT', '1INCHUSDT', 'CHZUSDT', 'ANKRUSDT', 'LITUSDT', 'UNFIUSDT',
    'REEFUSDT', 'RVNUSDT', 'SFPUSDT', 'XEMUSDT', 'COTIUSDT', 'CHRUSDT',
    'MANAUSDT', 'ALICEUSDT', 'BNXUSDT', 'ACHUSDT', 'HBARUSDT', 'ONEUSDT',
    'LINAUSDT', 'STMXUSDT', 'DENTUSDT', 'CELRUSDT', 'HOTUSDT', 'MTLUSDT',
    'OGNUSDT', 'NKNUSDT', 'DGBUSDT', 'SHIBUSDT', 'BAKEUSDT', 'GTCUSDT',
    'IOTXUSDT', 'AUDIOUSDT', 'C98USDT', 'MASKUSDT', 'ATAUSDT', 'DYDXUSDT',
    'XECUSDT', 'GALAUSDT', 'CELOUSDT', 'ARUSDT', 'KLAYUSDT', 'ARPAUSDT',
    'CTSIUSDT', 'LPTUSDT', 'ENSUSDT', 'PEOPLEUSDT', 'ANTUSDT', 'ROSEUSDT',
    'DUSKUSDT', 'FLOWUSDT', 'IMXUSDT', 'API3USDT', 'GMTUSDT', 'TRUUSDT',
    'LQTYUSDT', 'IDUSDT', 'ARBUSDT', 'JOEUSDT', 'APEUSDT', 'WOOUSDT',
    'JASMYUSDT', 'DARUSDT', 'GALUSDT', 'OPUSDT', 'INJUSDT', 'STGUSDT',
    'SPELLUSDT', 'LUNCUSDT', 'LUNAUSDT', 'LDOUSDT', 'CVXUSDT', 'ICPUSDT',
    'APTUSDT', 'QNTUSDT', 'FETUSDT', 'FXSUSDT', 'HOOKUSDT', 'MAGICUSDT',
    'TUSDT', 'RNDRUSDT', 'HIGHUSDT', 'MINAUSDT', 'ASTRUSDT', 'AGIXUSDT',
    'TLMUSDT', 'AMBUSDT', 'LEVERUSDT', 'RDNTUSDT', 'HFTUSDT', 'XVSUSDT',
    'PHBUSDT', 'GMXUSDT', 'CFXUSDT', 'STXUSDT', 'SSVUSDT', 'CKBUSDT'];


  constructor(private httpService: HttpService, private eventEmitter: EventEmitter2) {}

  depths = [];

  onModuleInit(): void {
    setInterval(async () => {
      this.depths.length = 0;
      for (const symbol of this.symbols) {
        try {
          const response = await this.httpService.get('https://api.binance.com/api/v3/depth',
          {
              params: {
                symbol,
                limit: 100,
              },
            })
            .pipe(map((response) => response.data))
            .toPromise();
          this.depths[symbol] = [response.asks, response.bids];
        } catch (e) {
          console.log(e);
        }
      }
      this.updateData(this.depths);
    }, 100000)
  }
  updateData = (newData) => {
   this.depths = newData
   this.eventEmitter.emit('data.updated', newData);
  }
}

