import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonioDto } from './dto/create-testimonio.dto';
import { UpdateTestimonioDto } from './dto/update-testimonio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestimoniosService {

  constructor(private prismaService: PrismaService) { }

  create(createTestimonioDto: CreateTestimonioDto) {
    return this.prismaService.testimonios.create({ data: createTestimonioDto })
  }

  findAll() {
    return this.prismaService.testimonios.findMany();
  }

  async findOne(id: number) {
    const testimonioEncontrado = await this.prismaService.testimonios.findUnique({ where: { id: id } });

    if (!testimonioEncontrado) {
      throw new NotFoundException(`Testimonio ${id} no encontrado`);
    }

    return testimonioEncontrado;
  }

  async update(id: number, updateTestimonioDto: UpdateTestimonioDto) {
    const testimonioActulizado = await this.prismaService.testimonios.update({ where: { id }, data: updateTestimonioDto });

    if (!testimonioActulizado) {
      throw new NotFoundException(`Testimonio ${id} no encontrado`);
    }

    return testimonioActulizado;
  }

  remove(id: number) {
    return `This action removes a #${id} testimonio`;
  }
}
