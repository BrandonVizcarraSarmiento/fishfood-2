import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMisionDto } from './dto/create-mision.dto';
import { UpdateMisionDto } from './dto/update-mision.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MisionService {

  constructor(private prismaService: PrismaService) { }

  create(createMisionDto: CreateMisionDto) {
    return this.prismaService.mision.create({ data: createMisionDto })
  }

  findAll() {
    return this.prismaService.mision.findMany();
  }

  async findOne(id: number) {
    const misionEncontrado = await this.prismaService.mision.findUnique({ where: { id: id } });

    if (!misionEncontrado) {
      throw new NotFoundException(`Mision ${id} no encontrado`);
    }

    return misionEncontrado;
  }

  async update(id: number, updateMisionDto: UpdateMisionDto) {
    const misionActulizado = await this.prismaService.mision.update({ where: { id }, data: updateMisionDto });

    if (!misionActulizado) {
      throw new NotFoundException(`Mision ${id} no encontrado`);
    }

    return misionActulizado;
  }

  remove(id: number) {
    return `This action removes a #${id} mision`;
  }
}
