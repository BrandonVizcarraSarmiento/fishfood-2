import { Module } from '@nestjs/common';
import { TestimoniosService } from './testimonios.service';
import { TestimoniosController } from './testimonios.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TestimoniosController],
  providers: [TestimoniosService, PrismaService],
})
export class TestimoniosModule {}
