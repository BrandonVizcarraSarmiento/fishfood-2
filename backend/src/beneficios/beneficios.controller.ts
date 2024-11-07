import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BeneficiosService } from './beneficios.service';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';

@Controller('beneficios')
export class BeneficiosController {
  constructor(private readonly beneficiosService: BeneficiosService) {}

  @Post()
  create(@Body() createBeneficioDto: CreateBeneficioDto) {
    return this.beneficiosService.create(createBeneficioDto);
  }

  @Get()
  findAll() {
    return this.beneficiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beneficiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeneficioDto: UpdateBeneficioDto) {
    return this.beneficiosService.update(+id, updateBeneficioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beneficiosService.remove(+id);
  }
}
