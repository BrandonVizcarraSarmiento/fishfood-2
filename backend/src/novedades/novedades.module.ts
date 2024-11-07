import { Module } from '@nestjs/common';
import { NovedadesService } from './novedades.service';
import { NovedadesController } from './novedades.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NovedadesController],
  providers: [NovedadesService, PrismaService],
})
export class NovedadesModule {}
