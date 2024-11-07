import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './productos/productos.module';
import { NovedadesModule } from './novedades/novedades.module';
import { BannerModule } from './banner/banner.module';
import { RedesModule } from './redes/redes.module';
import { MisionModule } from './mision/mision.module';
import { BeneficiosModule } from './beneficios/beneficios.module';
import { TestimoniosModule } from './testimonios/testimonios.module';
import { AboutModule } from './about/about.module';
import { SeccionesModule } from './secciones/secciones.module';

@Module({
  imports: [AuthModule, ProductosModule, NovedadesModule, BannerModule, RedesModule, MisionModule, BeneficiosModule, TestimoniosModule, AboutModule, SeccionesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
