import { Module } from '@nestjs/common';
import { MisionService } from './mision.service';
import { MisionController } from './mision.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MisionController],
  providers: [MisionService, PrismaService],
})
export class MisionModule {}
