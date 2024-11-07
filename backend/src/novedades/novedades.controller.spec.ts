import { Test, TestingModule } from '@nestjs/testing';
import { NovedadesController } from './novedades.controller';
import { NovedadesService } from './novedades.service';

describe('NovedadesController', () => {
  let controller: NovedadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NovedadesController],
      providers: [NovedadesService],
    }).compile();

    controller = module.get<NovedadesController>(NovedadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
