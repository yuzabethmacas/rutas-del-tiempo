import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Filtro de Excepciones para Interoperabilidad (Sección 6.1 - Rechazo de Solicitudes)
 * 
 * Atrapa los errores de validación (BadRequestException causados por el ValidationPipe)
 * y registra en consola de manera detallada por qué se rechazó la solicitud (incluyendo
 * el timestamp y el payload original) antes de enviar la respuesta al cliente.
 */
@Catch(BadRequestException)
export class InteroperabilidadExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exResponse = exception.getResponse() as any;

    const motivo = exResponse.message || 'Estructura de datos no coincide con el contrato semántico.';
    const timestamp = new Date().toISOString();

    // Táctica: Registro estructurado de la anomalía
    console.error('\n[Rechazo de Solicitud - Interoperabilidad]');
    console.error(`- Timestamp: ${timestamp}`);
    console.error(`- Motivo: ${JSON.stringify(motivo)}`);
    console.error(`- Payload Recibido: ${JSON.stringify(request.body)}`);
    console.error(`- Ruta: ${request.url}\n`);

    response.status(status).json({
      estado: 'Rechazado',
      codigoHttp: status,
      timestamp,
      errores: motivo,
      mensaje: 'La petición fue rechazada y el evento ha sido registrado para auditoría.',
    });
  }
}
