import { Injectable } from '@nestjs/common';

/**
 * Registro de Servicios (Discover Service - Sección 6.2)
 * 
 * Actúa como un mecanismo de indirección. En lugar de hardcodear las URLs
 * de las APIs de sensores externos en el controlador, el controlador usa 
 * nombres lógicos y consulta este registro para encontrar la ubicación real.
 */
@Injectable()
export class RegistroServicios {
  private readonly mapaServicios = new Map<string, string>([
    ['clima-cuenca', 'https://api.clima.cuenca.ec/v1/estado actual'],
    ['aforo-sensores', 'https://sensores.patrimonio.cuenca.ec/api/ocupacion'],
    ['algoritmo-externo-rutas', 'https://inteligencia.rutas.cuenca.ec/calcular']
  ]);

  /**
   * Resuelve una URL física a partir del nombre lógico del servicio.
   * Si no se encuentra, podría disparar un mecanismo de descubrimiento dinámico.
   */
  obtenerUrlServicio(nombreLogico: string): string {
    const url = this.mapaServicios.get(nombreLogico);
    if (!url) {
      console.warn(`[Registro Servicios] Advertencia: No se encontró la URL para el servicio lógico '${nombreLogico}'`);
      return 'URL_NO_REGISTRADA';
    }
    return url;
  }
}
