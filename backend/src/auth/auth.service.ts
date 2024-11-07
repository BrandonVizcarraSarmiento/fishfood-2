import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {} // Inyectando PrismaService

  // Validación de usuario
  async validateUser(correo: string, password: string): Promise<any> {
    const user = await this.prisma.usuarios.findUnique({
      where: { correo },
    });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Método para registrar un nuevo usuario
  async register(correo: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.usuarios.create({
      data: {
        correo,
        password: hashedPassword,
      },
    });
  }
}
