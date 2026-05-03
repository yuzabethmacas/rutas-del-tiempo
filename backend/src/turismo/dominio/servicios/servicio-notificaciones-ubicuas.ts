import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicioNotificacionesUbicuas {
  alertarUsuario(rutasSugeridas: string[]): void {
    console.log(`[Servicio Notificaciones Ubicuas] Enviando alerta push a los turistas en la zona saturada...`);
    console.log(`[Servicio Notificaciones Ubicuas] Mensaje: "La zona actual está muy concurrida. Te sugerimos visitar: ${rutasSugeridas.join(', ')} para una mejor experiencia."`);
  }
}
