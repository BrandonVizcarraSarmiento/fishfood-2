import { Test, TestingModule } from '@nestjs/testing';
import { RedesService } from './redes.service';

describe('RedesService', () => {
  let service: RedesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedesService],
    }).compile();

    service = module.get<RedesService>(RedesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
