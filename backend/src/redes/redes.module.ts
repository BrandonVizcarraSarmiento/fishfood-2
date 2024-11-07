import { Module } from '@nestjs/common';
import { RedesService } from './redes.service';
import { RedesController } from './redes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RedesController],
  providers: [RedesService, PrismaService],
})
export class RedesModule {}
