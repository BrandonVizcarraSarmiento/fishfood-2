import { Test, TestingModule } from '@nestjs/testing';
import { TestimoniosController } from './testimonios.controller';
import { TestimoniosService } from './testimonios.service';

describe('TestimoniosController', () => {
  let controller: TestimoniosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestimoniosController],
      providers: [TestimoniosService],
    }).compile();

    controller = module.get<TestimoniosController>(TestimoniosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
