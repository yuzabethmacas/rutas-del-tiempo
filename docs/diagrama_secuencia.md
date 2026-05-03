# Diagrama de Secuencia - Caso de Uso CT010: Consultar Condiciones Externas

Este documento detalla el flujo de mensajes y la orquestación de eventos cuando un sensor externo (CT010) envía datos al sistema **Rutas del Tiempo**.

## Visualización Mermaid

```mermaid
sequenceDiagram
    participant S as Sensor Externo (CT010)
    participant TL as ThrottlerGuard (M5)
    participant VF as ValidationPipe/Filter (M4 & M2)
    participant C as ControladorInteroperabilidad
    participant TR as TailorRespuesta (M1)
    participant RS as RegistroServicios (M3)
    participant MB as Mediador Central (EventBus)
    participant O as OrquestadorTuristico

    S->>TL: POST /contexto
    TL-->>S: [Si excede límite] 429 Rate Limit Exceeded
    TL->>VF: Verifica Contrato Semántico
    VF-->>S: [Si es inválido] 400 Bad Request + Log Auditoría
    VF->>C: Datos válidos
    C->>RS: obtenerUrlServicio('clima-cuenca')
    RS-->>C: URL Real
    C->>MB: Publish EventoDatosContextuales
    MB-)O: Evento Asíncrono
    O->>O: Evaluar ocupación (>80%)
    C->>TR: Retorna objeto combinado (Público + Crudo)
    TR->>TR: Verifica 'x-tipo-cliente'
    TR-->>S: 201 Created (Solo datos permitidos para el cliente)
```

## Código PlantUML

```plantuml
@startuml
' Configuración estética para mayor claridad
skinparam shadowing false
skinparam monochrome false
skinparam packageStyle rectangle

actor "Sensor Externo (CT010)" as Sensor

box "Backend (Infraestructura)" #LightCyan
    participant "ThrottlerGuard\n(Rate Limit)" as Limit
    participant "ValidationPipe" as Validator
    participant "Controlador\nInteroperabilidad" as Controller
    participant "RegistroServicios\n(Discovery)" as Registry
    participant "TailorRespuesta\n(Interceptor)" as Tailor
end box

box "Backend (Aplicación/Dominio)" #LightYellow
    participant "Mediador\n(EventBus)" as Bus
    participant "Orquestador\nTurístico" as Orquestador
end box

Sensor -> Limit: POST /interoperabilidad/contexto
activate Limit
Limit -> Limit: Verifica límite (10/min)

alt Limite excedido
    Limit --> Sensor: 429 Too Many Requests
else Permitido
    Limit -> Validator: Validar DTO
    activate Validator
    
    alt Falla validación
        Validator --> Sensor: 400 Bad Request
    else DTO Válido
        Validator -> Controller: Entregar datos
        deactivate Validator
        activate Controller
        
        Controller -> Registry: Resolver URL lógica (Discovery)
        Registry --> Controller: URL física confirmada
        
        ' El Mediador entra en acción (Desacoplamiento)
        Controller -> Bus: Publicar EventoDatosContextuales
        Bus -> Orquestador: Disparar (Asíncrono)
        
        Controller -> Tailor: Retornar data procesada
        deactivate Controller
        activate Tailor
        
        Tailor -> Tailor: Analizar 'x-tipo-cliente' (Tailor Interface)
        
        alt Cliente = administrador
            Tailor --> Sensor: 201 Created (Data completa)
        else Cliente = turista
            Tailor --> Sensor: 201 Created (Solo data pública)
        end
        deactivate Tailor
    end
end
deactivate Limit
@enduml
```
