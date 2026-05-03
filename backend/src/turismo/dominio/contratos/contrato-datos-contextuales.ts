import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

/**
 * Contrato de Datos Contextuales (Data Model - Sección 6.3)
 * 
 * Define la semántica, el rango válido y el tipo de cada campo que el
 * Mediador espera recibir desde los sensores externos. Esto previene
 * ambigüedades en la integración.
 */
export class ContratoDatosContextualesDto {
  /**
   * Identificador único o nombre descriptivo del sitio turístico.
   * Debe ser una cadena de texto no vacía.
   * Ejemplo: "Catedral Nueva"
   */
  @IsString()
  @IsNotEmpty({ message: 'El identificador del sitio no puede estar vacío.' })
  identificadorSitio: string;

  /**
   * Representa el nivel de saturación actual del sitio.
   * Es un valor numérico expresado en porcentaje (0 al 100), donde:
   * - 0 = Totalmente vacío
   * - 100 = Capacidad máxima permitida alcanzada
   * Fórmula esperada: (Aforo Real / Capacidad Máxima) * 100
   */
  @IsNumber({}, { message: 'El porcentaje de ocupación debe ser un número.' })
  @Min(0, { message: 'La ocupación mínima es 0%.' })
  @Max(100, { message: 'La ocupación máxima es 100%.' })
  porcentajeOcupacion: number;

  /**
   * Estado actual del clima reportado por la API meteorológica de Cuenca.
   * Valores comunes esperados: "Soleado", "Lluvioso", "Nublado".
   */
  @IsString()
  @IsNotEmpty({ message: 'El estado climático es obligatorio.' })
  estadoClimatico: string;
}
