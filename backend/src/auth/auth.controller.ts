import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint para registrar un nuevo usuario
  @Post('register')
  async register(@Body() body: { correo: string; password: string }) {
    const { correo, password } = body;
    return this.authService.register(correo, password);
  }

  // Endpoint para iniciar sesión
  @Post('login')
  async login(@Body() body: { correo: string; password: string }) {
    const { correo, password } = body;
    const user = await this.authService.validateUser(correo, password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user };
  }
}
