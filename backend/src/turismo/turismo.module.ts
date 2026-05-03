import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ServicioAlgoritmoRutas } from './dominio/servicios/servicio-algoritmo-rutas';
import { ServicioNotificacionesUbicuas } from './dominio/servicios/servicio-notificaciones-ubicuas';
import { OrquestadorTuristicoInteligente } from './aplicacion/orquestadores/orquestador-turistico-inteligente';
import { ControladorInteroperabilidad } from './infraestructura/controladores/controlador-interoperabilidad';
import { RegistroServicios } from './infraestructura/registro/registro-servicios';

@Module({
  imports: [CqrsModule],
  controllers: [ControladorInteroperabilidad],
  providers: [
    ServicioAlgoritmoRutas,
    ServicioNotificacionesUbicuas,
    OrquestadorTuristicoInteligente,
    RegistroServicios,
  ],
})
export class TurismoModule {}
