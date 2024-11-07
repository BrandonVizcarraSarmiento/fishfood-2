import { Test, TestingModule } from '@nestjs/testing';
import { TestimoniosService } from './testimonios.service';

describe('TestimoniosService', () => {
  let service: TestimoniosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestimoniosService],
    }).compile();

    service = module.get<TestimoniosService>(TestimoniosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
