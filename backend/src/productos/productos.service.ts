import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductosService {

  constructor(private prismaService: PrismaService) { }

  create(createProductoDto: CreateProductoDto) {
    return this.prismaService.productos.create({ data: createProductoDto });
  }

  findAll() {
    return this.prismaService.productos.findMany();
  }

  async findOne(id: number) {
    const productoEncontrado = await this.prismaService.productos.findUnique({ where: { id: id } });

    if (!productoEncontrado) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }

    return productoEncontrado;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const productoActulizado = await this.prismaService.productos.update({ where: { id }, data: updateProductoDto });

    if(!productoActulizado){
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }

    return productoActulizado;
  }

  async remove(id: number) {
    const productoEliminado = await this.prismaService.productos.delete({ where: { id } });

    if (!productoEliminado) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }

    return productoEliminado;
  }
}
