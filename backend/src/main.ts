import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { InteroperabilidadExceptionFilter } from './turismo/infraestructura/filtros/interoperabilidad-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Mejora 4: Validación Global y Rechazo Estructurado
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remueve campos no definidos en el DTO
    forbidNonWhitelisted: true, // Rechaza peticiones con campos extra
  }));
  app.useGlobalFilters(new InteroperabilidadExceptionFilter());

  // Configuración de CORS para aceptar peticiones desde localhost:3000
  app.enableCors({
    origin: 'http://localhost:4000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(4001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
