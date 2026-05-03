# Rutas del Tiempo - Backend Inteligente

Este proyecto implementa el backend del sistema **Rutas del Tiempo**, diseñado para la ciudad de Cuenca. El propósito del sistema es evitar la saturación de los puntos turísticos tradicionales redistribuyendo el flujo de visitantes mediante tecnología ubicua y datos en tiempo real.

## Arquitectura: Patrón Mediador y CQRS

El sistema está construido sobre **NestJS**, siguiendo principios de Diseño Orientado al Dominio (DDD) y Arquitectura Limpia. El patrón de diseño central implementado es el **Patrón Mediador**, logrado a través del módulo `@nestjs/cqrs`.

### ¿Por qué el Patrón Mediador?

El problema principal en un sistema ubicuo es la inmensa cantidad de señales dinámicas provenientes de distintos orígenes (sensores de aforo, APIs del clima, etc.). Si el controlador que recibe estas señales estuviera directamente acoplado a la lógica de notificaciones y recalculo de rutas, el sistema sería rígido, difícil de testear y escalar.

El **Patrón Mediador** resuelve esto introduciendo un componente central (el Bus de Eventos) que actúa como intermediario. 

1. **Infraestructura Desacoplada:** El `ControladorInteroperabilidad` recibe la información (clima, aforo) pero *no sabe* qué se debe hacer con ella. Su única responsabilidad es instanciar un `EventoDatosContextuales` y publicarlo en el Bus de Eventos.
2. **Mediador Central:** El Event Bus de `@nestjs/cqrs` toma el evento y lo enruta hacia los manejadores correspondientes.
3. **Lógica de Negocio Aislada:** El `OrquestadorTuristicoInteligente` (que actúa como el Mediador Concreto de la lógica) se subscribe a este evento. Al recibirlo, evalúa la regla de negocio principal: *¿La ocupación supera el 80%?* 
4. **Coordinación:** Si la regla se cumple, el Orquestador coordina al `ServicioAlgoritmoRutas` para buscar patrimonio menos visitado (ej. Museo Remigio Crespo) y al `ServicioNotificacionesUbicuas` para alertar al usuario, logrando la meta de negocio de redistribución.

### Ventajas de esta arquitectura en Cuenca

- **Adaptabilidad Dinámica:** Si mañana se añade un nuevo tipo de sensor (por ejemplo, ruido o tráfico vehicular), solo se debe publicar un nuevo evento. La lógica existente no se rompe.
- **Escalabilidad:** Se pueden añadir nuevos manejadores de eventos. Por ejemplo, si aforo > 90%, podríamos tener otro manejador que avise a la guardia ciudadana, sin tocar el orquestador turístico original.
- **Mantenibilidad:** El código habla en los términos del negocio (Ubiquitous Language en español), facilitando que expertos en turismo de Cuenca y desarrolladores entiendan el flujo del sistema.

## Estructura de Carpetas

- `src/turismo/dominio`: Contiene las entidades, eventos y servicios abstractos o reglas de negocio puro.
- `src/turismo/aplicacion`: Contiene los orquestadores o manejadores de eventos que coordinan los flujos.
- `src/turismo/infraestructura`: Contiene los controladores que interactúan con el mundo exterior.

## Ejecución

1. Instalar dependencias: `npm install`
2. Ejecutar en modo desarrollo: `npm run start:dev`

El servidor correrá en `http://localhost:4001` y está configurado para aceptar peticiones CORS desde `http://localhost:4000`.

### Prueba Rápida

Enviar un POST a `http://localhost:4001/interoperabilidad/contexto` con el siguiente JSON:

```json
{
  "identificadorSitio": "Catedral Nueva",
  "porcentajeOcupacion": 85,
  "estadoClimatico": "Lluvioso"
}
```

Observarás en la consola cómo el Mediador intercepta el evento y dispara la alerta y el recalculo de rutas alternativas.
