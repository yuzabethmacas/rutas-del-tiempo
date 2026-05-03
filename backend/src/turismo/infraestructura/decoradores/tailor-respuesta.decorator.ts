import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interceptor que implementa la táctica "Tailor Interface" (Sección 6.2).
 * Modifica la respuesta saliente en función del consumidor identificado por
 * el header 'x-tipo-cliente'.
 */
@Injectable()
export class TailorRespuestaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const tipoCliente = request.headers['x-tipo-cliente'] || 'turista';

    return next.handle().pipe(
      map((data) => {
        // Si el controlador no devuelve datos específicos, no transformamos
        if (!data || !data.detallesInternos) return data;

        // Tailor Interface: Adaptamos la respuesta según el cliente
        if (tipoCliente === 'administrador') {
          // El administrador recibe todos los datos, incluyendo el crudo del sensor
          return {
            ...data.respuestaPublica,
            datosCrudosSensor: data.detallesInternos,
            timestamp: new Date().toISOString(),
          };
        } else {
          // El turista (por defecto) solo recibe la información esencial
          return data.respuestaPublica;
        }
      }),
    );
  }
}

/**
 * Decorador personalizado para aplicar el TailorRespuestaInterceptor
 * de forma semántica y limpia en los controladores.
 */
export function TailorRespuesta() {
  return applyDecorators(UseInterceptors(TailorRespuestaInterceptor));
}
