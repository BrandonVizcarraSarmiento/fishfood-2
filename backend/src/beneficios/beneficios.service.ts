import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BeneficiosService {

  constructor(private prismaService: PrismaService) { }

  create(createBeneficioDto: CreateBeneficioDto) {
    return this.prismaService.beneficios.create({ data: createBeneficioDto })
  }

  findAll() {
    return this.prismaService.beneficios.findMany();
  }

  async findOne(id: number) {
    const beneficioEncontrado = await this.prismaService.beneficios.findUnique({ where: { id: id } });

    if (!beneficioEncontrado) {
      throw new NotFoundException(`Beneficio ${id} no encontrado`);
    }

    return beneficioEncontrado;
  }

  async update(id: number, updateBeneficioDto: UpdateBeneficioDto) {
    const beneficioActulizado = await this.prismaService.beneficios.update({ where: { id }, data: updateBeneficioDto });

    if (!beneficioActulizado) {
      throw new NotFoundException(`Beneficio ${id} no encontrado`);
    }

    return beneficioActulizado;
  }

  remove(id: number) {
    return `This action removes a #${id} beneficio`;
  }
}
