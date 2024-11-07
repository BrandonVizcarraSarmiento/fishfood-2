import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiosController } from './beneficios.controller';
import { BeneficiosService } from './beneficios.service';

describe('BeneficiosController', () => {
  let controller: BeneficiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeneficiosController],
      providers: [BeneficiosService],
    }).compile();

    controller = module.get<BeneficiosController>(BeneficiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
