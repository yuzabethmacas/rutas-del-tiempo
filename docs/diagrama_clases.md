# Diagrama de Clases - Caso de Uso CT010: Consultar Condiciones Externas

Este documento contiene la representación de clases del sistema **Rutas del Tiempo**, enfocándose en cómo el **Caso de Uso CT010** implementa el **Patrón Mediador** y las tácticas de interoperabilidad de **Bass et al. (Capítulo 6)**.

## Visualización Mermaid

```mermaid
classDiagram
    class ControladorInteroperabilidad {
        <<Colleague>>
        +recibirDatosContextuales(dto: ContratoDatosContextualesDto)
    }

    class EventBus {
        <<Mediator Central>>
        +publish(event)
        +subscribe(handler)
    }

    class OrquestadorTuristico {
        <<Concrete Mediator>>
        +handle(event: EventoDatosContextuales)
    }

    class ContratoDatosContextualesDto {
        <<Tactical: Data Model>>
        +String identificadorSitio
        +Number porcentajeOcupacion
    }

    class RegistroServicios {
        <<Tactical: Discover Service>>
        +obtenerUrlServicio(nombre)
    }

    class TailorRespuestaInterceptor {
        <<Tactical: Tailor Interface>>
    }

    class InteroperabilidadExceptionFilter {
        <<Tactical: Error Response>>
    }

    class ThrottlerEspanolGuard {
        <<Tactical: Resource Management>>
    }

    class ServicioAlgoritmoRutas {
        <<Colleague>>
    }

    class ServicioNotificacionesUbicuas {
        <<Colleague>>
    }

    %% Relaciones de Mediación
    ControladorInteroperabilidad --> EventBus : publica evento
    EventBus --> OrquestadorTuristico : notifica cambio
    OrquestadorTuristico --> ServicioAlgoritmoRutas : coordina
    OrquestadorTuristico --> ServicioNotificacionesUbicuas : coordina

    %% Decoración de Interoperabilidad (Bass et al.)
    ControladorInteroperabilidad ..> ContratoDatosContextualesDto : valida con
    ControladorInteroperabilidad --> RegistroServicios : descubre vía
    ControladorInteroperabilidad ..> TailorRespuestaInterceptor : filtra con
    ControladorInteroperabilidad ..> ThrottlerEspanolGuard : limita con
    InteroperabilidadExceptionFilter ..> ControladorInteroperabilidad : audita
```

## Código PlantUML

```plantuml
@startuml
skinparam class {
    BackgroundColor White
    ArrowColor Black
    BorderColor DarkSlateGray
}

package "Infraestructura (Interoperabilidad)" #AliceBlue {
    class ControladorInteroperabilidad <<Colleague>> {
        +recibirDatosContextuales(ContratoDatosContextualesDto)
    }
    class RegistroServicios <<Tactical: Discover Service>> {
        +obtenerUrlServicio(nombre)
    }
    class TailorRespuestaInterceptor <<Tactical: Tailor Interface>>
    class InteroperabilidadExceptionFilter <<Tactical: Error Response>>
    class ThrottlerEspanolGuard <<Tactical: Resource Management>>
}

package "Aplicación (Mediación)" #Ivory {
    class EventBus <<Mediator Central>> {
        +publish(event)
    }
    class OrquestadorTuristico <<Concrete Mediator>> {
        +handle(event)
    }
}

package "Dominio" #Lavender {
    class ContratoDatosContextualesDto <<Tactical: Data Model>>
    class ServicioAlgoritmoRutas <<Colleague>>
    class ServicioNotificacionesUbicuas <<Colleague>>
}

' Relaciones
ControladorInteroperabilidad --> EventBus : publica
EventBus --> OrquestadorTuristico : notifica
OrquestadorTuristico --> ServicioAlgoritmoRutas : coordina
OrquestadorTuristico --> ServicioNotificacionesUbicuas : coordina

' Tácticas
ControladorInteroperabilidad ..> ContratoDatosContextualesDto : valida
ControladorInteroperabilidad --> RegistroServicios : usa
ControladorInteroperabilidad ..> TailorRespuestaInterceptor : filtra
ControladorInteroperabilidad ..> ThrottlerEspanolGuard : limita
InteroperabilidadExceptionFilter ..> ControladorInteroperabilidad : observa

@enduml
```
