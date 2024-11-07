import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestimoniosService } from './testimonios.service';
import { CreateTestimonioDto } from './dto/create-testimonio.dto';
import { UpdateTestimonioDto } from './dto/update-testimonio.dto';

@Controller('testimonios')
export class TestimoniosController {
  constructor(private readonly testimoniosService: TestimoniosService) {}

  @Post()
  create(@Body() createTestimonioDto: CreateTestimonioDto) {
    return this.testimoniosService.create(createTestimonioDto);
  }

  @Get()
  findAll() {
    return this.testimoniosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testimoniosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestimonioDto: UpdateTestimonioDto) {
    return this.testimoniosService.update(+id, updateTestimonioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testimoniosService.remove(+id);
  }
}
