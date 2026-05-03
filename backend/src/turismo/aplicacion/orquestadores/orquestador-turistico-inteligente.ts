import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventoDatosContextuales } from '../../dominio/eventos/evento-datos-contextuales';
import { ServicioAlgoritmoRutas } from '../../dominio/servicios/servicio-algoritmo-rutas';
import { ServicioNotificacionesUbicuas } from '../../dominio/servicios/servicio-notificaciones-ubicuas';

@EventsHandler(EventoDatosContextuales)
export class OrquestadorTuristicoInteligente implements IEventHandler<EventoDatosContextuales> {
  constructor(
    private readonly servicioAlgoritmoRutas: ServicioAlgoritmoRutas,
    private readonly servicioNotificacionesUbicuas: ServicioNotificacionesUbicuas,
  ) {}

  handle(evento: EventoDatosContextuales) {
    console.log(`\n[Orquestador Turístico Inteligente] Evento recibido: Sitio=${evento.identificadorSitio}, Ocupación=${evento.porcentajeOcupacion}%, Clima=${evento.estadoClimatico}`);

    if (evento.porcentajeOcupacion > 80) {
      console.log(`[Orquestador Turístico Inteligente] ¡Alerta de Saturación! Ocupación excede el 80%. Iniciando redistribución del flujo turístico...`);
      
      const rutasSugeridas = this.servicioAlgoritmoRutas.recalcularItinerario(
        evento.identificadorSitio,
        evento.estadoClimatico
      );

      this.servicioNotificacionesUbicuas.alertarUsuario(rutasSugeridas);
      console.log(`[Orquestador Turístico Inteligente] Redistribución completada exitosamente.\n`);
    } else {
      console.log(`[Orquestador Turístico Inteligente] La ocupación es manejable. No se requiere intervención.\n`);
    }
  }
}
