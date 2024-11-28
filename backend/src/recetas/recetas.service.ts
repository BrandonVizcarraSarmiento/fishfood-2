import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecetasService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createRecetaDto: CreateRecetaDto) {
    const { titulo, imagen, ingredientes, pasos } = createRecetaDto;

    // Crear la receta y los pasos asociados en una transacción
    const receta = await this.prismaService.$transaction(async (prisma) => {
      const nuevaReceta = await prisma.recetas.create({
        data: {
          titulo,
          imagen,
          ingredientes,
        },
      });

      const pasosConRecetaId = pasos.map((paso) => ({
        ...paso,
        recetaId: nuevaReceta.id,
      }));

      await prisma.paso.createMany({
        data: pasosConRecetaId,
      });

      return nuevaReceta;
    });

    return receta;
  }

  async findAll() {
    return this.prismaService.recetas.findMany({
      include: { pasos: true },
    });
  }

  async findOne(id: number) {
    const receta = await this.prismaService.recetas.findUnique({
      where: { id },
      include: { pasos: true },
    });

    if (!receta) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }

    return receta;
  }

  async update(id: number, updateRecetaDto: UpdateRecetaDto) {
    const { pasos, ...datosReceta } = updateRecetaDto;

    return this.prismaService.$transaction(async (prisma) => {
      // Actualizar los datos principales de la receta
      const recetaActualizada = await prisma.recetas.update({
        where: { id },
        data: datosReceta,
      });

      if (pasos && pasos.length > 0) {
        for (const paso of pasos) {
          if (paso.id) {
            // Actualizar un paso existente
            await prisma.paso.update({
              where: { id: paso.id },
              data: {
                numero: paso.numero,
                descripcion: paso.descripcion,
              },
            });
          } else {
            // Crear un nuevo paso si no tiene ID
            await prisma.paso.create({
              data: {
                numero: paso.numero,
                descripcion: paso.descripcion,
                recetaId: id,
              },
            });
          }
        }
      }

      return recetaActualizada;
    });
  }

  async remove(id: number) {
    return this.prismaService.$transaction(async (prisma) => {
      // Primero, eliminar los pasos asociados a la receta
      await prisma.paso.deleteMany({
        where: {
          recetaId: id,
        },
      });

      // Luego, eliminar la receta
      const recetaEliminada = await prisma.recetas.delete({
        where: { id },
      });

      if (!recetaEliminada) {
        throw new NotFoundException(`Receta ${id} no encontrada`);
      }

      return recetaEliminada;
    });
  }
  async removePaso(pasoId: number) {
    const paso = await this.prismaService.paso.findUnique({
      where: { id: pasoId },
    });
  
    if (!paso) {
      throw new NotFoundException(`Paso con ID ${pasoId} no encontrado`);
    }
  
    return this.prismaService.paso.delete({
      where: { id: pasoId },
    });
  }
}
