import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AboutController],
  providers: [AboutService, PrismaService],
})
export class AboutModule {}
