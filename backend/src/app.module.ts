import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './productos/productos.module';
import { NovedadesModule } from './novedades/novedades.module';

@Module({
  imports: [AuthModule, ProductosModule, NovedadesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
