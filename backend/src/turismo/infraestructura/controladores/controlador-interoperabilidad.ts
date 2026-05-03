import { Body, Controller, Post } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventoDatosContextuales } from '../../dominio/eventos/evento-datos-contextuales';

class DatosSensorDto {
  identificadorSitio: string;
  porcentajeOcupacion: number;
  estadoClimatico: string;
}

@Controller('interoperabilidad')
export class ControladorInteroperabilidad {
  constructor(private readonly eventBus: EventBus) {}

  @Post('contexto')
  recibirDatosContextuales(@Body() datos: DatosSensorDto) {
    console.log(`\n[Controlador Interoperabilidad] Datos recibidos del sensor y API de clima.`);
    console.log(`[Controlador Interoperabilidad] Emitiendo EventoDatosContextuales al Bus de Eventos (Mediador Central)...`);

    // Publicamos el evento. El bus de eventos actúa como Mediador Central.
    this.eventBus.publish(
      new EventoDatosContextuales(
        datos.identificadorSitio,
        datos.porcentajeOcupacion,
        datos.estadoClimatico,
      )
    );

    return { mensaje: 'Datos recibidos y en procesamiento por el Mediador Central.' };
  }
}
