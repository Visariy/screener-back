import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from "@nestjs/axios";
import { BinanceService } from './app.service';
import { SortCoinService } from './sort-coin/sort-coin.service';
import { EventEmitterModule } from "@nestjs/event-emitter";
import { UpdateDataService } from './update-data/update-data.service';
import { DistributorService } from './distributor/distributor.service';


@Module({
  imports: [HttpModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [BinanceService, UpdateDataService, SortCoinService, DistributorService],
})
export class AppModule {}
