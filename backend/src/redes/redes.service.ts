import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRedeDto } from './dto/create-rede.dto';
import { UpdateRedeDto } from './dto/update-rede.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RedesService {

  constructor(private prismaService: PrismaService) { }

  create(createRedeDto: CreateRedeDto) {
    return this.prismaService.redes.create({ data: createRedeDto })
  }

  findAll() {
    return this.prismaService.redes.findMany();
  }

  async findOne(id: number) {
    const redesEncontrado = await this.prismaService.redes.findUnique({ where: { id: id } });

    if (!redesEncontrado) {
      throw new NotFoundException(`Redes ${id} no encontrado`);
    }

    return redesEncontrado;
  }

  async update(id: number, updateRedeDto: UpdateRedeDto) {
    const redesActulizado = await this.prismaService.redes.update({ where: { id }, data: updateRedeDto });

    if (!redesActulizado) {
      throw new NotFoundException(`Redes ${id} no encontrado`);
    }

    return redesActulizado;
  }

  remove(id: number) {
    return `This action removes a #${id} rede`;
  }
}
