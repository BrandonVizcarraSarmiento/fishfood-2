import { Module } from '@nestjs/common';
import { SeccionesService } from './secciones.service';
import { SeccionesController } from './secciones.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SeccionesController],
  providers: [SeccionesService, PrismaService],
})
export class SeccionesModule {}
