# Rutas del Tiempo - Backend Inteligente (Caso de Uso CT010)

Este proyecto implementa el backend del sistema **Rutas del Tiempo**. Se enfoca en resolver el **Caso de Uso CT010 (Consultar condiciones externas)** para evitar la saturación de los puntos turísticos mediante tecnología ubicua y el Patrón Mediador.

## Arquitectura: Patrón Mediador y Tácticas de Interoperabilidad

El sistema está construido sobre **NestJS**, siguiendo principios de Diseño Orientado al Dominio (DDD) y Arquitectura Limpia. Recientemente se han incorporado mejoras arquitectónicas avanzadas basadas en el Capítulo 6 (*Interoperability*) de *Software Architecture in Practice*.

### Componentes Core (El Patrón Mediador)

El problema principal en un sistema ubicuo es acoplar la recepción de señales dinámicas con la lógica de reacción. El **Patrón Mediador** resuelve esto:
1. **ControladorInteroperabilidad:** Recibe datos y los delega.
2. **Event Bus (Mediador Central):** Recibe el evento y lo enruta.
3. **OrquestadorTuristicoInteligente:** Evalúa reglas (ej. ocupación > 80%).
4. **Servicios de Dominio:** Recalculan rutas y alertan turistas.

---

### Tácticas de Interoperabilidad Implementadas (Software Architecture in Practice)

Para hacer que el sistema sea seguro, confiable y estandarizado, se implementaron 5 tácticas críticas:

#### 1. Tailor Interface (Sección 6.2)
Adaptamos la información que el sistema devuelve basándonos en quién la solicita. 
- **Componente:** `TailorRespuestaInterceptor` (Aplicado vía `@TailorRespuesta()`).
- **Comportamiento:** Si el header `x-tipo-cliente` es `turista`, solo recibe la confirmación de procesamiento y sugerencias. Si es `administrador`, recibe además los datos "crudos" del sensor y las URLs resueltas.

#### 2. Contratos Semánticos (Sección 6.3 - Data Model)
Definimos un acuerdo estricto sobre el significado de cada dato intercambiado.
- **Componente:** `ContratoDatosContextualesDto`.
- **Comportamiento:** Define mediante JSDoc y validadores (`@IsNumber`, `@Min(0)`, `@Max(100)`) que, por ejemplo, el `porcentajeOcupacion` es estrictamente una métrica del 0 al 100%. Rechaza todo lo que no cumpla el contrato.

#### 3. Discover Service con Indirección (Sección 6.2)
Desacoplamos la ubicación física de los servicios externos (sensores, APIs del clima) de la lógica interna del sistema.
- **Componente:** `RegistroServicios`.
- **Comportamiento:** El controlador pide la URL de `clima-cuenca` en lugar de hardcodear `https://api.clima...`. El registro resuelve dinámicamente este nombre lógico a una dirección física.

#### 4. Rechazo y Registro Estructurado (Sección 6.1 - Response)
Cuando un sistema se comunica con nosotros de manera defectuosa, protegemos nuestra lógica interna rechazando el mensaje de inmediato y guardando la evidencia.
- **Componente:** `InteroperabilidadExceptionFilter` y `ValidationPipe`.
- **Comportamiento:** Si el payload viola el contrato semántico, el filtro detiene la ejecución, retorna un HTTP 400 estructurado, e imprime en consola el motivo exacto, el payload defectuoso y el timestamp para auditoría.

#### 5. Gestión de Recursos / Rate Limiting (Sección 6.3 - Resource Management)
Evitamos ataques de denegación de servicio (DoS) o saturación por sensores defectuosos que envían eventos en bucle.
- **Componente:** `@nestjs/throttler` configurado globalmente e implementado vía `ThrottlerEspanolGuard`.
- **Comportamiento:** Límita a cada IP a un máximo de 10 peticiones por minuto. Si se excede, devuelve un HTTP 429 ("Too Many Requests") con un mensaje en español amigable.

---

## Diagramas del Sistema

Para mantener la documentación organizada, los diagramas arquitectónicos se han separado en archivos independientes:

- 📊 **[Diagrama de Clases (Mediador e Interoperabilidad)](../docs/diagrama_clases.md)**: Detalla la estructura estática, las interfaces y las tácticas de interoperabilidad aplicadas a cada componente.
- 🔄 **[Diagrama de Secuencia (Flujo de Mensajes)](../docs/diagrama_secuencia.md)**: Detalla la interacción dinámica, el manejo de errores (400, 429) y la orquestación del Mediador.

*Ambos documentos incluyen tanto la visualización en **Mermaid** como el código fuente en **PlantUML**.*

---


## Estructura de Carpetas

- `src/turismo/dominio/contratos`: Modelos estrictos de datos (M2).
- `src/turismo/infraestructura/decoradores`: Transformadores de respuesta (M1).
- `src/turismo/infraestructura/filtros`: Rechazo estructurado de malas peticiones (M4).
- `src/turismo/infraestructura/guardias`: Rate limiting en español (M5).
- `src/turismo/infraestructura/registro`: Descubrimiento de servicios externos (M3).

## Ejecución

1. Instalar dependencias: `npm install`
2. Ejecutar en modo desarrollo: `npm run start:dev`

El servidor correrá en `http://localhost:4001`.
