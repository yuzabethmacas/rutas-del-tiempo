import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicioAlgoritmoRutas {
  recalcularItinerario(identificadorSitio: string, estadoClimatico: string): string[] {
    console.log(`[Servicio Algoritmo Rutas] Recalculando itinerario alternativo para desviar turistas del sitio ${identificadorSitio}...`);
    console.log(`[Servicio Algoritmo Rutas] Considerando estado climático: ${estadoClimatico}`);
    
    // Lógica simulada de redistribución hacia patrimonio menos visitado
    const rutasAlternativas = [
      'Museo Remigio Crespo Toral',
      'Plaza del Herrero',
      'Ruinas de Pumapungo'
    ];
    
    console.log(`[Servicio Algoritmo Rutas] Nuevas rutas alternativas generadas: ${rutasAlternativas.join(', ')}`);
    return rutasAlternativas;
  }
}
