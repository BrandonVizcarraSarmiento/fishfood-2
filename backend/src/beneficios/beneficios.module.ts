import { Module } from '@nestjs/common';
import { BeneficiosService } from './beneficios.service';
import { BeneficiosController } from './beneficios.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BeneficiosController],
  providers: [BeneficiosService, PrismaService],
})
export class BeneficiosModule {}
