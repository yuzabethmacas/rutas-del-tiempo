import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ThrottlerEspanolGuard } from '../guardias/throttler-es.guard';
import { EventoDatosContextuales } from '../../dominio/eventos/evento-datos-contextuales';
import { ContratoDatosContextualesDto } from '../../dominio/contratos/contrato-datos-contextuales';
import { TailorRespuesta } from '../decoradores/tailor-respuesta.decorator';
import { RegistroServicios } from '../registro/registro-servicios';

@Controller('interoperabilidad')
export class ControladorInteroperabilidad {
  constructor(
    private readonly eventBus: EventBus,
    private readonly registroServicios: RegistroServicios,
  ) {}

  @Post('contexto')
  @UseGuards(ThrottlerEspanolGuard) // Mejora 5: Gestión de Recursos / Rate Limiting (Mensaje Español)
  @TailorRespuesta()         // Mejora 1: Tailor Interface
  recibirDatosContextuales(@Body() datos: ContratoDatosContextualesDto) { // Mejora 2: Contratos Semánticos
    console.log(`\n[Controlador Interoperabilidad] Recibiendo datos basados en Contrato Semántico estricto.`);

    // Mejora 3: Discover Service con indirección
    const urlClima = this.registroServicios.obtenerUrlServicio('clima-cuenca');
    const urlAforo = this.registroServicios.obtenerUrlServicio('aforo-sensores');
    console.log(`[Controlador Interoperabilidad] Descubrimiento de servicios: Resolviendo URLs dinámicamente...`);
    console.log(`[Controlador Interoperabilidad] -> URL Clima resuelta: ${urlClima}`);
    console.log(`[Controlador Interoperabilidad] -> URL Aforo resuelta: ${urlAforo}`);

    console.log(`[Controlador Interoperabilidad] Emitiendo EventoDatosContextuales al Bus de Eventos (Mediador Central)...`);

    // Publicamos el evento. El bus de eventos actúa como Mediador Central.
    this.eventBus.publish(
      new EventoDatosContextuales(
        datos.identificadorSitio,
        datos.porcentajeOcupacion,
        datos.estadoClimatico,
      )
    );

    // Retornamos un objeto con propiedades específicas para el TailorRespuestaInterceptor
    return {
      respuestaPublica: { 
        mensaje: 'Datos recibidos y en procesamiento.',
        rutaSugerida: 'Pendiente de cálculo por el orquestador' // Simulado
      },
      detallesInternos: {
        identificadorSitio: datos.identificadorSitio,
        porcentajeOcupacion: datos.porcentajeOcupacion,
        estadoClimatico: datos.estadoClimatico,
        origenClima: urlClima,
        origenAforo: urlAforo
      }
    };
  }
}
