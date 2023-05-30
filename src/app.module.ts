import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from "@nestjs/axios";
import { BinanceService } from './app.service';
import { SortCoinService } from './sort-coin/sort-coin.service';
import { EventEmitterModule } from "@nestjs/event-emitter";


@Module({
  imports: [HttpModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [BinanceService, SortCoinService],
})
export class AppModule {}
