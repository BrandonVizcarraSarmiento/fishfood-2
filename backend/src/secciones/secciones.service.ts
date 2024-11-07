import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeccioneDto } from './dto/create-seccione.dto';
import { UpdateSeccioneDto } from './dto/update-seccione.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeccionesService {

  constructor(private prismaService: PrismaService) { }

  create(createSeccioneDto: CreateSeccioneDto) {
    return this.prismaService.secciones.create({ data: createSeccioneDto })
  }

  findAll() {
    return this.prismaService.secciones.findMany();
  }

  async findOne(id: number) {
    const seccionesEncontrado = await this.prismaService.secciones.findUnique({ where: { id: id } });

    if (!seccionesEncontrado) {
      throw new NotFoundException(`Seccion ${id} no encontrado`);
    }

    return seccionesEncontrado;
  }

  async update(id: number, updateSeccioneDto: UpdateSeccioneDto) {
    const seccionesActulizado = await this.prismaService.secciones.update({ where: { id }, data: updateSeccioneDto });

    if (!seccionesActulizado) {
      throw new NotFoundException(`Seccion ${id} no encontrado`);
    }

    return seccionesActulizado;
  }

  remove(id: number) {
    return `This action removes a #${id} seccione`;
  }
}
