import { Test, TestingModule } from '@nestjs/testing';
import { RedesController } from './redes.controller';
import { RedesService } from './redes.service';

describe('RedesController', () => {
  let controller: RedesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedesController],
      providers: [RedesService],
    }).compile();

    controller = module.get<RedesController>(RedesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
