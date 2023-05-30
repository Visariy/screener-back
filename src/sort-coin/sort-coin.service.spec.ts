import { Test, TestingModule } from '@nestjs/testing';
import { SortCoinService } from './sort-coin.service';

describe('SortCoinService', () => {
  let service: SortCoinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SortCoinService],
    }).compile();

    service = module.get<SortCoinService>(SortCoinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
