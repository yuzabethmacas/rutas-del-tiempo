import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Backend de Rutas del Tiempo funcionando correctamente en el puerto 4001.';
  }
}
